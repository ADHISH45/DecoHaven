// backend/routes/paymentRoutes.js

import { Router } from 'express';
const router = Router();
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import authUser from '../middlewares/authUser.js';

// Route to create a Razorpay order
router.post('/create-order',authUser, createOrder);

// Route to verify payment signature after payment completion
router.post('/verify-payment',authUser, verifyPayment);

export default router;
