/**
 * HelperService.ts
 * Servicio utilitario para centralizar el acceso a datos guardados en cookies
 */
import Cookies from "js-cookie";

export class HelperService {
  /**
   * Obtiene el tipo de usuario actual basado en el rol almacenado
   * @returns "commerce" para comercios o "branch_manager" para gerentes de sucursal
   */
  static getUserType(): string {
    const role = Cookies.get("user_role");
    return role === "3" ? "branch_manager" : "commerce";
  }

  /**
   * Obtiene el ID del usuario actual
   * @returns ID del usuario o null si no existe
   */
  static getUserUuid(): string | null {
    const userType = this.getUserType();
    const uuid = Cookies.get(`${userType}_uuid`);
    return uuid !== undefined ? uuid : null;
  }

  /**
   * Obtiene el nombre del usuario actual
   * @returns Nombre del usuario o null si no existe
   */
  static getUserName(): string | null {
    const userType = this.getUserType();
    const name = Cookies.get(`${userType}_name`);
    return name !== undefined ? name : null;
  }

  /**
   * Obtiene el nombre de la compañía
   * @returns Nombre de la compañía o null si no existe
   */
  static getCompanyName(): string | null {
    const userType = this.getUserType();
    const companyName = Cookies.get(`${userType}_company`);
    return companyName !== undefined ? companyName : null;
  }

  /**
   * Obtiene el ID encriptado de la compañía
   * @returns ID encriptado de la compañía o null si no existe
   */
  static getCompanyId(): string | null {
    const userType = this.getUserType();
    const companyId = Cookies.get(`${userType}_company_id`);
    return companyId !== undefined ? companyId : null;
  }

  /**
   * Obtiene el token de acceso del usuario actual
   * @returns Token de acceso o null si no existe
   */
  static getAccessToken(): string | null {
    const userType = this.getUserType();
    const token = Cookies.get(`${userType}_access_token`);
    return token !== undefined ? token : null;
  }

  /**
   * Obtiene el token de refresco del usuario actual
   * @returns Token de refresco o null si no existe
   */
  static getRefreshToken(): string | null {
    const userType = this.getUserType();
    const token = Cookies.get(`${userType}_refresh_token`);
    return token !== undefined ? token : null;
  }

  /**
   * Obtiene el rol del usuario actual
   * @returns Rol del usuario (como número) o null si no existe
   */
  static getUserRole(): number | null {
    const role = Cookies.get("user_role");
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
   * Guarda un ítem en cookies con el prefijo del tipo de usuario
   * @param key Clave sin prefijo
   * @param value Valor a guardar
   */
  static setUserItem(key: string, value: string): void {
    const userType = this.getUserType();
    Cookies.set(`${userType}_${key}`, value);
  }

  /**
   * Elimina un ítem de cookies con el prefijo del tipo de usuario
   * @param key Clave sin prefijo
   */
  static removeUserItem(key: string): void {
    const userType = this.getUserType();
    Cookies.remove(`${userType}_${key}`);
  }

  /**
   * Elimina todos los datos de la sesión actual
   */
  static clearSession(): void {
    Object.keys(Cookies.get()).forEach((key) => {
      if (
        key.startsWith("commerce_") ||
        key.startsWith("branch_manager_") ||
        key === "user_role"
      ) {
        Cookies.remove(key);
      }
    });
  }

  /**
   * Obtiene el email del usuario actual
   * @returns Email del usuario o null si no existe
   */
  static getUserEmail(): string | null {
    const userType = this.getUserType();
    const email = Cookies.get(`${userType}_email`);
    return email !== undefined ? email : null;
  }

  /**
   * Obtiene el avatar/imagen del usuario actual
   * @returns URL del avatar o null si no existe
   */
  static getUserAvatar(): string | null {
    const userType = this.getUserType();
    const avatar = Cookies.get(`${userType}_avatar`);
    return avatar !== undefined ? avatar : null;
  }
  /**
   * Obtiene el ID de la sucursal (solo para gerentes de sucursal)
   * @returns ID de la sucursal o cadena vacía si no se encuentra
   */
  static getBranchId(): string {
    const branchId = Cookies.get("branch_manager_branch_id");
    if (!branchId) {
      console.warn(
        "No se encontró el ID de la sucursal, devolviendo cadena vacía"
      );
      return "";
    }
    return branchId;
  }

  /**
   * Obtiene el nombre de la sucursal (solo para gerentes de sucursal)
   * @returns Nombre de la sucursal o cadena vacía si no se encuentra
   */
  static getBranchName(): string {
    const branchName = Cookies.get("branch_manager_sucursal");
    if (!branchName) {
      console.warn(
        "No se encontró el nombre de la sucursal, devolviendo cadena vacía"
      );
      return "";
    }
    return branchName;
  }

  /**
   * Obtiene la dirección de la sucursal (solo para gerentes de sucursal)
   * @returns Dirección de la sucursal o cadena vacía si no se encuentra
   */
  static getBranchAddress(): string {
    const branchAddress = Cookies.get("branch_manager_direccion");
    if (!branchAddress) {
      console.warn(
        "No se encontró la dirección de la sucursal, devolviendo cadena vacía"
      );
      return "";
    }
    return branchAddress;
  }

  /**
   * Obtiene el ID de la categoría de la sucursal (solo para gerentes de sucursal)
   * @returns ID de la categoría o 0 si no se encuentra
   */
  static getBranchCategoryId(): number {
    const categoryId = Cookies.get("branch_manager_category_id");
    if (!categoryId || isNaN(parseInt(categoryId))) {
      console.warn("No se encontró un ID de categoría válido, devolviendo 0");
      return 0;
    }
    return parseInt(categoryId);
  }

  /**
   * Obtiene el nombre de la categoría de la sucursal (solo para gerentes de sucursal)
   * @returns Nombre de la categoría o cadena vacía si no se encuentra
   */
  static getBranchCategoryName(): string {
    const categoryName = Cookies.get("branch_manager_category_name");
    if (!categoryName) {
      console.warn(
        "No se encontró el nombre de la categoría, devolviendo cadena vacía"
      );
      return "";
    }
    return categoryName;
  }

  /**
   * Obtiene el ID de la subcategoría de la sucursal (solo para gerentes de sucursal)
   * @returns ID de la subcategoría o 0 si no se encuentra
   */
  static getBranchSubcategoryId(): number {
    const subcategoryId = Cookies.get("branch_manager_subcategory_id");
    if (!subcategoryId || isNaN(parseInt(subcategoryId))) {
      console.warn(
        "No se encontró un ID de subcategoría válido, devolviendo 0"
      );
      return 0;
    }
    return parseInt(subcategoryId);
  }

  /**
   * Obtiene el nombre de la subcategoría de la sucursal (solo para gerentes de sucursal)
   * @returns Nombre de la subcategoría o cadena vacía si no se encuentra
   */
  static getBranchSubcategoryName(): string {
    const subcategoryName = Cookies.get("branch_manager_subcategory_name");
    if (!subcategoryName) {
      console.warn(
        "No se encontró el nombre de la subcategoría, devolviendo cadena vacía"
      );
      return "";
    }
    return subcategoryName;
  }

  /**
   * Verifica si hay una sesión activa
   * @returns true si hay una sesión activa, false en caso contrario
   */
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
