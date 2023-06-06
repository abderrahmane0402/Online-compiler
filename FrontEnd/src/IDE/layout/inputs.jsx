import MonacoEditor from "@monaco-editor/react"
import { useContext } from "react"
import { fileInfo } from "../../App"

const Inputs = () => {
  const { file, setFile } = useContext(fileInfo)
  const handleChange = (value, event) => {
    setFile((draft) => {
      draft.input = value
    })
  }
  return (
    <div className=' h-full min-w-[400px] bg-[#202327] outline outline-1 outline-[#363e55] flex flex-col ml-3 mr-2'>
      <header className='w-full min-h-[30px] border-b border-[#363e55] flex items-center justify-center text-white font-semibold text-xl'>
        Input
      </header>
      <div className='w-full h-full'>
        <MonacoEditor
          theme='vs-dark'
          options={{
            fontSize: 18,
            lineHeight: 25,
            scrollBeyondLastLine: false,
            fontWeight: "500",
            fontFamily: "monospace",
            letterSpacing: 2,
            lineNumbers: "off",
            minimap: {
              enabled: false,
            },
            dropIntoEditor: true,
            cursorStyle: "block",
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            wordWrap: "on",
          }}
          value={file.input}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Inputs
