import React from "react"
import ShortUser from "../components/ShortUser"

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
