const { compile } = require("./compile/compile")
const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
  },
})

app.use(express.json())

app.use(cors())

/************** compilation  **************/
app.post("/compile", async (req, res) => {
  try {
    let r = await compile(req.body.code, req.body.input)
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
const { generateRandomCode } = require("./utils/CodeGenerator")
app.use("/profile", profile)

/* Admin */
const admin = require("./Admin/index")
app.use("/Admin", admin)

/*************** Partage du code entre les utilisateurs *****************/

io.on("connection", (socket) => {
  let Pgroup, admin
  socket.on("create-group", () => {
    Pgroup = generateRandomCode()
    admin = socket.id
    socket.join(Pgroup)
    socket.emit("new-group", Pgroup)
    console.log(socket.adapter.rooms)
  })

  socket.on("UpdateCode", (code) => {
    socket.broadcast.to(Pgroup).emit("code", code)
  })

  socket.on("send-file", (file, id) => {
    socket.broadcast.to(id).emit("file", file)
  })

  socket.on("join-Group", (Group) => {
    if (socket.adapter.rooms.has(Group)) {
      Pgroup = Group
      socket.join(Group)
      socket.broadcast
        .to(Pgroup)
        .emit("joined", socket.handshake.auth.email, socket.id)
    } else socket.emit("error", "Group not found")
    console.log(socket.adapter.rooms)
  })

  socket.on("admin-disconnect", () => {
    socket.broadcast.to(Pgroup).emit("remove-group")
    socket.leave(Pgroup)
  })

  socket.on("leave-group", () => {
    socket.broadcast.to(Pgroup).emit("user-disconnect", socket.id)
  })

  socket.on("remove-user", (id) => {
    socket.broadcast.to(id).emit("remove-group")
  })

  socket.on("disconnect", (reason) => {
    if (socket.id == admin) {
      socket.broadcast.to(Pgroup).emit("remove-group")
      socket.leave(Pgroup)
    } else {
      socket.broadcast.to(Pgroup).emit("user-disconnect", socket.id)
    }
  })
})

http.listen(5000)
