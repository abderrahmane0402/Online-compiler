import { Route, Routes } from "react-router-dom"
import Ide from "./IDE/Ide"
import ProfileModal from "./IDE/components/ProfileModal"
import ProfilePage from "./IDE/components/ProfilePage"
import Essay from "./authentication/Essay"
import Partage from "./Partage/Partage"

const App = () => {
  return (
    <Routes>
      {/* Authentication page */}
      <Route path='/' element={<Essay />} />

      {/* main page */}
      <Route path='/ide' element={<Ide />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/profile' element={<ProfileModal />} />

      {/* code share page */}
      <Route path='/Partage' element={<Partage />} />

      {/* <Route path="/files" element={<NavField />} /> */}
    </Routes>
  )
}

export default App
