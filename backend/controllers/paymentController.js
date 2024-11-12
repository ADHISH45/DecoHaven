import razorpay from '../config/razorpay.js';
import Appointment from '../models/appointmentModel.js';
import crypto from 'crypto';
import { createHmac } from 'crypto';

const createOrder = async (req, res) => {
  const fixedAmount = 5000; // Fixed amount in paise (₹50)
  const options = {
    amount: fixedAmount,
    currency: 'INR',
    receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Error creating payment order', error: error.message });
  }
};


const verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;

        // Ensure all required fields are present
        if (!paymentId || !orderId || !signature) {
            return res.status(400).json({ success: false, message: 'Missing required payment details' });
        }

        // Ensure the Razorpay secret key is available
        const secret = process.env.VITE_RAZORPAY_KEY_SECRET;
        if (!secret) {
            console.error('Razorpay secret key is missing in environment variables.');
            return res.status(500).json({ success: false, message: 'Payment verification configuration error' });
        }

        // Generate the expected signature and compare
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature === signature) {
            // Perform further actions such as updating appointment status in the database
            // e.g., update database with payment successful status

            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            console.error('Payment verification failed: Invalid signature');
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error in payment verification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




export { createOrder, verifyPayment };
