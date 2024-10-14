import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { getAllDoctors ,getAvailableDates,getAvailableTimes ,bookAppointment,getAllBookingsByUserId,getPendingBookingsByUserId } from './../../controllers/IT22602978_Controllers/PatientsBookingHandling.controller_03.js';





const router = express.Router();

router.post('/CreateBooking',verifyToken,getAllDoctors);
router.get('/Doctors',verifyToken,getAllDoctors);
router.get('/availableDates/:doctorId',verifyToken,getAvailableDates);
router.get('/availableTimes/:selectedDoctor/:date', getAvailableTimes);
router.post('/bookAppointment', bookAppointment);
router.get('/Appointments/:userId',verifyToken,getAllBookingsByUserId);
router.get('/PendingAppointments/:userId',verifyToken,getPendingBookingsByUserId);







export default router;