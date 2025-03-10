import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { Icon } from "@iconify/react";

export const ComercioMenu = ({
  pathname,
  sidebarExpanded,
  setSidebarExpanded,
}: {
  pathname: string;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}) => {
  useEffect(() => {}, [pathname]);

  return (
    <div>
      <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
        MENU - COMERCIO
      </h3>

      <ul className="mb-6 flex flex-col gap-1.5">
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
                        to="/mi-dashboard"
                        className={({ isActive }) =>
                          "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                          (isActive && "!text-white")
                        }
                      >
                        <Icon
                          icon="material-symbols:dashboard"
                          width="16"
                          height="16"
                        />
                        Dashboard
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
                        to="/mi-comercio"
                        className={({ isActive }) =>
                          "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                          (isActive && "!text-white")
                        }
                      >
                        <Icon
                          icon="material-symbols:store"
                          width="20"
                          height="20"
                        />
                        Gestion de Comercio
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
                        to="/mi-factura"
                        className={({ isActive }) =>
                          "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                          (isActive && "!text-white")
                        }
                      >
                        <Icon
                          icon="material-symbols:receipt-long"
                          width="16"
                          height="16"
                        />
                        Facturacion
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            );
          }}
        </SidebarLinkGroup>
        <li>
          <NavLink
            to="/mis-trabajadores"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname.includes("usuarios-smart") &&
              "bg-graydark dark:bg-meta-4"
            }`}
          >
            <Icon icon="material-symbols:groups" width="27" height="30" />
            Gestion de Trabajadores por Sucursal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mi-suscripcion"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname.includes("usuarios-smart") &&
              "bg-graydark dark:bg-meta-4"
            }`}
          >
            <Icon icon="material-symbols:crown" width="20" height="20" />
            Suscripción
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mi-carrito"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname.includes("usuarios-smart") &&
              "bg-graydark dark:bg-meta-4"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Compra de Puntos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
