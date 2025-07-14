// Controller for subscription CRUD operations
const db = require('../models/subscriptionModel');

exports.getAllSubscriptions = (req, res) => {
  try {
    const subs = db.prepare('SELECT * FROM subscriptions').all();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions', details: err.message });
  }
};

exports.addSubscription = (req, res) => {
  try {
    const { name, category, cost, billingCycle, firstBillDate, notes } = req.body;
    if (!name || !category || !cost || !billingCycle || !firstBillDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const stmt = db.prepare('INSERT INTO subscriptions (name, category, cost, billingCycle, firstBillDate, notes) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, category, cost, billingCycle, firstBillDate, notes);
    const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(info.lastInsertRowid);
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add subscription', details: err.message });
  }
};

exports.updateSubscription = (req, res) => {
  try {
    const { name, category, cost, billingCycle, firstBillDate, notes } = req.body;
    if (!name || !category || !cost || !billingCycle || !firstBillDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    db.prepare('UPDATE subscriptions SET name = ?, category = ?, cost = ?, billingCycle = ?, firstBillDate = ?, notes = ? WHERE id = ?')
      .run(name, category, cost, billingCycle, firstBillDate, notes, req.params.id);
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
