import React, { useContext, useEffect, useState } from "react"
import { fileInfo } from "../../App"
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material"
import { MeetingRoomOutlined } from "@mui/icons-material"

const MenuItemStyled = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#29374ea7",
    transition: "all 0.2s ease-in-out",
  },
})

const OtherUser = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  let { socket } = useContext(fileInfo)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const Disconnect = () => {
    socket.emit("remove-user", user.id)
  }
  return (
    <>
      <IconButton onClick={handleClick} id='account-menu'>
        <Avatar sx={{ width: 32, height: 32, backgroundColor: "#3343e7" }}>
          {user.email.charAt(0).toUpperCase()}
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
        <MenuItemStyled onClick={Disconnect}>
          <ListItemIcon>
            <MeetingRoomOutlined fontSize='small' sx={{ color: "white" }} />
          </ListItemIcon>
          Disconnect
        </MenuItemStyled>
      </Menu>
    </>
  )
}

export default OtherUser
