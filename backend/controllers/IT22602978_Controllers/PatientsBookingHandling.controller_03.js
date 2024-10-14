// controllers/PatientsBookingHandling.controller_03.js
import {
  getAllDoctorsService,
  getAvailableDatesService,
  getAvailableTimesService,
  bookAppointmentService,
  getAllBookingsByUserIdService,
  getPendingBookingsByUserIdService
} from '../../services/IT22602978_Services/Appointment_03.service.js';

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await getAllDoctorsService();
    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvailableDates = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const availableDays = await getAvailableDatesService(doctorId);
    return res.status(200).json({
      success: true,
      data: availableDays,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvailableTimes = async (req, res, next) => {
  const { selectedDoctor, date } = req.params;
  try {
    const availableTimes = await getAvailableTimesService(selectedDoctor, date);
    return res.status(200).json({
      success: true,
      availableTimes,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookAppointment = async (req, res, next) => {
  try {
    const newAppointment = await bookAppointmentService(req.body);
    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      data: newAppointment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookingsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const allBookings = await getAllBookingsByUserIdService(userId);
    

    const formattedBookings = allBookings.map(booking => ({
      _id: booking._id,
      patientName: booking.patientName,
      PatientProfileId: booking.PatientProfileId,
      doctorId: booking.doctorId ? booking.doctorId._id : null,
      doctorName: booking.doctorId ? booking.doctorId.doctorName : 'Unknown',
      date: booking.date,
      time: booking.time,
      userId: booking.userId,
      bookingNumber: booking.bookingNumber,
      status: booking.Status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      bookingId: booking.bookingId,
    }));
    
   
    return res.status(200).json({
      success: true,
      count: formattedBookings.length,
      data: formattedBookings,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingBookingsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const pendingBookings = await getPendingBookingsByUserIdService(userId);
    const formattedPendingBookings = pendingBookings.map(booking => ({
      _id: booking._id,
      patientName: booking.patientName,
      PatientProfileId: booking.PatientProfileId,
      doctorId: booking.doctorId ? booking.doctorId._id : null,
      doctorName: booking.doctorId ? booking.doctorId.doctorName : 'Unknown',
      date: booking.date,
      time: booking.time,
      userId: booking.userId,
      bookingNumber: booking.bookingNumber,
      status: booking.Status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      bookingId: booking.bookingId,
    }));
    return res.status(200).json({
      success: true,
      count: formattedPendingBookings.length,
      data: formattedPendingBookings,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
