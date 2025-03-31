import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../../Atoms/ClickOutside";
import UserPlaceholder from "../../../../assets/images/user/user-01.png";
import { logout } from "../../../../core/services/AuthService";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    lastName: string;
    role: string;
    avatar: string;
    userType: string;
  }>({
    name: "Usuario",
    lastName: "",
    role: "0",
    avatar: UserPlaceholder,
    userType: "commerce",
  });

  useEffect(() => {
    // Verificar primero el rol del usuario
    const userRole = localStorage.getItem("user_role") || "0";

    // Determinar el tipo de usuario basado en el rol
    const userType = userRole === "3" ? "branch_manager" : "commerce";

    // Obtener los datos correspondientes según el tipo de usuario
    const name = localStorage.getItem(`${userType}_name`) || "Usuario";
    const lastName = localStorage.getItem(`${userType}_last_name`) || "";
    const avatar =
      localStorage.getItem(`${userType}_avatar`) || UserPlaceholder;

    setUserData({ name, lastName, role: userRole, avatar, userType });
  }, []);

  const handleLogout = async () => {
    try {
      // Usar el tipo de usuario correcto para el logout
      await logout(userData.userType);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Determinar el texto del rol basado en el valor de `role`
  const getRoleText = () => {
    switch (userData.role) {
      case "2":
        return "Comercio";
      case "3":
        return "Gerente de Sucursal";
      default:
        return "Usuario";
    }
  };

  // Obtener el perfil URL según el tipo de usuario
  const getProfileUrl = () => {
    return userData.userType === "branch_manager"
      ? "/perfil-sucursal"
      : "/settings-commerce";
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userData.name} {userData.lastName}
          </span>
          <span className="block text-xs">{getRoleText()}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={userData.avatar}
            alt="User"
            className="object-cover rounded-full h-full w-full"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to={getProfileUrl()}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                    fill=""
                  />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                    fill=""
                  />
                </svg>
                Mi perfil
              </Link>
            </li>

            {/* Opciones específicas según rol */}
            {userData.userType === "branch_manager" && (
              <li>
                <Link
                  to="/transacciones"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 5.25H3C2.59 5.25 2.25 4.91 2.25 4.5C2.25 4.09 2.59 3.75 3 3.75H21C21.41 3.75 21.75 4.09 21.75 4.5C21.75 4.91 21.41 5.25 21 5.25Z"
                      fill=""
                    />
                    <path
                      d="M10.65 16.5H3C2.59 16.5 2.25 16.16 2.25 15.75C2.25 15.34 2.59 15 3 15H10.65C11.06 15 11.4 15.34 11.4 15.75C11.4 16.16 11.06 16.5 10.65 16.5Z"
                      fill=""
                    />
                    <path
                      d="M21 10.875H3C2.59 10.875 2.25 10.535 2.25 10.125C2.25 9.715 2.59 9.375 3 9.375H21C21.41 9.375 21.75 9.715 21.75 10.125C21.75 10.535 21.41 10.875 21 10.875Z"
                      fill=""
                    />
                  </svg>
                  Transacciones
                </Link>
              </li>
            )}
          </ul>

          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={handleLogout}
          >
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                fill=""
              />
              <path
                d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                fill=""
              />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
