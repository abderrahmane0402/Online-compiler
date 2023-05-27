import React from "react";
const Nav = ({ children }) => {
  return (
    <>
      <nav className="h-full hidden lg:w-60 lg:inline-flex flex-col items-center gap-2">
        {children}
      </nav>
    </>
  );
};

export default Nav;
