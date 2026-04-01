const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Initialize database table
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_data (
      access_code TEXT PRIMARY KEY,
      flagged_ids JSONB DEFAULT '[]',
      wrong_ids JSONB DEFAULT '[]',
      sessions JSONB DEFAULT '[]',
      practice_progress JSONB DEFAULT 'null',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("Database initialized");
}

app.use(express.json({ limit: "5mb" }));

// Serve static React build
app.use(express.static(path.join(__dirname, "build")));

// GET user data
app.get("/api/sync/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const result = await pool.query("SELECT * FROM user_data WHERE access_code = $1", [code]);
    if (result.rows.length === 0) {
      return res.json({ flaggedIds: [], wrongIds: [], sessions: [], practiceProgress: null });
    }
    const row = result.rows[0];
    res.json({
      flaggedIds: row.flagged_ids,
      wrongIds: row.wrong_ids,
      sessions: row.sessions,
      practiceProgress: row.practice_progress,
    });
  } catch (err) {
    console.error("GET /api/sync error:", err);
    res.status(500).json({ error: "Failed to load data" });
  }
});

// POST user data
app.post("/api/sync/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const { flaggedIds, wrongIds, sessions, practiceProgress } = req.body;
    await pool.query(
      `INSERT INTO user_data (access_code, flagged_ids, wrong_ids, sessions, practice_progress, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (access_code) DO UPDATE SET
         flagged_ids = $2, wrong_ids = $3, sessions = $4, practice_progress = $5, updated_at = NOW()`,
      [code, JSON.stringify(flaggedIds), JSON.stringify(wrongIds), JSON.stringify(sessions), JSON.stringify(practiceProgress)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("POST /api/sync error:", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// All other routes serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error("DB init failed:", err);
  // Start server anyway for static serving
  app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
});
