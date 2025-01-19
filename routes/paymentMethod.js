const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controller/paymentsMethod');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, paymentMethodController.addPaymentMethod);
router.get('/', authMiddleware, paymentMethodController.getPaymentMethods);
router.put('/:paymentMethodId', authMiddleware, paymentMethodController.updatePaymentMethod);
router.delete('/:paymentMethodId', authMiddleware, paymentMethodController.deletePaymentMethod);

module.exports = router;
