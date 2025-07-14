const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const userRoutes = require('./routes/userRoutes');
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
