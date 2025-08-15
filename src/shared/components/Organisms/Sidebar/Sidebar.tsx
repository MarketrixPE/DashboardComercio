import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../../assets/images/logo/logoPuntosSmart.svg";
import { AdminMenu } from "./AdminMenu";
import { ComercioMenu } from "./ComercioMenu";
import Cookies from "js-cookie";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { pathname } = useLocation();

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const userRole = Cookies.get("user_role");
  const role = userRole === "2" ? "commerce" : userRole === "3" ? "branch_manager" : null;

  const storedSidebarExpanded = Cookies.get("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === "true"
  );

  // Cerrar el sidebar si se hace clic fuera
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (
        sidebar.current &&
        trigger.current &&
        !sidebar.current.contains(target as Node) &&
        !trigger.current.contains(target as Node) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Cerrar el sidebar con la tecla "Esc"
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  // Manejar la expansión del sidebar
  useEffect(() => {
    Cookies.set("sidebar-expanded", String(sidebarExpanded));
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <div className="animate__animated animate__fadeInLeft animate__delay-500ms animate__duration-1000ms mr-4 w-0 lg:w-[20%] z-9999">
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-9999 flex h-[96vh] w-72.5 rounded-tr-[1rem] rounded-[1rem]
  flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:w-[100%] m-4 lg:translate-x-0 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <p>
            <img className="w-full" src={Logo} alt="Logo" />
          </p>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            <aside className="sidebar">
              {role === "branch_manager" && (
                <AdminMenu
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
            </aside>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;