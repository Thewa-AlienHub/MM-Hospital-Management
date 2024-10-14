// repositories/AppointmentRepo_03.repo.js
import Appointment from '../../models/IT22602978_Models/Appointment.model_03.js';

class AppointmentRepository {
    // Method to get appointment count for a specific doctor, date, and time
    async getCount(doctorId, date, time) {
        return await Appointment.countDocuments({ doctorId, date, time });
    }

    // Method to create a new appointment
    async createAppointment(appointmentData) {
        const newAppointment = new Appointment(appointmentData);
        return await newAppointment.save();
    }

    // Method to get all bookings for a specific userId
    async getAllBookingsByUserId(userId) {
        return await Appointment.find({ userId : userId })
            .populate('doctorId', 'doctorName')
            .exec();
    }

    // Method to get only pending bookings for a specific userId
    async getPendingBookingsByUserId(userId) {
        return await Appointment.find({ userId :userId, Status: "Pending" })
            .populate('doctorId', 'doctorName')
            .exec();
    }
}

export default AppointmentRepository;
