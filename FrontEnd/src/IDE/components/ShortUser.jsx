import React, { useEffect, useState } from "react"

import { Logout, Settings } from "@mui/icons-material"
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material"

const MenuItemStyled = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#29374ea7",
    transition: "all 0.2s ease-in-out",
  },
})

function ShortUser() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [email, setEmail] = useState("")
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"))
  }, [])
  //   const user = useRef(null)
  //   const show = () => {
  //     const Class = user.current.className
  //     user.current.className = extra
  //       ? Class.replace("w-48", "w-0")
  //       : Class.replace("w-0", "w-48")
  //     setextra(!extra)
  //   }

  return (
    // <div className='hidden text-[] w-64 h-10 text-center lg:flex justify-end pr-8 items-center relative'>
    //   <div
    //     className='h-full w-48 bg-[#cb2d6fb9] text-white flex flex-row-reverse items-center justify-between rounded-3xl cursor-pointer'
    //     onClick={show}
    //   >
    //     <img
    //       src={userLogo}
    //       alt='logo'
    //       className='h-8 w-8 m-2 rounded-full bg-[#092e2d] '
    //     ></img>
    //     <p className='first-letter:capitalize w-4/5 overflow-hidden select-none'>
    //       {email}
    //     </p>
    //     <div className='h-10 w-10 flex items-center justify-center'>
    //       {extra ? <KeyboardArrowUpOutlined /> : <ExpandMore />}
    //     </div>
    //   </div>

    //   {/* drop down menu  */}

    //   <div
    //     ref={user}
    //     className='w-0 absolute top-full text-white flex flex-col rounded-3xl bg-[#cb2d6fb9] mt-1 overflow-hidden transition-all duration-1000'
    //   >
    //     <div className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'>
    //       <AccountCircleOutlined className='ml-10 mr-2' />
    //       <Link to='/profile'>Profile</Link>
    //     </div>
    //     <div className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'>
    //       <SettingsOutlined className='ml-10 mr-2' />
    //       <span>Setting</span>
    //     </div>
    //     <hr className='w-2/5 self-center my-2 bg-black' />
    //     <Link
    //       to={"/"}
    //       onClick={() => sessionStorage.clear()}
    //       className='h-9 w-full flex items-center justify-start tracking-widest font-semibold text-lg cursor-pointer select-none hover:bg-[#a21751] hover:text-[#ffffff95] transition-colors duration-200 delay-100'
    //     >
    //       <LogoutOutlined className='ml-10 mr-2' />
    //       <span>LogOut</span>
    //     </Link>
    //   </div>
    // </div>
    <>
      <IconButton onClick={handleClick} id='account-menu'>
        <Avatar sx={{ width: 32, height: 32, backgroundColor: "#3343e7" }}>
          {email.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: "#1e293b",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            backgroundColor: "#1e293b",
            color: "white",
            minWidth: 150,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItemStyled onClick={handleClose}>
          <Avatar /> Profile
        </MenuItemStyled>
        <Divider />{" "}
        <MenuItemStyled onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          Settings
        </MenuItemStyled>
        <MenuItemStyled onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          Logout
        </MenuItemStyled>
      </Menu>
    </>
  )
}

export default ShortUser
