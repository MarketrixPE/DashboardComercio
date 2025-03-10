// src/core/services/GeneralService.ts

interface UserData {
    user_id: string;
    uuid: string;
    alias: string;
    role: number;
    email: string;
    name: string;
    last_name: string;
    avatar: string;
    company_id?: string;
  }
  
  const GeneralService = {
    getUserId(userType: "admin" | "commerce" = "commerce"): number {
        const key = userType === "admin" ? "user_id" : "commerce_user_id";
        const userId = localStorage.getItem(key);
        return userId ? parseInt(userId) : 0; // Convertimos a número
      },
  
    getUserData(userType: "admin" | "commerce" = "commerce"): Partial<UserData> {
      const prefix = userType === "admin" ? "" : "commerce_";
      
      return {
        user_id: localStorage.getItem(`${prefix}user_id`) || "",
        uuid: localStorage.getItem(`${prefix}uuid`) || "",
        alias: localStorage.getItem(`${prefix}alias`) || "",
        role: Number(localStorage.getItem(`${prefix}role`)) || 0,
        email: localStorage.getItem(`${prefix}email`) || "",
        name: localStorage.getItem(`${prefix}name`) || "",
        last_name: localStorage.getItem(`${prefix}last_name`) || "",
        avatar: localStorage.getItem(`${prefix}avatar`) || "",
        company_id: localStorage.getItem(`${prefix}company_id`) || undefined
      };
    },
  
    getAccessToken(userType: "admin" | "commerce" = "commerce"): string {
      const key = userType === "admin" ? "access_token" : "commerce_access_token";
      return localStorage.getItem(key) || "";
    },
  
    isAuthenticated(userType: "admin" | "commerce" = "commerce"): boolean {
      return !!this.getAccessToken(userType);
    }
  };
  
  export default GeneralService;