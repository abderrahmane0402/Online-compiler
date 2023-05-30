import { Button, Typography } from "@mui/material"
import Layout from "./layout"
import { Link } from "react-router-dom"

export default function Essay() {
  return (
    <Layout>
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
          editeur et compilateur online de language C facile et simple a
          utiliser
        </Typography>
        <div className='mt-8 flex gap-6'>
          <Link to={"/ide"} replace>
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
              onClick={() => {
                sessionStorage.setItem("email", "essay")
              }}
            >
              Essayer editeur
            </Button>
          </Link>
          <Button
            variant='contained'
            size='large'
            className='about-color'
            sx={{
              textTransform: "none",
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
    </Layout>
  )
}
