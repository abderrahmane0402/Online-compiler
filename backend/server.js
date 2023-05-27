const { compile } = require("./compile/compile")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())

app.use(cors())

/************** compilation  **************/
app.post("/compile", async (req, res) => {
  try {
    let r = await compile(req.body.code)
    res.send(r)
  } catch (err) {
    res.send(err)
  }
})

/************** authentication *************/
const auth = require("./authentication")
app.use("/Auth", auth)
const files = require("./getInfo/files")
app.use("/files", files)

const profile = require("./getInfo/user")
app.use("/profile", profile)

app.listen(5000)
