import Database from "better-sqlite3";

const db = new Database("db.sqlite");

export type AssetInfo = {
  id: string;
  filename: string;
  mime: string;
  key: string;
  is_public: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

// Initialize database tables on startup
const initDatabase = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS files (
      id TEXT PRIMARY KEY,
      filename TEXT,
      mime TEXT,
      key TEXT,
      is_public INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    db.exec(createTableSQL);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};

// Initialize database when this module is imported
initDatabase();

export default db;
