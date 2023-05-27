import React from "react"
import userLogo from "../img/icons8-up-right-32.png"
import { Button, Typography } from "@mui/material"

const test = () => {
  return (
    //   <div className="  w-1/2 bg-[#0F292F] rounded-xl flex flex-row py-3 px-3 ">
    //   <p className=" text-white font-bold text-justify text-2xl"> You can access the text editor without needing a CodeX account
    //      if you have logged in without an account you can click on the button below  <br />
    //      <button className="bg-[#501F3A] hover:bg-[#501F3A] active:bg-light text-white  py-0 px-3  w-32 text-xl  rounded ">
    //        <p className="justify-center flex flex-row text-slate-100">Try <img
    //           src={userLogo}
    //           alt="logo"
    //           className=""
    //        ></img></p>
    //     </button>
    //   </p>
    //   </div>
    <div className='mt-28 text-[#d9e3ea] text-center flex flex-col items-center'>
      <Typography
        variant='h3'
        gutterBottom
        sx={{ fontWeight: "800", fontFamily: "'Inter', sans-serif" }}
      >
        Editeur/Compilateur C
      </Typography>
      <Typography
        variant='h5'
        sx={{ fontFamily: "'Inter', sans-serif", color: "#818c95" }}
      >
        editeur et compilateur online de language C facile et simple a utiliser
      </Typography>
      <div className='mt-8 flex gap-6'>
        <Button
          variant='contained'
          size='large'
          sx={{
            textTransform: "none",
            backgroundColor: "#5c5cfe",
            fontWeight: "400",
            fontSize: 16,
            letterSpacing: "1px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Essayer editeur
        </Button>
        <Button
          variant='contained'
          size='large'
          className="about-color"
          sx={{
            textTransform: "none",
            backgroundColor: "#5c5cfe",
            fontWeight: "400",
            fontSize: 16,
            letterSpacing: "1px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          About
        </Button>
      </div>
    </div>
  )
}

export default test
