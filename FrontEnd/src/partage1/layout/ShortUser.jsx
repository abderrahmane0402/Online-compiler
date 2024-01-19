import React, { useContext, useEffect, useState } from "react"

import { MeetingRoomOutlined, VpnKey } from "@mui/icons-material"
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { fileInfo } from "../../App"
import OtherUser from "./otherUser"

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
  let { file, socket, setSocket } = useContext(fileInfo)
  const [users, setUsers] = useState(new Map())
  const [code, setCode] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [email, setEmail] = useState("")
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"))

    socket.on("user-disconnect", (user) => {
      setUsers((prevUsers) => {
        const clone = new Map(prevUsers)
        clone.delete(user)
        setUsers(clone)
      })
    })

    socket.on("joined", (email, id) => {
      setUsers((prevUsers) => {
        const clone = new Map(prevUsers)
        clone.set(id, email)
        return clone
      })
      socket.emit("send-file", file, id)
    })

    socket.on("new-group", (code) => {
      setCode(code)
    })
  }, [])

  const Disconnect = () => {
    socket.emit("admin-disconnect")
    socket.disconnect()
    setSocket(null)
    router("/ide", { replace: true })
  }

  return (
    <>
      <IconButton onClick={handleClick} id='account-menu'>
        <Avatar sx={{ width: 32, height: 32, backgroundColor: "#3343e7" }}>
          {email.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      {users &&
        Array.from(users, ([key, value]) => {
          return <OtherUser key={key} user={{ email: value, id: key }} />
        })}

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
        <MenuItemStyled onClick={Disconnect}>
          <ListItemIcon>
            <MeetingRoomOutlined fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          Disconnect
        </MenuItemStyled>
        <MenuItemStyled
          onClick={() => {
            navigator.clipboard.writeText(code)
          }}
        >
          <ListItemIcon>
            <VpnKey fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          {code}
        </MenuItemStyled>
      </Menu>
    </>
  )
}

export default ShortUser
