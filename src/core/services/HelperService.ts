/**
 * HelperService.ts
 * Servicio utilitario para centralizar el acceso a datos guardados en localStorage
 */
export class HelperService {
    /**
     * Obtiene el tipo de usuario actual basado en el rol almacenado
     * @returns "commerce" para comercios o "branch_manager" para gerentes de sucursal
     */
    static getUserType(): string {
      const role = localStorage.getItem("user_role");
      return role === "3" ? "branch_manager" : "commerce";
    }
  
    /**
     * Obtiene el ID del usuario actual
     * @returns ID del usuario o null si no existe
     */
    static getUserUuid(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_uuid`);
    }
  
    /**
     * Obtiene el nombre del usuario actual
     * @returns Nombre del usuario o null si no existe
     */
    static getUserName(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_name`);
    }
  
    /**
     * Obtiene el ID encriptado de la compañía
     * @returns ID encriptado de la compañía o null si no existe
     */
    static getCompanyId(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_company_id`);
    }
  
    /**
     * Obtiene el token de acceso del usuario actual
     * @returns Token de acceso o null si no existe
     */
    static getAccessToken(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_access_token`);
    }
  
    /**
     * Obtiene el token de refresco del usuario actual
     * @returns Token de refresco o null si no existe
     */
    static getRefreshToken(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_refresh_token`);
    }
  
    /**
     * Obtiene el rol del usuario actual
     * @returns Rol del usuario (como número) o null si no existe
     */
    static getUserRole(): number | null {
      const role = localStorage.getItem("user_role");
      return role ? parseInt(role) : null;
    }
  
    /**
     * Verifica si el usuario actual es un gerente de sucursal
     * @returns true si es gerente de sucursal, false en caso contrario
     */
    static isBranchManager(): boolean {
      return this.getUserRole() === 3;
    }
  
    /**
     * Obtiene el ID de la sucursal (solo para gerentes de sucursal)
     * @returns ID de la sucursal o null si no existe o no es gerente
     */
    static getBranchId(): string | null {
      if (!this.isBranchManager()) return null;
      return localStorage.getItem("branch_manager_branch_id");
    }
  
    /**
     * Guarda un ítem en localStorage con el prefijo del tipo de usuario
     * @param key Clave sin prefijo
     * @param value Valor a guardar
     */
    static setUserItem(key: string, value: string): void {
      const userType = this.getUserType();
      localStorage.setItem(`${userType}_${key}`, value);
    }
  
    /**
     * Elimina un ítem de localStorage con el prefijo del tipo de usuario
     * @param key Clave sin prefijo
     */
    static removeUserItem(key: string): void {
      const userType = this.getUserType();
      localStorage.removeItem(`${userType}_${key}`);
    }
  
    /**
     * Elimina todos los datos de la sesión actual
     */
    static clearSession(): void {
      Object.keys(localStorage).forEach((key) => {
        if (
          key.startsWith("commerce_") ||
          key.startsWith("branch_manager_") ||
          key === "user_role"
        ) {
          localStorage.removeItem(key);
        }
      });
    }
  
    /**
     * Obtiene el email del usuario actual
     * @returns Email del usuario o null si no existe
     */
    static getUserEmail(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_email`);
    }
  
    /**
     * Obtiene el avatar/imagen del usuario actual
     * @returns URL del avatar o null si no existe
     */
    static getUserAvatar(): string | null {
      const userType = this.getUserType();
      return localStorage.getItem(`${userType}_avatar`);
    }
  
    /**
     * Verifica si hay una sesión activa
     * @returns true si hay una sesión activa, false en caso contrario
     */
    static isAuthenticated(): boolean {
      return !!this.getAccessToken();
    }
  }