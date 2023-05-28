import MonacoEditor from "@monaco-editor/react"
import { useContext } from "react"
import { fileInfo } from "../../App"

const Editor = ({}) => {
  const { file, setFile } = useContext(fileInfo)
  const handleChange = (value, event) => {
    setFile((draft) => {
      draft.content = value
    })
  }
  return (
    <div className='h-full w-full bg-[#202327] shadow-sm outline outline-1 outline-[#363e55] rounded-xl flex flex-col justify-between'>
      <header className='w-full min-h-[30px] border-[#363e55] border-b'></header>
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
