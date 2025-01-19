const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payments');
const authMiddleware = require('../middleware/auth');

router.post('/create-order', authMiddleware, paymentController.initiatePayment);
router.post('/verify-payment', authMiddleware, paymentController.verifyPayment);

module.exports = router;
