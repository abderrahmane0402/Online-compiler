import MonacoEditor from "@monaco-editor/react"
import {
  Download,
  DriveFolderUploadOutlined,
  PlayArrow,
  Save,
} from "@mui/icons-material"
import { Alert, IconButton, Snackbar } from "@mui/material"
import axios from "axios"
import { useContext, useRef } from "react"
import { fileInfo } from "../../App"
import { useImmer } from "use-immer"

const Editor = ({ files }) => {
  const { file, setFile } = useContext(fileInfo)
  const [toast, setToast] = useImmer({
    open: false,
    message: "",
    type: "",
  })
  const input = useRef(null)

  const handleCloseToast = () => {
    setToast((draft) => {
      draft.open = false
      draft.message = ""
      draft.type = ""
    })
  }

  const handleChange = (value, event) => {
    setFile((draft) => {
      draft.content = value
    })
  }

  const CompileCode = async () => {
    try {
      const compile = await axios.post("http://localhost:5000/compile", {
        code: file.content,
        input: file.input,
      })
      setFile((draft) => {
        draft.result = compile.data
      })
    } catch (e) {
      console.log(e)
      setFile((draft) => {
        draft.result = "error connection au serveur"
      })
    }
  }

  const SaveFile = async () => {
    try {
      await axios.post("http://localhost:5000/files/save", {
        fileName: file.name,
        content: file.content,
        user: sessionStorage.getItem("email"),
      })
      fetchFiles() // Fetch updated files after creation
      setToast((draft) => {
        draft.open = true
        draft.message = "Fichier sauvegarder avec success"
        draft.type = "success"
      })
    } catch (e) {
      console.log(e)
      setToast((draft) => {
        draft.open = true
        draft.message = "Fichier n'est pas sauvegarder"
        draft.type = "error"
      })
    }
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const fileContent = e.target.result
      setFile((draft) => {
        draft.content = fileContent
      })
    }
    reader.readAsText(file)
  }

  const handleDownloadClick = () => {
    const content = file.content
    const fileName = file.name + ".c"

    const element = document.createElement("a")
    const fileInfo = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(fileInfo)
    element.download = fileName
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className='h-full w-full bg-[#202327] shadow-sm outline outline-1 outline-[#363e55] rounded-xl flex flex-col justify-between ml-1 overflow-hidden'>
      <header className='w-full max-h-[30px] p-1 border-[#363e55] border-b text-white flex flex-row-reverse items-center justify-between'>
        <div aria-label='right-icons' className='flex items-center gap-2'>
          <IconButton
            color='inherit'
            size='small'
            onClick={SaveFile}
            disabled={file.name == ""}
            sx={{
              ":disabled": {
                color: "#4e4e4e",
              },
            }}
          >
            <Save />
          </IconButton>
          <IconButton
            color='inherit'
            size='small'
            onClick={() => input.current.click()}
          >
            <DriveFolderUploadOutlined />
          </IconButton>
          <IconButton
            color='inherit'
            size='small'
            disabled={file.name == ""}
            sx={{
              ":disabled": {
                color: "#4e4e4e",
              },
            }}
            onClick={handleDownloadClick}
          >
            <Download />
          </IconButton>
          <IconButton color='inherit' size='small' onClick={CompileCode}>
            <PlayArrow />
          </IconButton>
        </div>
      </header>
      <div className='w-full h-full'>
        <MonacoEditor
          language='cpp'
          theme='vs-dark'
          options={{
            fontSize: 18,
            lineHeight: 25,
            scrollBeyondLastLine: false,
            fontWeight: "500",
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
          onChange={handleChange}
          value={file.content}
        />
      </div>
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
      <input
        ref={input}
        type='file'
        className='hidden'
        onChange={handleFileChange}
        accept='.c'
      />
    </div>
  )
}

export default Editor
