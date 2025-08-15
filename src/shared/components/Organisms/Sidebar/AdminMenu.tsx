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
        <li>
          <NavLink
            to="/mi-sucursal"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname.includes("usuarios-smart") &&
              "bg-graydark dark:bg-meta-4"
            }`}
          >
            <Icon icon="material-symbols:bar-chart" width="20" height="20" />
            Estadísticas
          </NavLink>
        </li>
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
                  <Icon
                    icon="mdi:lightbulb-on-outline"
                    width="20"
                    height="20"
                  />
                  Herramientas Smart
                  <svg
                    className={`absolute right-3 top-1/2 -translate-y-1/2 fill-current ${
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
                        to="/mis-encuestas"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/mis-encuestas" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <Icon
                          icon="material-symbols:assignment-outline-rounded"
                          width="20"
                          height="20"
                        />
                        Encuestas Smart
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/mis-estudios"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/mis-estudios" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <Icon
                          icon="material-symbols:analytics-outline-rounded"
                          width="20"
                          height="20"
                        />
                        Estudios Smart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/mis-promociones"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/mis-promociones" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <Icon
                          icon="hugeicons:promotion"
                          width="20"
                          height="20"
                        />
                        Promociones Smart
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/mis-productos"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/mis-productos" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <Icon
                          icon="material-symbols:inventory"
                          width="20"
                          height="20"
                        />
                        Productos Smart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/mis-trabajadores-sucursal"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname === "/mis-encuestas" &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                      >
                        <Icon
                          icon="material-symbols:group"
                          width="20"
                          height="20"
                        />
                        Operadores Smart
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            );
          }}
        </SidebarLinkGroup>
      </ul>
    </div>
  );
};
