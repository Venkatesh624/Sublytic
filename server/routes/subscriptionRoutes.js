const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// GET all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// POST add subscription
router.post('/', subscriptionController.addSubscription);

// PUT update subscription
router.put('/:id', subscriptionController.updateSubscription);

// DELETE subscription
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
