import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import classnames from "classnames";

const LoginDropdown = connect(
  "selectAuthTokenPayload",
  "selectAuthIsLoggedIn",
  "doAuthLogin",
  ({ authIsLoggedIn, authTokenPayload: user, doAuthLogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => {
      setIsOpen(!isOpen);
    };
    // Helper function to parse user initials from name
    const UserInitials = () => {
      if (authIsLoggedIn) {
        const parts = user.name.split(".");
        return `${parts[1][0]}${parts[0][0]}`;
      }
      return null;
    };

    const loginClass = classnames({
      hidden: !isOpen,
      "z-50 absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl": true,
    });

    return (
      <div className="ml-6 hidden relative sm:block">
        {authIsLoggedIn ? (
          <>
            <button
              onClick={toggleIsOpen}
              className="block h-12 w-12 text-gray-200 rounded-full overflow-hidden border-2 border-green-400 focus:outline-none hover:border-green-600"
            >
              <UserInitials />
            </button>
            <div className={loginClass}>
              <a
                href="/logout"
                className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
              >
                <small>{`Currently logged in as ${user.name}`}</small>
                <br />
                Logout
              </a>
            </div>
          </>
        ) : (
          <button
            className="bg-transparent text-gray-200 font-semibold hover:text-white py-2 px-4 border border-gray-200 hover:border-transparent hover:bg-green-400 rounded block"
            onClick={doAuthLogin}
          >
            Login
          </button>
        )}
      </div>
    );
  }
);

const NavItem = connect(
  "selectPathnameMinusHomepage",
  ({ pathnameMinusHomepage, href, handler, children }) => {
    const handleClick = (e) => {
      if (handler && typeof handler === "function") handler(e);
    };

    const cls = classnames({
      "text-gray-400 font-bold bg-gray-800": pathnameMinusHomepage === href,
      "mt-1 block px-2 py-1 text-white rounded hover:text-gray-300 sm:mt-0 sm:ml-2": true,
    });

    if (href) {
      return (
        <a className={cls} href={href}>
          {children}
        </a>
      );
    }
    if (handler) {
      return (
        <div className={cls} onClick={handleClick}>
          {children}
        </div>
      );
    }
  }
);

export default connect(
  "selectAuthIsLoggedIn",
  "selectPathnameMinusHomepage",
  ({ authIsLoggedIn, pathnameMinusHomepage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => {
      setIsOpen(!isOpen);
    };

    const dropdownClass = classnames({
      hidden: !isOpen,
      block: isOpen,
      "pb-4 pt-2 px-2 sm:flex sm:p-0 items-center": true,
    });

    return (
      <header className="h-18 bg-blue-600 sm:flex sm:justify-between sm:items-center sm:px-4 py-1">
        <div className="px-4 py-3 flex items-center justify-between px-4 py-3 ">
          <div>
            <h4 style={{fontFamily: "Pacifico"}} className="text-white text-2xl">
              <a className="hover:text-green-400" href="/">
                Feedback
              </a>
              {pathnameMinusHomepage === "" ||
              pathnameMinusHomepage === "/" ? null : (
                <span className="px-2 font-light">|</span>
              )}
              <span className="font-light text-lg">
                {pathnameMinusHomepage.split("/")[1]}
              </span>
            </h4>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
              onClick={toggleIsOpen}
            >
              <svg className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    className="heroicon-ui"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                  />
                ) : (
                  <path
                    className="heroicon-ui"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <nav className={dropdownClass}>
          <LoginDropdown />
        </nav>
      </header>
    );
  }
);

export { NavItem };
