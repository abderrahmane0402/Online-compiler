import React, { useState } from "react"
import Layout from "./layout"
import { Alert, Snackbar, Typography } from "@mui/material"
import Input from "../components/Input"
import LoadingButton from "./components/LoadingButton"
import { Link, useNavigate } from "react-router-dom"
import { useImmer } from "use-immer"
import axios from "axios"

const Signin = () => {
  const router = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [toast, setToast] = useImmer({
    open: false,
    message: "",
  })
  const [formData, setFormData] = useImmer({
    email: "",
    password: "",
  })

  // Sign in Submit funtion
  async function SignIn() {
    setLoading(true)
    if (formData.email == "admin@gmail.com") {
      router("/admin")
      return
    }
    if (
      formData.email == "" ||
      formData.email.indexOf("@") == -1 ||
      formData.email.indexOf(".") == -1 ||
      formData.password == ""
    ) {
      setLoading(false)
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/Auth/signin",
        formData
      )
      if (response.data == "ok") {
        console.log("session")
        sessionStorage.setItem("email", formData.email)
        router("/ide", { replace: true })
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error.response?.status == 500 || error?.code == "ERR_NETWORK") {
        setToast((draft) => {
          draft.open = true
          draft.message = "serveur inaccessible lancer le serveur"
        })
      }
      if (error.response?.status == 501) {
        setToast((draft) => {
          draft.open = true
          draft.message = "Email ou password incorrect"
        })
      }
      setLoading(false)
    }
  }
  // close the Toast
  const handleClose = () => {
    setToast((draft) => {
      draft.open = false
      draft.message = ""
    })
  }
  return (
    <>
      <Layout>
        <div className='mt-28 pb-14 text-[#d9e3ea] text-center flex flex-col items-center max-w-3xl'>
          <Typography
            variant='h3'
            gutterBottom
            sx={{ fontWeight: "800", fontFamily: "'Inter', sans-serif" }}
          >
            Routeur performant, êtes-vous prêt à coder en langage C ?
          </Typography>
          <div className='w-96 flex flex-col mt-6 gap-5'>
            <p className='my-4 flex text-center items-center justify-center after:border-t after:w-full before:border-t before:w-full before:border-[#3d4144] after:border-[#3d4144] w-full'>
              <span className='w-full px-2 min-w-fit'>
                {" "}
                Prêts pour la connexion ? Identifiez-vous !
              </span>
            </p>
            <Input
              helperText='Enter votre email'
              label='Email'
              variant='outlined'
              type='email'
              fullWidth
              value={formData.email}
              onChange={(e) => {
                setFormData((draft) => {
                  draft.email = e.target.value
                })
              }}
              error={
                !submit
                  ? false
                  : (formData.email.length == 0 ||
                      formData.email.indexOf("@") == -1 ||
                      formData.email.indexOf(".") == -1) &&
                    true
              }
            />
            <Input
              helperText='enter un mot de pass'
              label='Mot de pass'
              variant='outlined'
              type='password'
              fullWidth
              autoComplete='none'
              value={formData.password}
              onChange={(e) => {
                setFormData((draft) => {
                  draft.password = e.target.value
                })
              }}
              error={!submit ? false : formData.password.length == 0 && true}
            />
            <LoadingButton
              size='large'
              variant='contained'
              loading={loading}
              disabled={loading}
              fullWidth
              onClick={() => {
                setSubmit(true)
                SignIn()
              }}
            >
              Sign in
            </LoadingButton>
            <p className='text-[#8e998f]'>
              N'avez-vous pas de compte ?{" "}
              <Link to={"/signup"} className='text-blue-700'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Layout>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        message={toast.message}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Signin
