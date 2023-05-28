import React from "react";

const Body = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden  bg-[#151719] flex flex-col">
      {children}
    </div>
  );
};

export default Body;
