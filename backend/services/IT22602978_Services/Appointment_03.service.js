// services/Appointment.service.js
import AppointmentRepository from '../../repositories/IT22602978_Repositories/AppointmentRepo_03.repo.js';
import Doctor from '../../models/IT22602978_Models/Doctors.model_03.js';
import AppointmentFactory from '../../factories/IT22602978_factories/AppointmentFactory_03.js';
import AppointmentSubject from '../../observers/IT22602978_Observers/Subjects_03/AppointmentSubject_03.js';
import LoggingObserver from '../../observers/IT22602978_Observers/LoggingObserver_03.js';

const appointmentRepository = new AppointmentRepository();
const appointmentFactory = new AppointmentFactory();
const appointmentSubject = new AppointmentSubject();


appointmentSubject.attach(new LoggingObserver());


export const getAllDoctorsService = async () => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      throw new Error('No doctors found');
    }

    // Notify observers about the event
    appointmentSubject.notify({ event: 'DoctorsFetched', doctors });

    return doctors;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAvailableDatesService = async (doctorId) => {
  try {
    const doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Notify observers about the event
    appointmentSubject.notify({ event: 'AvailableDatesFetched', doctorId, availableDays: doctor.availableDays });

    return doctor.availableDays;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAvailableTimesService = async (selectedDoctor, date) => {
  try {
    const doctor = await Doctor.findOne({ _id: selectedDoctor });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    if (!doctor.availableTimes) {
      throw new Error('No available times for this date');
    }

    // Notify observers about the event
    appointmentSubject.notify({ event: 'AvailableTimesFetched', selectedDoctor, date, availableTimes: doctor.availableTimes });

    return doctor.availableTimes;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const bookAppointmentService = async (appointmentData) => {
  try {
    // Use the factory to create the appointment object
    const newAppointmentData = await appointmentFactory.createAppointment(appointmentData);

    // Pass the appointment object to the repository for persistence
    const newAppointment = await appointmentRepository.createAppointment(newAppointmentData);

    // Notify observers of the new appointment
    appointmentSubject.notify(newAppointment);

    return newAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllBookingsByUserIdService = async (userId) => {
  try {
    const allBookings = await appointmentRepository.getAllBookingsByUserId(userId);
    if (allBookings.length === 0) {
      throw new Error('No bookings found');
    }

    // Notify observers about the event
    appointmentSubject.notify({ event: 'BookingsFetched', userId, bookings: allBookings });

    return allBookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPendingBookingsByUserIdService = async (userId) => {
  try {
    const pendingBookings = await appointmentRepository.getPendingBookingsByUserId(userId);
    if (pendingBookings.length === 0) {
      throw new Error('No pending bookings found');
    }

    // Notify observers about the event
    appointmentSubject.notify({ event: 'PendingBookingsFetched', userId, pendingBookings });

    return pendingBookings;
  } catch (error) {
    throw new Error(error.message);
  }
};


