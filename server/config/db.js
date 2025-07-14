// config/db.js
const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

const dbPath = process.env.DB_FILE ? path.resolve(__dirname, '../', process.env.DB_FILE) : path.resolve(__dirname, '../subtracker.db');
const db = new Database(dbPath);

module.exports = db;
