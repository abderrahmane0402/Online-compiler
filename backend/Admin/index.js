const express = require("express");
const router = express.Router();
const { Pool } = require("pg");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDE",
  password: " ",
  port: 5432,
});

router.use(express.json());
router.get('/admin', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      const users = result.rows;
      client.release();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.post("/create", async (req, res) => {
    const { username, email, password } = req.body
    try {
      const client = await pool.connect()
      await client.query(
        `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`
      )
      client.release()
      res.status(200).send("ok")
    } catch (error) {
      console.log(error)
      res.status(501).send(error)
    }
  })

  router.delete("/delete/:email", async (req, res) => {
    const email = req.params.email;
    try {
      await pool.query("DELETE FROM users WHERE email = $1", [email]);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
 // ...

// ...

router.delete("/deleteF/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  try {
    await pool.query("DELETE FROM file WHERE file_id = $1", [fileId]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// ...


// ...

  router.put('/update', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE email = $4';
      const values = [username, email, password , email];
    
      await pool.query(query, values);
      res.status(200).json('Utilisateur mis à jour avec succès');
    } catch (error) {
      console.error(error);
      res.status(500).json('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur');
    }
  });
  router.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
  
    try {
      const query = `
        SELECT * FROM users
        WHERE username LIKE $1
        OR email LIKE $1
        OR password LIKE $1
      `;
      const result = await pool.query(query, [`%${searchQuery}%`]);
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('An error occurred while searching for users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/searchF', async (req, res) => {
    const searchQuery = req.query.query;
  
    try {
      const query = `
        SELECT * FROM file
        WHERE filename LIKE $1
      `;
      const result = await pool.query(query, [`%${searchQuery}%`]);
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('An error occurred while searching for files:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.post('/file', async (req, res) => {
    try {
      const { user } = req.body;
      console.log(user);
      const { rows } = await pool.query('SELECT * FROM file NATURAL JOIN users WHERE email = $1', [user]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  router.post("/read", async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (rows.length > 0) {
        console.log(rows);
        res.send({ rows });
      }  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  });
  router.post("/readF", async (req, res) => {
    try {
      const { file_id } = req.body;
      console.log(file_id);
      const { rows } = await pool.query("SELECT * FROM file WHERE file_id = $1", [file_id]);
      
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
    const { username, password, email } = req.body;
    try {
      await pool.query(
        "UPDATE users SET username = $1, password = $2 ,email = $3 WHERE email = $3",
        [username, password, email]
      );
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  
  router.put("/updateF", async (req, res) => {
    const { email, filename, content ,file_id } = req.body;
    try {
      await pool.query(
        "UPDATE file SET email = $1, filename = $2 ,content=$3 WHERE file_id = $4",
        [email, filename, content,file_id]
      );
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  
  
  
  

module.exports = router;
