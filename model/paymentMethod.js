const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  methodType: { type: String, required: true },
  details: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true }
  }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
