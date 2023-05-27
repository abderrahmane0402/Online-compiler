import { Route, Routes } from "react-router-dom";
import Auth from "./authentication/Auth";
import Ide from "./IDE/Ide";
import ProfilePage from "./IDE/components/ProfilePage";
import ProfileModal from "./IDE/components/ProfileModal";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/ide" element={<Ide />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile" element={<ProfileModal />} />
      <Route path="/Partage" element={<Partage />} />
      
      

      {/* <Route path="/files" element={<NavField />} /> */}

    </Routes>
  );
};


export default App;
