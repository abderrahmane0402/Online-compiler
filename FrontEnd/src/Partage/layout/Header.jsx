import React from "react";
import Axios from "axios";
const CompileCode = (code) => {
  // Axios.get(
  //   "http://localhost:3500/"
  // ).then((res) =>console.log(res.data));
  Axios.post("http://localhost:3500/", { code })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  console.log("click");
};
const Header = (props) => {
  return (
    <header className="flex h-14 w-full sm:h-16 lg:h-20 lg:justify-between items-center justify-center">
      <p className="text-4xl text-[#CCCCCC] text-center font-bold w-64 select-none">
        CodeX
      </p>
      {props.children}
    </header>
  );
};

export default Header;
