import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import designerRouter from "./routes/designerRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

// Razorpay configuration
import razorpay from "./config/razorpay.js";  

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
app.use("/api/admin", adminRouter);
app.use("/api/designer", designerRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRoutes);

// -------- Serve React Frontend --------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// Test Route (API check)
app.get("/api/test", (req, res) => {
  res.send("API WORKING great 🚀");
});

// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

app.listen(port, () => console.log(`✅ Server started on port ${port}`));
