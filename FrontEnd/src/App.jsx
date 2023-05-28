import { Route, Routes } from "react-router-dom"
import Ide from "./IDE/Ide"
import ProfileModal from "./IDE/components/ProfileModal"
import ProfilePage from "./IDE/components/ProfilePage"
import Partage from "./Partage/Partage"
import Essay from "./authentication/Essay"
import Signup from "./authentication/Signup"
import Signin from "./authentication/Signin"
import { createContext, useContext, useEffect } from "react"
import { useImmer } from "use-immer"

export const fileInfo = createContext()

const App = () => {
  const [file, setFile] = useImmer({
    name: "",
    content: "",
  })
  useEffect(() => {
    console.log(file)
  }, [file])
  return (
    <fileInfo.Provider value={{ file, setFile }}>
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
        <Route path='/Partage' element={<Partage />} />
      </Routes>
    </fileInfo.Provider>
  )
}

export default App
