import { Database } from 'bun:sqlite';

const DB_PATH = `${process.cwd()}/data/jobbo.db`;

const db = new Database(DB_PATH, { create: true });

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    url TEXT NOT NULL,
    source TEXT NOT NULL,
    posted_at TEXT,
    scraped_at TEXT NOT NULL DEFAULT (datetime('now')),
    processed INTEGER NOT NULL DEFAULT 0,
    UNIQUE(url)
  );
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_jobs_source ON jobs(source);
  CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at);
  CREATE INDEX IF NOT EXISTS idx_jobs_processed ON jobs(processed);
`);

export { db };
