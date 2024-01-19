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
import Admins from "./Admin/Admins"
import Admin from "./Admin/Admin"
import Ad from "./Admin/Ad"
import AdmEd from "./Admin/AdmEd"
import AdEdF from "./Admin/AdEdF"

export const fileInfo = createContext()

const App = () => {
  const [file, setFile] = useImmer({
    name: "",
    content: "",
    result: "",
    input: "",
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
        {/* Admin */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/view/:id' element={<Admins />} />
        <Route path='/admin/add' element={<Ad />} />
        <Route path='/admin/edit/:id' element={<AdmEd />} />
        <Route path='/admin/view/:id/editF/:file_id' element={<AdEdF />} />
      </Routes>
    </fileInfo.Provider>
  )
}

export default App
