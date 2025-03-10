import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Icon } from "@iconify/react";
import SidebarLinkGroup from "./SidebarLinkGroup";



export const AdminMenu = ({
  pathname,
  sidebarExpanded,
  setSidebarExpanded,
}: {
  pathname: string;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}) => {
  useEffect(() => {
    console.log("AdminMenu cargado con pathname:", pathname);
  }, [pathname]);

  return (
    
  <div>
    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
      MENU - ADMINISTRADOR
    </h3>

    <ul className="mb-6 flex flex-col gap-1.5">
      <SidebarLinkGroup
        activeCondition={
          pathname === "/" || pathname.includes("encuestas-smart")
        }
      >
        {(handleClick, open) => {
          return (
            <React.Fragment>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  (pathname === "/" ||
                    pathname.includes("encuestas-smart") ||
                    pathname.includes("dashboard-super-admin")) &&
                  "bg-graydark dark:bg-meta-4"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                }}
              >
                Dashboard
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                    open && "rotate-180"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                  />
                </svg>
              </NavLink>
              <div
                className={`translate transform overflow-hidden ${
                  !open && "hidden"
                }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/puntos-smart"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white" +
                        (isActive && "!text-white")
                      }
                    >
                      Puntos Smart
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div
                className={`translate transform overflow-hidden ${
                  !open && "hidden"
                }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/encuestas-smart"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Encuestas Smart
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div
                className={`translate transform overflow-hidden ${
                  !open && "hidden"
                }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/dashboard-super-admin"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Estadisticas
                    </NavLink>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          );
        }}
      </SidebarLinkGroup>
      <SidebarLinkGroup
        activeCondition={pathname.includes("billetera-usuario")}
      >
        {(handleClick, open) => {
          return (
            <React.Fragment>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname.includes("gestion-categoria") ||
                  pathname.includes("informacion-comercio")
                    ? "bg-graydark dark:bg-meta-4"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                }}
              >
                Gestión de Comercio
                <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                    open && "rotate-180"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                  />
                </svg>
              </NavLink>
              <div
                className={`translate transform overflow-hidden ${
                  !open && "hidden"
                }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/gestion-categoria"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Gestion de Categoria
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div
                className={`translate transform overflow-hidden ${
                  !open && "hidden"
                }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink
                      to="/informacion-comercio"
                      className={({ isActive }) =>
                        "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                        (isActive && "!text-white")
                      }
                    >
                      Gestion de Comercio
                    </NavLink>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          );
        }}
      </SidebarLinkGroup>
      {/* <!-- Menu Gestion Categoria  --> */}
      <li>
        <NavLink
          to="/usuarios-smart"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("usuarios-smart") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="gravity-ui:persons" /> Usuarios Smart
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/news"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("news") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="ri:news-fill" />
          Listado de Noticias
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/banners"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("banners") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="material-symbols:planner-banner-ad-pt-outline"/>
          Gestion de Banners
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to="/smart-comercios"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("smart-comercios") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="clarity:employee-group-solid" />
          Comercios Smart
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/enviar-puntos"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("enviar-puntos") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="tdesign:undertake-transaction-filled" />
          Enviar/Quitar Puntos
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/transactions"
          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("transactions") && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon icon="hugeicons:transaction" />
          Transacciones
        </NavLink>
      </li>
    </ul>
  </div>
  );
};
