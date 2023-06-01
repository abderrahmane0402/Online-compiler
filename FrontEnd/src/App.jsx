import { Route, Routes } from "react-router-dom"
import Ide from "./IDE/Ide"
import ProfileModal from "./IDE/components/ProfileModal"
import ProfilePage from "./IDE/components/ProfilePage"
import Essay from "./authentication/Essay"
import Signup from "./authentication/Signup"
import Signin from "./authentication/Signin"
import { createContext, useContext, useEffect, useState } from "react"
import { useImmer } from "use-immer"
import Partage from "./partage1/partage"
import Partage2 from "./partage2/partage2"

export const fileInfo = createContext()

const App = () => {
  const [file, setFile] = useImmer({
    name: "",
    content: "",
    result: "",
  })
  const [socket, setSocket] = useState(null)

  return (
    <fileInfo.Provider value={{ file, setFile, socket, setSocket }}>
      <Routes>
        {/* Authentication page */}
        <Route path='/' element={<Essay />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        {/* main page */}
        <Route path='/ide' element={<Ide />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile' element={<ProfileModal />} />
        {/* code share page */}
        <Route path='/partage' element={<Partage />} />
        <Route path='/partage2' element={<Partage2 />} />
      </Routes>
    </fileInfo.Provider>
  )
}

export default App
