import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header className='flex min-h-[80px] w-full items-center justify-between px-44'>
      <p className='text-4xl text-[#5c5cfe] text-center font-bold w-64 select-none'>
        CodeX
      </p>
      <div className='flex gap-2'>
      <Link to={'/Admin'}>
        <Button
          variant='contained'
          sx={{
            textTransform: "none",
            backgroundColor: "#5c5cfe",
            fontWeight: "500",
            
            fontSize: 17,
          }}
        >
          Back
        </Button>
        </Link>
</div>
    </header>
  )
}

export default Header
