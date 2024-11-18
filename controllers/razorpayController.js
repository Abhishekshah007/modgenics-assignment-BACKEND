// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order
// router.post('/createOrder', async (req, res) => {
//   const { amount, currency, receipt } = req.body;

//   try {
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt,
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Order creation failed', error });
//   }
// });

// // Verify Payment
// router.post('/verifyPayment', (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const generatedSignature = crypto
//     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest('hex');

//   if (generatedSignature === razorpay_signature) {
//     res.json({ success: true, message: 'Payment verified successfully' });
//   } else {
//     res.status(400).json({ success: false, message: 'Payment verification failed' });
//   }
// });

// module.exports = router;
