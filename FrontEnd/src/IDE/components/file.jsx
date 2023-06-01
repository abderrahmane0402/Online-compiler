import {
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
  MoreVertOutlined,
  ScreenShareOutlined,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useImmer } from "use-immer"
import { fileInfo } from "../../App"
import { useNavigate } from "react-router-dom"
const Input = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffffb5",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#ffffffb5",
  },
  "& .MuiFormLabel-root ": {
    color: "#607480",
  },
})
const MenuItemStyled = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#29374ea7",
    transition: "all 0.2s ease-in-out",
  },
})
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#1e293b",
  borderRadius: "10px",
  color: "white",
  boxShadow: 24,
  p: 4,
}

const File = ({ f, fetchFiles }) => {
  const router = useNavigate()
  const [fileName, setFileName] = useState("")
  let { file, setFile, socket, setSocket } = useContext(fileInfo)
  const [anchorEl, setAnchorEl] = useState(null)
  const [toast, setToast] = useImmer({
    open: false,
    message: "",
    type: "",
  })
  const [openM, setOpenM] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleOpenModal = () => setOpenM(true)
  const handleCloseModal = () => {
    setOpenM(false)
    setFileName("")
  }
  const handleCloseToast = () => {
    setToast((draft) => {
      draft.open = false
      draft.message = ""
      draft.type = ""
    })
  }
  const handleUpdate = async () => {
    try {
      const user = sessionStorage.getItem("email")
      await axios.put(`http://localhost:5000/files/${f.file_id}`, {
        fileName,
        user,
      })
      setToast((draft) => {
        draft.open = true
        draft.message = "Le fichier a bien été modifié"
        draft.type = "success"
      })
      handleCloseModal()
      fetchFiles() // Fetch updated files after update
    } catch (error) {
      console.error(error)
      if (error.response?.status == 500 || error?.code == "ERR_NETWORK") {
        setToast((draft) => {
          draft.open = true
          draft.message = "erreur de connexion au serveur"
          draft.type = "error"
        })
      }
      if (error.response?.status == 409) {
        setToast((draft) => {
          draft.open = true
          draft.message = "Fichier deja existant"
          draft.type = "error"
        })
      }
      handleCloseModal()
    }
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/files/${f.file_id}`)
      setToast((draft) => {
        draft.open = true
        draft.message = "Le fichier a bien été supprimer"
        draft.type = "success"
      })
      handleCloseModal()
      fetchFiles() // Fetch updated files after deletion
    } catch (error) {
      console.error(error)
      setToast((draft) => {
        draft.open = true
        draft.message = "erreur de connexion au serveur"
        draft.type = "error"
      })
      handleCloseModal()
    }
  }

  // create a group connection for code Sharing
  function group() {
    const ss = io("http://localhost:5000", {
      auth: { email: sessionStorage.getItem("email") },
    })
    setSocket(ss)
    setFile((draft) => {
      draft.name = f.filename
      draft.content = f.content
    })
    console.log("create group")
    ss.emit("create-group")
    router("/partage")
  }

  useEffect(() => {
    if (socket) {
    }
  }, [socket])

  return (
    <>
      <div
        key={f.file_id}
        className={`flex justify-between items-center h-8 w-full px-1 font-light text-[#d9e3ea] select-none ${
          f.filename == file.name ? "bg-[#1c1cff]" : "bg-[#5d5dff69]"
        }  hover:bg-[#1c1cffd4] transition-colors cursor-pointer  rounded-md`}
        onClick={() => {
          if (!anchorEl) {
            setFile((draft) => {
              draft.name = f.filename
              draft.content = f.content
            })
          }
        }}
      >
        <div className='flex gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 128 128'
            id='c'
            width={30}
            height={30}
          >
            <path
              fill='#fff'
              d='M85.3 76.1c-4.2 7.4-12.2 12.4-21.3 12.4-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z'
            ></path>
          </svg>
          {f.filename}.c
        </div>
        <IconButton
          size='small'
          color='inherit'
          id={"file-menu-" + f.file_id}
          onClick={(e) => {
            e.stopPropagation()
            handleClick(e)
          }}
        >
          <MoreVertOutlined fontSize='small' />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id={"file-menu-" + f.file_id}
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
          <MenuItemStyled
            onClick={() => {
              handleClose()
              handleDelete()
            }}
          >
            <ListItemIcon>
              <DeleteOutlineOutlined fontSize='small' sx={{ color: "white" }} />
            </ListItemIcon>
            Supprimer
          </MenuItemStyled>
          <MenuItemStyled
            onClick={() => {
              handleClose()
              handleOpenModal()
            }}
          >
            <ListItemIcon>
              <ModeEditOutlineOutlined
                fontSize='small'
                sx={{ color: "white" }}
              />
            </ListItemIcon>
            Modifier
          </MenuItemStyled>
          <MenuItemStyled
            onClick={() => {
              group()
              handleClose()
            }}
          >
            <ListItemIcon>
              <ScreenShareOutlined fontSize='small' sx={{ color: "white" }} />
            </ListItemIcon>
            Partager
          </MenuItemStyled>
        </Menu>
      </div>
      {/* update File Modal */}
      <Modal
        open={openM}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            gutterBottom
          >
            Créer un fichier
          </Typography>
          <Input
            label='Nom du fichier'
            helperText='enter un Nom pour le fichier'
            variant='outlined'
            fullWidth
            sx={{ marginY: "20px" }}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <div className='flex gap-2 w-full items-center justify-center'>
            <Button
              variant='contained'
              color='primary'
              sx={{
                width: "100px",
                backgroundColor: "#5c5cfe",
                "&:hover ": {
                  backgroundColor: "#5c5cfeba",
                },
              }}
              onClick={() => {
                if (fileName == "") return
                handleUpdate()
              }}
            >
              Save
            </Button>
            <Button
              variant='contained'
              className='about-color'
              sx={{
                backgroundColor: "#5c5cfe",
                letterSpacing: "1px",
                fontFamily: "'Inter', sans-serif",
                width: "100px",
              }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Toast */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.type != "" ? toast.type : "success"}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default File
