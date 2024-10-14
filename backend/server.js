import express from "express";
import dotenv from "dotenv";
import dbConnection from "./dbConfig/dbConnection.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import testRoutes from './routes/IT22084668_Routes/TestRequest.route.js';
import bloodReportRoutes from './routes/IT22084668_Routes/BloodReport.Route.js'
import bloodpressureReportRoutes from './routes/IT22084668_Routes/BloodPreessureReport.Route.js'
import cholesterolReportRoutes from './routes/IT22084668_Routes/CholesterolReport.Route.js'
import angiographyReportRoutes from './routes/IT22084668_Routes/AngiographyReport.route.js'
import urinalReportRoute from './routes/IT22084668_Routes/UrinalReport.Route.js'
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

dbConnection();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/bloodreport", bloodReportRoutes);
app.use("/api/bloodpressurereport", bloodpressureReportRoutes);
app.use("/api/cholesterolreport", cholesterolReportRoutes);
app.use("/api/angiographyreport", angiographyReportRoutes);
app.use("/api/urinalreport", urinalReportRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;