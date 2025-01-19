const PaymentMethod = require('../model/paymentMethod');

// Add Payment Method
exports.addPaymentMethod = async (req, res) => {
  const { methodType, details } = req.body;
  try {
    const newPaymentMethod = new PaymentMethod({
      userId: req.user.userId,
      methodType,
      details
    });
    await newPaymentMethod.save();
    res.status(201).json({ message: 'Payment method added successfully', paymentMethodId: newPaymentMethod._id });
  } catch (error) {
    res.status(500).json({ message: 'Adding payment method failed', error });
  }
};

// Get Payment Methods
exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ userId: req.user.userId });
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: 'Fetching payment methods failed', error });
  }
};

// Update Payment Method
exports.updatePaymentMethod = async (req, res) => {
  const { methodType, details } = req.body;
  try {
    await PaymentMethod.findByIdAndUpdate(req.params.paymentMethodId, {
      methodType,
      details
    });
    res.status(200).json({ message: 'Payment method updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Updating payment method failed', error });
  }
};

// Delete Payment Method
exports.deletePaymentMethod = async (req, res) => {
  try {
    await PaymentMethod.findByIdAndDelete(req.params.paymentMethodId);
    res.status(200).json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting payment method failed', error });
  }
};
