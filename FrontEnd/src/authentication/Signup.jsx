import { Alert, Snackbar, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useImmer } from "use-immer"
import Layout from "./layout"
import Input from "../components/Input"
import LoadingButton from "./components/LoadingButton"

const Signup = () => {
  const router = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [toast, setToast] = useImmer({
    open: false,
    message: "",
  })
  const [formData, setFormData] = useImmer({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Sign up Submit funtion
  async function SignUp() {
    setLoading(true)
    if (
      formData.user == "" ||
      formData.email == "" ||
      formData.email.indexOf("@") == -1 ||
      formData.email.indexOf(".") == -1 ||
      formData.password == "" ||
      formData.confirmPassword == ""
    ) {
      setLoading(false)
      return
    }
    if (formData.password != formData.confirmPassword) {
      setToast((draft) => {
        draft.open = true
        draft.message = "les mots de passes ne sont pas identiques"
      })
      setLoading(false)
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/Auth/signup",
        formData
      )
      console.log(response.data)
      if (response.data == "ok") {
        router("/signin")
      }
      setLoading(false)
    } catch (error) {
      if (error.response?.status == 500) {
        setToast((draft) => {
          draft.open = true
          draft.message = "serveur inaccessible lancer le serveur"
        })
      }
      if (error.response?.status == 501) {
        setToast((draft) => {
          draft.open = true
          draft.message = "Email deja utiliser"
        })
      }
      setLoading(false)
      console.log(error)
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
        <div className='mt-28 pb-16 text-[#d9e3ea] text-center flex flex-col items-center max-w-3xl'>
          <Typography
            variant='h3'
            gutterBottom
            sx={{ fontWeight: "800", fontFamily: "'Inter', sans-serif" }}
          >
            Bienvenue. Nous existons pour faciliter l’apprentissage du Language
            C.
          </Typography>
          <div className='w-96 flex flex-col mt-6 gap-5'>
            <p className='my-4 flex text-center items-center justify-center after:border-t after:w-full before:border-t before:w-full before:border-[#3d4144] after:border-[#3d4144] w-full'>
              <span className='w-full px-2 min-w-fit'>
                {" "}
                Inscrivez-vous avec votre adresse e-mail
              </span>
            </p>
            <Input
              helperText='Enter votre Nom et Prenom'
              label='Nom complet'
              variant='outlined'
              fullWidth
              autoComplete='none'
              value={formData.user}
              onChange={(e) =>
                setFormData((draft) => {
                  draft.user = e.target.value
                })
              }
              error={!submit ? false : formData.user.length == 0 && true}
            />
            <Input
              helperText='Enter votre email'
              label='Email'
              variant='outlined'
              type='email'
              fullWidth
              autoComplete='none'
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
              error={
                !submit
                  ? false
                  : formData.password.length == 0
                  ? true
                  : formData.password != formData.confirmPassword
              }
            />
            <Input
              helperText='confirmer le mot de pass'
              label='confirmation du mot de pass'
              variant='outlined'
              type='password'
              fullWidth
              autoComplete='none'
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((draft) => {
                  draft.confirmPassword = e.target.value
                })
              }}
              error={
                !submit
                  ? false
                  : formData.confirmPassword.length == 0
                  ? true
                  : formData.password != formData.confirmPassword
              }
            />
            <LoadingButton
              size='large'
              variant='contained'
              loading={loading}
              disabled={loading}
              fullWidth
              onClick={() => {
                setSubmit(true)
                SignUp()
              }}
            >
              Sign up
            </LoadingButton>
            <p className='text-[#8e998f]'>
              Vous utilisez déjà CodeX ?{" "}
              <Link to={"/signin"} className='text-blue-700'>
                Sign in
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

export default Signup
