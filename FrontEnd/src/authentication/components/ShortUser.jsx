import React from "react";
import { useState, useRef } from "react";
import userLogo from "../img/icons8-europe-50.png";
import {
  KeyboardArrowUpOutlined,
  LogoutOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
  ExpandMore,
} from "@mui/icons-material";

const ShortUser = () => {
  const [extra, setextra] = useState(false);
  const user = useRef(null);
  const show = () => {
    const Class = user.current.className;
    user.current.className = extra
      ? Class.replace("w-32", "w-0")
      : Class.replace("w-0", "w-32");
    setextra(!extra);
  };
  return (
    <div className=" w-64 h-10 text-center lg:flex justify-end pr-8 items-center relative text-">
      <div
        className="h-full w-32 bg-[#501F3A] text-white flex flex-row-reverse items-center justify-between rounded-3xl cursor-pointer"
        onClick={show}
      >
       <div className="h-10 w-10 flex items-center justify-center">
          {extra ? <KeyboardArrowUpOutlined /> : <ExpandMore />}
        </div>
        <p className="first-letter:capitalize w-4/5  select-none font-bold">
          English
        </p>
        {/* icon de langue */}
        <img
          src={userLogo}
          alt="logo"
          className="h-8 w-8 m-2 rounded-full bg-white "
        ></img>
      </div>

      <div
        ref={user}
        className="w-0 absolute top-full text-white flex flex-col rounded-2xl bg-[#501F3A] mt-1 overflow-hidden transition-all duration-1000"
       >
         
        <div className="  h-9 w-full flex items-center justify-start tracking-widest font-semibold  cursor-pointer   hover:bg-green-400  transition-colors duration-200 delay-100 ">
        <img
          src={userLogo}
          alt="logo"
          className="h-8 w-8 m-2 rounded-full  bg-white"
        ></img>
        <p className="first-letter:capitalize w-4/5  select-none font-bold">
         Français </p>
        
        </div>
      </div>
    </div>
  );
};

export default ShortUser;
