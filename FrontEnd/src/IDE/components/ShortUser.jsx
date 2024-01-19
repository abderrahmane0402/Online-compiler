import React, { useContext, useEffect, useState } from "react"

import { BroadcastOnHome, Logout, Settings } from "@mui/icons-material"
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { fileInfo } from "../../App"
import { io } from "socket.io-client"

const MenuItemStyled = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#29374ea7",
    transition: "all 0.2s ease-in-out",
  },
})

function ShortUser() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const router = useNavigate()
  let { setSocket } = useContext(fileInfo)

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

  const joinGroup = () => {
    setSocket(
      io("http://localhost:5000", {
        auth: { email: sessionStorage.getItem("email") },
      })
    )
    router("/partage2")
  }
  return (
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
        {sessionStorage.getItem("email") != "essay" && (
          <>
            <Link to={"/profile"}>
              <MenuItemStyled onClick={handleClose}>
                <Avatar /> Profile
              </MenuItemStyled>
            </Link>
            <MenuItemStyled
              onClick={() => {
                joinGroup()
                handleClose()
              }}
            >
              <ListItemIcon>
                <BroadcastOnHome fontSize='small' sx={{ color: "white" }} />
              </ListItemIcon>
              Partage
            </MenuItemStyled>
            <Divider />
          </>
        )}
        <MenuItemStyled onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          Settings
        </MenuItemStyled>
        <MenuItemStyled
          onClick={() => {
            sessionStorage.clear()
            router("/", { replace: true })
            handleClose()
          }}
        >
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
