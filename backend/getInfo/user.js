const express = require("express");
const router = express.Router();
const { Pool } = require("pg");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDE",
  password: "1234sa4321",
  port: 5432,
});

router.use(express.json());

router.post('/user' , async (req , res) =>{
    const {  email , password } = req.body
    try {
        
    } catch (error) {
        
    }
})

router.post("/", async (req, res) => {
  try {
    const { login } = req.body;
    console.log(login);
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [login]);
    
    if (rows.length > 0) {
      console.log(rows);
      res.send({ rows });
    }  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});
router.put("/update", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await pool.query(
      "UPDATE users SET username = $1, password = $2 WHERE email = $3",
      [username, password, email]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});










module.exports = router;
