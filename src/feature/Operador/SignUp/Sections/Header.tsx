import React from "react";
import LogoDark from "../../../../assets//images/logo/logo-azul.png";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 backdrop-filter backdrop-blur-lg shadow-lg"></div>
      <div className="relative max-w-[111rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center overflow-hidden">
            <img className="h-8 w-auto" src={LogoDark} alt="Logo" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;