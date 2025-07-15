const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'subtracker_secret_key';

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const user = userModel.getUserByUsername(username);
  if (user) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password.' });
    try {
      const userId = userModel.createUser(username, hash);
      res.status(201).json({ message: 'User registered successfully.', userId });
    } catch (e) {
      console.error('Registration error:', e);
      res.status(500).json({ message: 'Error creating user.', error: e.message });
    }
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const user = userModel.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Generate JWT token
    const token = jwt.sign({ username: user.username, userId: user.id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ message: 'Login successful.', token, userId: user.id, username: user.username });
  });
};

module.exports = {
  register,
  login
};
