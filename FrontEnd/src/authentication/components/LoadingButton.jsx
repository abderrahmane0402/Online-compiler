import { styled } from "@mui/material"
import { LoadingButton } from "@mui/lab"

const LoadingButtonStyled = styled(LoadingButton)({
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#283543",
  },
  "& .MuiLoadingButton-loadingIndicator": {
    color: "blue",
  },
})

export default LoadingButtonStyled
