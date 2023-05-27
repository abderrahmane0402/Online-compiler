const express = require("express")
const router = express.Router()
const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDE",
  password: " ",
  port: 5432,
})

router.use(express.json())

/******************** LOGIN ********************/
router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    )
    if (rows.length > 0) {
      res.status(200).send("ok")
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    console.error(error)
    res.status(501).send(error)
  }
})

/******************** Sing up ********************/
router.post("/signup", async (req, res) => {
  const { user, email, password } = req.body
  try {
    const client = await pool.connect()
    await client.query(
      `INSERT INTO users (username, email, password) VALUES ('${user}', '${email}', '${password}')`
    )
    client.release()
    res.status(200).send("ok")
  } catch (error) {
    console.log(error)
    res.status(501).send(error)
  }
})

module.exports = router
