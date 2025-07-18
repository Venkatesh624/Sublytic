// Controller for subscription CRUD operations
const db = require('../models/subscriptionModel');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'subtracker_secret_key';

exports.getAllSubscriptions = (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
    let username;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      username = decoded.username;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const subs = db.prepare('SELECT * FROM subscriptions WHERE username = ?').all(username);
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions', details: err.message });
  }
};

exports.addSubscription = (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
    let username;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      username = decoded.username;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const { name, category, cost, billingCycle, firstBillDate, notes } = req.body;
    if (!name || !category || !cost || !billingCycle || !firstBillDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const stmt = db.prepare('INSERT INTO subscriptions (name, category, cost, billingCycle, firstBillDate, notes, username) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, category, cost, billingCycle, firstBillDate, notes, username);
    const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(info.lastInsertRowid);
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add subscription', details: err.message });
  }
};

exports.updateSubscription = (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });
    let username;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      username = decoded.username;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const { name, category, cost, billingCycle, firstBillDate, notes } = req.body;
    if (!name || !category || !cost || !billingCycle || !firstBillDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    db.prepare('UPDATE subscriptions SET name = ?, category = ?, cost = ?, billingCycle = ?, firstBillDate = ?, notes = ? WHERE id = ? AND username = ?')
      .run(name, category, cost, billingCycle, firstBillDate, notes, req.params.id, username);
    const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(req.params.id);
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update subscription', details: err.message });
  }
};

exports.deleteSubscription = (req, res) => {
  try {
    db.prepare('DELETE FROM subscriptions WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subscription', details: err.message });
  }
};
