import { useEffect, useState } from "react"
import Header from "./layout/Header"
// import Tools from "./components/Tools";
import Layout from "./layout"
import FileManager from "./layout/FileManager"
import Main from "./layout/main"
import { useNavigate } from "react-router-dom"
import Editor from "./layout/Editor"
import Terminal from "./layout/Terminal"
import io from "socket.io-client"
import Input from "../components/Input"
import Inputs from "./layout/inputs"

export default function Ide() {
  const router = useNavigate()
  const [user, setUser] = useState(null)
  useEffect(() => {
    setUser(sessionStorage.getItem("email"))
    if (!sessionStorage.getItem("email")) router("/", { replace: true })
  }, [])
  return (
    <Layout>
      <Header />
      <Main>
        {user != "essay" && <FileManager />}
        <Editor />
        <div className='h-full flex flex-col gap-4'>
          <Terminal />
          <Inputs />
        </div>
      </Main>
    </Layout>
  )
}
