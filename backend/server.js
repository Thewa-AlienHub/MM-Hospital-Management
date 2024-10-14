import express from "express";
import dotenv from "dotenv";
import dbConnection from "./dbConfig/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import patientProfileRoutes from "./routes/IT22602978_Routes/PatientsProfileCreation.route_03.js";
import patientBookingRoutes from "./routes/IT22602978_Routes/PatientsBookingHandling.route_03.js";

import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Establish database connection
const startApp = async () => {
  try {
    await dbConnection.connect(); // Connect to the database
    console.log("DB Connected Successfully");

    // Setup routes
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/PatientProfile", patientProfileRoutes);
    app.use("/api/PatientBooking", patientBookingRoutes);

    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the application
startApp();
