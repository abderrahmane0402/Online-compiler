import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header className='flex min-h-[80px] w-full items-center justify-between px-44'>
      <Link to={"/"}>
        <p className='text-4xl text-[#3343e7] text-center font-bold w-64 select-none'>
          CodeX
        </p>
      </Link>
      <div className='flex gap-2'>
        <Link to={"/signin"}>
          <Button
            variant='text'
            sx={{
              textTransform: "none",
              fontWeight: "500",
              color: "#3343e7",
              fontSize: 17,
            }}
            className='hover:text-white'
          >
            Sign in
          </Button>
        </Link>
        <Link to={"/signup"}>
          <Button
            variant='contained'
            sx={{
              textTransform: "none",
              backgroundColor: "#5c5cfe",
              fontWeight: "500",
              fontSize: 17,
            }}
          >
            Sign up
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
