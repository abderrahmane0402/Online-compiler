const { compile } = require("./compile/compile")
const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
})

app.use(express.json())

app.use(cors())

/************** compilation  **************/
app.post("/compile", async (req, res) => {
  try {
    let r = await compile(req.body.code)
    res.send(r)
  } catch (err) {
    console.log(err)
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

/*************** Partage du code entre les utilisateurs *****************/

io.on("connection", (socket) => {
  console.log(`user connected ${socket.handshake.auth.email}`)
  socket.on("create-group", (group) => {
    console.log(group)
    socket.join(group)
    socket
      .to(group)
      .emit("new-group", "Tu as créé un nouveau groupe de partage")
  })
})

http.listen(5000)
