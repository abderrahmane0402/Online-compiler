import React, { useEffect } from "react"
import { useState, useRef } from "react"
import userLogo from "../img/userLogo.png"

import {
  KeyboardArrowUpOutlined,
  LogoutOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
  ExpandMore,
} from "@mui/icons-material"
import { Link } from "react-router-dom"

function ShortUser() {
  // ************login ***********
  const [email, setEmail] = useState("")
  const [extra, setextra] = useState(false)
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"))
  }, [])
  const user = useRef(null)
  const show = () => {
    const Class = user.current.className
    user.current.className = extra
      ? Class.replace("w-48", "w-0")
      : Class.replace("w-0", "w-48")
    setextra(!extra)
  }

  return (
    <div className='hidden w-64 h-10 text-center lg:flex justify-end pr-8 items-center relative'>
      <div
        className='h-full w-48 bg-[#cb2d6fb9] text-white flex flex-row-reverse items-center justify-between rounded-3xl cursor-pointer'
        onClick={show}
      >
        <img
          src={userLogo}
          alt='logo'
          className='h-8 w-8 m-2 rounded-full bg-[#092e2d] '
        ></img>
        <p className='first-letter:capitalize w-4/5 overflow-hidden select-none'>
          {email}
        </p>
        <div className='h-10 w-10 flex items-center justify-center'>
          {extra ? <KeyboardArrowUpOutlined /> : <ExpandMore />}
        </div>
      </div>

      {/* drop down menu  */}

      <div
        ref={user}
        className='w-0 absolute top-full text-white flex flex-col rounded-3xl bg-[#cb2d6fb9] mt-1 overflow-hidden transition-all duration-1000'
      >
        <div className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'>
          <AccountCircleOutlined className='ml-10 mr-2' />
          <Link to='/profile'>Profile</Link>
        </div>
        <div className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'>
          <SettingsOutlined className='ml-10 mr-2' />
          <span>Setting</span>
        </div>
        <hr className='w-2/5 self-center my-2 bg-black' />
        <Link
          to={"/"}
          onClick={() => sessionStorage.clear()}
          className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'
        >
          <LogoutOutlined className='ml-10 mr-2' />
          <span>LogOut</span>
        </Link>
      </div>
    </div>
  )
}

export default ShortUser
