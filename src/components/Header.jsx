import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const adminUrl = isDevelopment
    ? import.meta.env.VITE_LOCAL_ADMIN
    : import.meta.env.VITE_SERVER_ADMIN;

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <nav className="bg-slate-900 md:p-3 p-4 px-5 md:px-36 fixed w-full z-10">
        <div className="container mx-auto md:flex md:items-center md:justify-between text-center">
          <NavLink
            to="/"
            className="text-slate-100 text-2xl md:text-4xl tracking-widest md:tracking-widest"
            onClick={handleClick}
          >
            LIVEAQI
          </NavLink>
          <div className="md:flex md:items-center md:w-auto hidden">
            <NavLink
              to={adminUrl}
              className="text-slate-100 hover:bg-slate-800 text-lg font-semibold tracking-wider bg-slate-900 rounded-lg px-4 py-2"
            >
              ADMIN
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
