import express from "express";
import { getAppointments } from "../../controllers/IT22114044_Controllers/AppointmentTime.controller_01.js";
import { verifyToken } from "../../utils/verifyUser.js";
import { getAppointmentsByHour } from "../../controllers/IT22114044_Controllers/AppointmentTime.controller_01.js";

const router = express.Router();

router.get('/AppointmentTimes',verifyToken,getAppointments);
router.get('/hourly', verifyToken, getAppointmentsByHour);

export default router;
