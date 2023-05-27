const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pfe",
  password: " ",
  port: 5432,
});

router.use(express.json());

/******************** LOGIN ********************/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (rows.length > 0) {
      res.send({ success: true, message: "Login successful" });
    } else {
      res.send({ success: false, message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: "An error occurred" });
  }
});

/******************** Sing up ********************/
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username , email , password);
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`
    );
    client.release();
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});




module.exports = router;
