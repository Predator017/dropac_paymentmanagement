

const Razorpay = require('razorpay');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const Payment = require('../model/payments'); // Import the Payment model
const Driver = require('../model/driver');

require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.initiatePayment = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const newPayment = new Payment({
      userId: req.user.userId,
      amount,
      currency,
    });
    await newPayment.save();

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    newPayment.razorpayOrderId = order.id;
    await newPayment.save();

    res.json(order); // Send order details to frontend, including order ID
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
};

exports.verifyPayment = async (req, res) => {
  const { driverId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = razorpay.key_secret;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
      // Update the order with payment details
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (payment) {
        payment.status = 'Completed';
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();
        
        const driver = await Driver.findById(driverId);

        if (paymentdone !== undefined) driver.paymentdone = paymentdone;
    
        await driver.save();



      }
      res.status(200).json({ status: 'ok', paymentId: payment._id, amount: payment.amount, createdAr: payment.created_at });
    } else {
      res.status(400).json({ status: 'verification_failed' });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
};