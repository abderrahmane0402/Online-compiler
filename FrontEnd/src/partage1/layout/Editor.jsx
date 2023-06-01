import MonacoEditor from "@monaco-editor/react"
import {
  Download,
  DriveFolderUploadOutlined,
  PlayArrow,
} from "@mui/icons-material"
import { IconButton } from "@mui/material"
import axios from "axios"
import { useContext } from "react"
import { fileInfo } from "../../App"

const Editor = ({}) => {
  const { file, setFile, socket } = useContext(fileInfo)
  const handleChange = (value, event) => {
    if (socket) {
      socket.emit("UpdateCode", {
        name: file.name,
        content: value,
        result: file.result,
      })
      console.log("modifier")
    }
    setFile((draft) => {
      draft.content = value
    })
  }
  const CompileCode = async () => {
    try {
      const compile = await axios.post("http://localhost:5000/compile", {
        code: file.content,
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
  return (
    <div className='h-full w-full bg-[#202327] shadow-sm outline outline-1 outline-[#363e55] rounded-xl flex flex-col justify-between ml-1 overflow-hidden'>
      <header className='w-full max-h-[30px] p-1 border-[#363e55] border-b text-white flex flex-row-reverse items-center justify-between'>
        <div aria-label='right-icons' className='flex items-center gap-2'>
          <IconButton color='inherit' size='small'>
            <DriveFolderUploadOutlined />
          </IconButton>
          <IconButton color='inherit' size='small'>
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
    </div>
  )
}

export default Editor
