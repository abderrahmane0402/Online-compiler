import React from "react"
import ShortUser from "./ShortUser"

const Header = () => {
  return (
    <header className='flex min-h-[80px] w-full items-center justify-between pr-6'>
      <p className='text-4xl text-[#3343e7] text-center font-bold w-56 select-none'>
        CodeX
      </p>
      <div className='h-full flex flex-row-reverse items-center justify-center'>
        <ShortUser />
      </div>
    </header>
  )
}

export default Header
