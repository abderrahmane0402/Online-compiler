import { NoteAddOutlined } from "@mui/icons-material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import File from "../components/file"
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

const content =
  '#include<stdio.h>\n\nint main(){\n\tprintf("hello world");\n\treturn 0;\n}'

const FileManager = ({files}) => {
  const [fileName, setFileName] = useState("")
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useImmer({
    open: false,
    message: "",
    type: "",
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setFileName("")
  }

  const handleCreate = async () => {
    const user = sessionStorage.getItem("email")
    try {
      await axios.post("http://localhost:5000/files/create", {
        fileName,
        user,
        content,
      })
      fetchFiles() // Fetch updated files after creation
      handleClose()
      setToast((draft) => {
        draft.open = true
        draft.message = "Fichier Créer avec succés"
        draft.type = "success"
      })
    } catch (error) {
      console.error(error)
      handleClose()
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
    }
  }

  const handleCloseToast = () => {
    setToast((draft) => {
      draft.open = false
      draft.message = ""
      draft.type = ""
    })
  }
  const fetchFiles = async () => {
    try {
      const user = sessionStorage.getItem("email")
      const response = await axios.post("http://localhost:5000/files", { user })
      files.setFiles(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchFiles()
  }, [])

  

  return (
    <>
      <nav className='h-full min-w-[224px] flex-col items-center gap-2 px-1'>
        {/* Search Input */}
        <div className='w-full flex items-center px-1'>
          <input
            type='text'
            placeholder='Search'
            className='w-full min-h-[32px] bg-[#1e293b] rounded-md px-1 text-white hover:bg-[#263348] transition-colors'
          />
        </div>
        {/* File List */}
        <div className='w-full flex flex-col items-center gap-2 px-1'>
          {/* Header of the file list */}
          <div className='h-10 w-full flex justify-between items-center text-[#d9e3ea] select-none'>
            <div className='flex gap-1 items-center '>
              <ExpandMoreIcon fontSize='small' />
              <Typography variant='body1'>File Manager</Typography>
            </div>
            <IconButton color='inherit' aria-label='add' onClick={handleOpen}>
              <NoteAddOutlined fontSize='small' />
            </IconButton>
          </div>
          <div className='h-fit w-full flex flex-col items-center gap-2'>
            {files.files.map((f) => (
              <File f={f} fetchFiles={fetchFiles} />
            ))}
          </div>
        </div>
      </nav>
      {/* Add File Modal */}
      <Modal
        open={open}
        onClose={handleClose}
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
                handleCreate()
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
              onClick={handleClose}
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

export default FileManager
