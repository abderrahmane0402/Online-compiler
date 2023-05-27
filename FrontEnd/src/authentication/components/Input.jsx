import { TextField, styled } from "@mui/material"

const Input = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2f3236",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#607480",
  },
  "& .MuiFormLabel-root ": {
    color: "#607480",
  },
})

export default Input
