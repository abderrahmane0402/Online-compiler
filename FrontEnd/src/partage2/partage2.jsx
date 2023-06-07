import { useContext, useEffect, useState } from "react"
import Header from "./layout/Header"
// import Tools from "./components/Tools";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { fileInfo } from "../App"
import Layout from "./layout"
import Editor from "./layout/Editor"
import Terminal from "./layout/Terminal"
import Main from "./layout/main"

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
export default function Partage2() {
  const [group, setGroup] = useState("")
  const router = useNavigate()
  let { file, setFile, socket } = useContext(fileInfo)
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!sessionStorage.getItem("email")) router("/", { replace: true })
  }, [])

  const joinGroup = () => {
    socket.emit("join-Group", group)
  }

  useEffect(() => {
    socket.on("error", (err) => console.log(err))
    socket.on("file", (data) => {
      setFile(data)
    })
    socket.on("code", (code) => {
      setFile(code)
    })
  }, [])

  return (
    <>
      <Layout>
        <Header />
        <Main>
          <Editor />
          <Terminal />
        </Main>
      </Layout>
      <Modal
        open={open}
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
            Code d'acces au group
          </Typography>
          <Input
            label='Code de group'
            helperText="enter un le Code d'acces"
            variant='outlined'
            fullWidth
            autoComplete='none'
            sx={{ marginY: "20px" }}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
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
                if (group == "") return
                joinGroup()
                handleClose()
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
