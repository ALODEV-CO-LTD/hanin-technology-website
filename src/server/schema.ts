/**
 * Lược đồ SQLite của CMS HANIN.
 * Trường đa ngôn ngữ (vi/zh/ko) và danh sách lưu dạng JSON trong cột TEXT.
 * Chạy idempotent (IF NOT EXISTS) nên có thể gọi mỗi lần mở DB.
 */
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name          TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS banners (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  placement  TEXT NOT NULL,
  image      TEXT NOT NULL DEFAULT '',
  image_alt  TEXT NOT NULL DEFAULT '{}',
  link       TEXT NOT NULL DEFAULT '',
  sort       INTEGER NOT NULL DEFAULT 0,
  active     INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  slug              TEXT NOT NULL UNIQUE,
  code              TEXT NOT NULL DEFAULT '',
  title_en          TEXT NOT NULL DEFAULT '',
  image             TEXT NOT NULL DEFAULT '',
  image_alt         TEXT NOT NULL DEFAULT '{}',
  badge             TEXT NOT NULL DEFAULT '{}',
  title             TEXT NOT NULL DEFAULT '{}',
  description       TEXT NOT NULL DEFAULT '{}',
  application_label TEXT NOT NULL DEFAULT '{}',
  application_text  TEXT NOT NULL DEFAULT '{}',
  stat_label        TEXT NOT NULL DEFAULT '{}',
  sort              INTEGER NOT NULL DEFAULT 0,
  active            INTEGER NOT NULL DEFAULT 1,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,
  category_slug TEXT NOT NULL DEFAULT 'co-khi-chinh-xac',
  lot           TEXT NOT NULL DEFAULT '',
  image         TEXT NOT NULL DEFAULT '',
  image_alt     TEXT NOT NULL DEFAULT '{}',
  image_badge   TEXT NOT NULL DEFAULT '{}',
  title         TEXT NOT NULL DEFAULT '{}',
  description   TEXT NOT NULL DEFAULT '{}',
  spec_chips    TEXT NOT NULL DEFAULT '[]',
  show_in_grid  INTEGER NOT NULL DEFAULT 1,
  featured      INTEGER NOT NULL DEFAULT 0,
  spotlight     INTEGER NOT NULL DEFAULT 0,
  sort          INTEGER NOT NULL DEFAULT 0,
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT NOT NULL UNIQUE,
  category_key TEXT NOT NULL DEFAULT 'cong-ty',
  tech_badge   TEXT NOT NULL DEFAULT '',
  image        TEXT NOT NULL DEFAULT '',
  image_alt    TEXT NOT NULL DEFAULT '{}',
  title        TEXT NOT NULL DEFAULT '{}',
  excerpt      TEXT NOT NULL DEFAULT '{}',
  body         TEXT NOT NULL DEFAULT '{}',
  author       TEXT NOT NULL DEFAULT '{}',
  author_role  TEXT NOT NULL DEFAULT '{}',
  metrics      TEXT NOT NULL DEFAULT '[]',
  read_time    TEXT NOT NULL DEFAULT '{}',
  published_at TEXT NOT NULL DEFAULT (date('now')),
  featured     INTEGER NOT NULL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published')),
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jobs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,
  department    TEXT NOT NULL DEFAULT 'engineering',
  job_type      TEXT NOT NULL DEFAULT 'fulltime',
  location      TEXT NOT NULL DEFAULT 'factory',
  title         TEXT NOT NULL DEFAULT '{}',
  salary        TEXT NOT NULL DEFAULT '{}',
  tags          TEXT NOT NULL DEFAULT '[]',
  deadline      TEXT NOT NULL DEFAULT '{}',
  description   TEXT NOT NULL DEFAULT '{}',
  requirements  TEXT NOT NULL DEFAULT '{}',
  benefits      TEXT NOT NULL DEFAULT '{}',
  sort          INTEGER NOT NULL DEFAULT 0,
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inquiries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  kind            TEXT NOT NULL DEFAULT 'rfq' CHECK (kind IN ('rfq','contact','application')),
  full_name       TEXT NOT NULL,
  company         TEXT NOT NULL DEFAULT '',
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL DEFAULT '',
  project_name    TEXT NOT NULL DEFAULT '',
  plating_service TEXT NOT NULL DEFAULT '',
  volume          TEXT NOT NULL DEFAULT '',
  message         TEXT NOT NULL DEFAULT '',
  files           TEXT NOT NULL DEFAULT '[]',
  source          TEXT NOT NULL DEFAULT '',
  locale          TEXT NOT NULL DEFAULT 'vi',
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','processing','done','spam')),
  note            TEXT NOT NULL DEFAULT '',
  ip_hash         TEXT NOT NULL DEFAULT '',
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at);

CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS content_overrides (
  locale     TEXT NOT NULL,
  key        TEXT NOT NULL,
  value      TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (locale, key)
);

CREATE TABLE IF NOT EXISTS media (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  path        TEXT NOT NULL UNIQUE,
  original    TEXT NOT NULL DEFAULT '',
  mime        TEXT NOT NULL DEFAULT '',
  size        INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket     TEXT NOT NULL,
  window     INTEGER NOT NULL,
  hits       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, window)
);
`;
