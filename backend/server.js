import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';
import designerRouter from './routes/designerRoute.js';
import userRouter from './routes/userRoute.js';
import paymentRoutes from './routes/paymentRoute.js';

// Razorpay configuration (Import Razorpay setup)
import razorpay from './config/razorpay.js';  // If you need to use the Razorpay object anywhere directly

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/designer', designerRouter);
app.use('/api/user', userRouter);
// localhost:4000/api/admin/add-designer

// Payment routes (handling Razorpay payment requests)
app.use('/api/payment', paymentRoutes);  // Ensure your payment routes are handled here

// Test Route
app.get('/', (req, res) => {
  res.send('API WORKING great');
});

// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack to the console for debugging
  res.status(500).send({ message: 'Something went wrong!' });  // Respond with error message
});

app.listen(port, () => console.log(`Server started on port ${port}`));