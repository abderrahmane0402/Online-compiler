import React from "react"
import ShortUser from "../components/ShortUser"
// const CompileCode = (code) => {
//   Axios.post("http://localhost:3500/", { code })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   console.log("click");
// };
const Header = () => {
  return (
    <header className='flex min-h-[80px] w-full items-center justify-between pr-6'>
      <p className='text-4xl text-[#3343e7] text-center font-bold w-56 select-none'>
        CodeX
      </p>
      <ShortUser />
    </header>
  )
}

export default Header
