// factories/AppointmentFactory.js

import AppointmentRepository from '../../repositories/IT22602978_Repositories/AppointmentRepo_03.repo.js';

class AppointmentFactory {
  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  // Factory method for creating an appointment
  async createAppointment({ patientName, doctorId, date, time, userId, PatientProfileId }) {
    // Ensure all required fields are provided
    if (!patientName || !doctorId || !date || !time || !userId || !PatientProfileId) {
      throw new Error('All fields are required to create an appointment.');
    }

    // Get count of existing appointments for this doctor, date, and time
    const appointmentCount = await this.appointmentRepository.getCount(doctorId, date, time);
    
    // Generate unique booking number and booking ID
    const bookingNumber = appointmentCount + 1;
    const bookingId = this.generateBookingId();

    // Create and return the new appointment object
    return {
      patientName,
      doctorId,
      date,
      time,
      userId,
      bookingNumber,
      bookingId,
      Status: 'Pending',
      PatientProfileId
    };
  }

  // Private method to generate a unique booking ID
  generateBookingId() {
    const date = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 14); // "YYYYMMDDHHMMSS"
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `AP-${date}-${randomNum}`; // e.g., "AP-202310131234-5678"
  }
}

export default AppointmentFactory;
