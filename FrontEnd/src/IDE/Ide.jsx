import { useEffect, useState } from "react"
import Header from "./layout/Header"
import { useNavigate } from "react-router-dom"
import Layout from "./layout"
import Editor from "./layout/Editor"
import FileManager from "./layout/FileManager"
import Terminal from "./layout/Terminal"
import Inputs from "./layout/inputs"
import Main from "./layout/main"

export default function Ide() {
  const router = useNavigate()
  const [user, setUser] = useState(null)
  const [files, setFiles] = useState([])
  useEffect(() => {
    setUser(sessionStorage.getItem("email"))
    if (!sessionStorage.getItem("email")) router("/", { replace: true })
  }, [])
  return (
    <Layout>
      <Header />
      <Main>
        {user != "essay" && <FileManager files={{ files, setFiles }} />}
        <Editor files={{ files, setFiles }} />
        <div className='h-full flex flex-col gap-4'>
          <Terminal />
          <Inputs />
        </div>
      </Main>
    </Layout>
  )
}
