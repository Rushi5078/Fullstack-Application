const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'appdb',
  max: 5,
  idleTimeoutMillis: 30000,
});

app.get("/api/hello", async (req, res) => {
  try {
    const result = await pool.query("SELECT 'Hello from Postgres!' as message");
    res.json({ message: result.rows[0].message });
  } catch (err) {
    console.error("DB error:", err.message || err);
    res.json({ message: "Hello — DB not available" });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const r = await pool.query("SELECT id, name, created_at FROM items ORDER BY id DESC");
    res.json(r.rows);
  } catch (err) {
    console.error("DB error:", err.message || err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/items", express.json(), async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  try {
    const r = await pool.query("INSERT INTO items(name) VALUES($1) RETURNING id, name, created_at", [name]);
    res.json(r.rows[0]);
  } catch (err) {
    console.error("DB error:", err.message || err);
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));
