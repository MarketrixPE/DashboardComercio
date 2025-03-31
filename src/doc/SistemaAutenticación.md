# Sistema de Autenticación Multinivel

Este documento describe el sistema de autenticación para una aplicación web con múltiples niveles de usuarios y sus respectivas funcionalidades.

## Niveles de Usuario

### Usuario Nivel 2 (Commerce)
- **Email ejemplo:** mramos@widecom.net
- **Funciones:** 
  - Crear sucursales
  - Crear usuarios por sucursal
  - Modificar perfil de compañía
  - Gestionar pack de transacciones
- **Identificador en sistema:** `role = 2`
- **Identificador en código:** `commerce`

### Usuario Nivel 3 (Branch Manager)
- **Email ejemplo:** john@fertur-travel.com
- **Funciones:** 
  - Realizar transacciones en su sucursal
- **Identificador en sistema:** `role = 3`
- **Identificador en código:** `branch_manager`

### Usuario Nivel 4 (Branch Operator)
- **Email ejemplo:** luis@fertur-travel.com
- **Funciones:** 
  - Realizar transacciones específicas:
    - Canje de puntos
    - Emisión
    - Cupones
    - Regalos de estudios
- **Identificador en sistema:** `role = 4`
- **Identificador en código:** `branch_operator`

## Flujo de Autenticación

### 1. Proceso de Login

```typescript
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const API_URL = COMMERCE_API_URL;

    // Llamada a la API
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { access_token, refresh_token, company_id, role, ...userData } = response.data;

    // Determinar tipo de usuario basado en el rol
    const actualUserType = role === 3 
      ? "branch_manager" 
      : role === 4 
        ? "branch_operator" 
        : "commerce";

    // Guardar tokens
    localStorage.setItem(`${actualUserType}_access_token`, access_token);
    localStorage.setItem(`${actualUserType}_refresh_token`, refresh_token);
    localStorage.setItem("user_role", role.toString());

    // Guardar ID de compañía si existe
    if (company_id) {
      localStorage.setItem(`${actualUserType}_company_id_encrypted`, company_id);
      
      try {
        const decryptedCompanyId = await decryptCompanyId(company_id);
        localStorage.setItem(`${actualUserType}_company_id`, decryptedCompanyId);
      } catch (error) {
        console.error("Error al desencriptar el company_id:", error);
      }
    }

    // Guardar datos de sucursal para gerentes y operadores
    if ((role === 3 || role === 4) && response.data.branch_id) {
      localStorage.setItem(`${actualUserType}_branch_id`, response.data.branch_id);
      localStorage.setItem(`${actualUserType}_sucursal`, response.data.sucursal || "");
      localStorage.setItem(`${actualUserType}_latitud`, response.data.latitud || "");
      localStorage.setItem(`${actualUserType}_longitud`, response.data.longitud || "");
    }

    // Guardar datos de usuario
    Object.entries(userData).forEach(([key, value]) => {
      const storageKey = `${actualUserType}_${key}`;
      localStorage.setItem(storageKey, value as string);
    });

    return { ...response.data, userType: actualUserType };
  } catch (error: any) {
    // Manejo de errores
    // ...
  }
};
```

### 2. Protección de Rutas

```typescript
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: ("commerce" | "branch_manager" | "branch_operator")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Buscar tokens
  const token =
    localStorage.getItem("commerce_access_token") ||
    localStorage.getItem("branch_manager_access_token") ||
    localStorage.getItem("branch_operator_access_token");

  // Obtener rol
  const userRole = localStorage.getItem("user_role");
  
  // Mapear valor numérico a nombre de rol
  let role = "guest";
  if (userRole === "2") {
    role = "commerce";
  } else if (userRole === "3") {
    role = "branch_manager";
  } else if (userRole === "4") {
    role = "branch_operator";
  }

  // Verificar autenticación y permisos
  if (!token || !allowedRoles.includes(role as any)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
```

### 3. Navegación Lateral (Sidebar)

```typescript
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // ...
  
  // Determinar rol desde localStorage
  const userRole = localStorage.getItem("user_role");
  const role = userRole === "2" 
    ? "commerce" 
    : userRole === "3" 
      ? "branch_manager" 
      : userRole === "4" 
        ? "branch_operator" 
        : null;
  
  // ...
  
  return (
    // ...
    <nav>
      <aside className="sidebar">
        {role === "branch_manager" && (
          <BranchManagerMenu 
            pathname={pathname}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
        {role === "commerce" && (
          <ComercioMenu
            pathname={pathname}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
        {role === "branch_operator" && (
          <BranchOperatorMenu
            pathname={pathname}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
      </aside>
    </nav>
    // ...
  );
};
```

## Gestión del Contexto de Usuario

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

// Definir los tipos de rol
type UserRole = "commerce" | "branch_manager" | "branch_operator";

interface UserRoleContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>("commerce");
  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole debe ser usado dentro de UserRoleProvider");
  }
  return context;
};
```

## Solución de problemas comunes

### 1. Redirección al login después de iniciar sesión

**Problema**: El usuario inicia sesión correctamente pero es redirigido al login inmediatamente.

**Posibles causas**:
- Los nombres de las claves en localStorage no coinciden entre el login y la verificación de rutas protegidas
- El rol no se está interpretando correctamente
- La redirección ocurre antes de que los datos se guarden en localStorage

**Solución**:
1. Verifica la coherencia de nombres de claves:
   ```javascript
   // Logging para depuración
   console.log("Tokens guardados:", {
     commerce: localStorage.getItem("commerce_access_token"),
     branch_manager: localStorage.getItem("branch_manager_access_token"),
     role: localStorage.getItem("user_role")
   });
   ```

2. Asegúrate de que el `ProtectedRoute` busque los tokens con los mismos nombres que usas al guardarlos

3. Verifica que la redirección al dashboard ocurra después de que los datos se hayan guardado en localStorage:
   ```javascript
   await login(email, password);
   // Asegurarse de que todo esté guardado antes de redirigir
   setTimeout(() => navigate("/dashboard"), 100);
   ```

### 2. Menú incorrecto después del login

**Problema**: El usuario ve el menú de otro rol después de iniciar sesión.

**Solución**:
1. Verifica que estés utilizando la misma clave para verificar el rol en todas partes:
   ```javascript
   // Usa siempre esta estructura
   const userRole = localStorage.getItem("user_role");
   const role = userRole === "2" 
     ? "commerce" 
     : userRole === "3" 
       ? "branch_manager" 
       : userRole === "4"
         ? "branch_operator"
         : null;
   ```

2. Asegúrate de limpiar el localStorage al cerrar sesión:
   ```javascript
   const logout = () => {
     // Limpiar todo el localStorage relacionado con la autenticación
     Object.keys(localStorage).forEach(key => {
       if (key.includes("_access_token") || 
           key.includes("_refresh_token") || 
           key === "user_role") {
         localStorage.removeItem(key);
       }
     });
   };
   ```

## Buenas prácticas

1. **Coherencia en las claves**: Usa siempre los mismos nombres de claves en todo el sistema
2. **Centraliza la lógica de roles**: Crea funciones utilitarias para obtener y verificar roles
3. **Logging efectivo**: Añade logs detallados durante el desarrollo para identificar problemas
4. **Manejo de tokens**: Establece una estrategia clara para manejar la expiración y renovación de tokens
5. **Tipos en TypeScript**: Define interfaces claras para tus datos de usuario y respuestas de API