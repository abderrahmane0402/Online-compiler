const express = require("express")
const { Pool } = require("pg")
const router = express.Router()

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDE",
  password: " ",
  port: 5432,
})
router.use(express.json())

router.post("/", async (req, res) => {
  try {
    const { user } = req.body
    const { rows } = await pool.query(
      "select * from file natural join users where email=$1  order by file_id;",
      [user]
    )
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
})
router.delete("/:fileId", async (req, res) => {
  const fileId = req.params.fileId
  try {
    await pool.query("DELETE FROM file WHERE file_id = $1", [fileId])
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
})
router.put("/:fileId", async (req, res) => {
  const fileId = req.params.fileId
  const { fileName , user } = req.body
  try {
    //check if the file already exists by user
    const checkfile = await pool.query(
      "SELECT file_id FROM file WHERE filename = $1 AND email = $2",
      [fileName, user]
    )
    if (checkfile.rows.length) return res.sendStatus(409)
    await pool.query("UPDATE file SET filename = $1 WHERE file_id = $2 ", [
      fileName,
      fileId,
    ])
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
})
router.post("/create", async (req, res) => {
  const { fileName, user, content } = req.body
  try {
    //check if the file already exists by user
    const checkfile = await pool.query(
      "SELECT file_id FROM file WHERE filename = $1 AND email = $2",
      [fileName, user]
    )
    if (checkfile.rows.length) return res.sendStatus(409)
    await pool.query(
      "INSERT INTO file (filename , email , content) VALUES ($1 , $2 , $3)",
      [fileName, user, content]
    )
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
})
router.get("/search", async (req, res) => {
  const searchTerm = req.query.search

  try {
    const { rows } = await pool.query(
      "SELECT * FROM file WHERE filename ILIKE $1",
      [`%${searchTerm}%`]
    )
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal server error")
  }
})

module.exports = router
