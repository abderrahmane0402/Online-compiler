const express = require("express");
const { Pool } = require("pg");
const router = express.Router();



const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "IDE",
    password: " ",
    port: 5432,
  });
  router.use(express.json());
 
  

  router.post('/' , async (req , res) => {
    try {
      const {user} = req.body
      console.log(user);
      const { rows } = await pool.query("select * from file natural join users where email=$1;",[user]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  router.delete("/:fileId", async (req, res) => {
    const fileId = req.params.fileId;
    try {
      await pool.query("DELETE FROM file WHERE file_id = $1", [fileId]);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  router.put("/:fileId", async (req, res) => {
    const fileId = req.params.fileId;
    const { filename } = req.body;
    try {
      await pool.query("UPDATE file SET filename = $1 WHERE file_id = $2", [filename, fileId]);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  router.post("/create", async (req, res) => {
    const { filename ,user } = req.body;
    try {
      await pool.query("INSERT INTO file (filename , email) VALUES ($1 , $2)", [filename , user]);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  router.get("/search", async (req, res) => {
    const searchTerm = req.query.search;
  
    try {
      const { rows } = await pool.query(
        "SELECT * FROM file WHERE filename ILIKE $1",
        [`%${searchTerm}%`]
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
 
  
  
  module.exports = router;

