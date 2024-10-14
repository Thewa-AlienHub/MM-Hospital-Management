import express from "express";
import dotenv from "dotenv";
import dbConnection from "./dbConfig/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import appointmentTimes from "./routes/IT22114044_Routes/AppointmentTime.route_01.js"
import feedbacks from "./routes/IT22114044_Routes/GiveFeedback.route_01.js"
import doctors from "./routes/IT22114044_Routes/Doctors.route_01.js"

import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// Use the cors middleware
app.use(cors());

dbConnection();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/AppointmentTimes",appointmentTimes);
app.use("/api/Feedbacks",feedbacks);
app.use("/api/Doctors",doctors);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
