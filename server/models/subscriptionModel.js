// Subscription model for SQLite using better-sqlite3
const db = require('../config/db');

db.prepare(`CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  cost REAL,
  billingCycle TEXT,
  firstBillDate TEXT,
  notes TEXT
)`).run();

module.exports = db;
