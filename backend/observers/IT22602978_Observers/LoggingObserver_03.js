import Observer from '../Observer_03.js';
import fs from 'fs';
import path from 'path';

class LoggingObserver extends Observer {
  constructor() {
    super();
    // Correctly specify the absolute path for the log file
    this.logFilePath = path.join('D:', 'testing', 'MM-Hospital-Management', 'backend', 'logs', 'logs.txt');
    // Ensure the directory exists, create if it doesn't
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFilePath);
    // Ensure the directory exists, create if it doesn't
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    console.log(logMessage.trim());
    // Append the log message to the file
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file', err);
      }
    });
  }

  update(eventData) {
    let logMessage = '';

    if (eventData.event === 'ProfileCreated') {
      logMessage = `Profile created successfully for owner: ${eventData.profile.OwnerId}`;
      
    } else if (eventData.event === 'ProfileRetrieved') {
      logMessage = `Profile retrieved for patient: ${eventData.profile.OwnerId}`;
    } else if (eventData.event === 'DoctorsFetched') {
      logMessage = `Doctors fetched successfully: ${eventData.doctors.length} doctors.`;
    } else if (eventData.event === 'AvailableDatesFetched') {
      logMessage = `Available dates fetched for doctor ${eventData.doctorId}: ${eventData.availableDays}.`;
    } else if (eventData.event === 'AvailableTimesFetched') {
      logMessage = `Available times fetched for doctor ${eventData.selectedDoctor} on ${eventData.date}: ${eventData.availableTimes}.`;
    } else if (eventData.event === 'BookingsFetched') {
      logMessage = `Bookings fetched for user ${eventData.userId}: ${eventData.bookings.length} bookings.`;
    } else if (eventData.event === 'PendingBookingsFetched') {
      logMessage = `Pending bookings fetched for user ${eventData.userId}: ${eventData.pendingBookings.length} bookings.`;
    } else if (eventData.event === 'AppointmentBooked') {
      logMessage = `Appointment booked: ${eventData.bookingId}`;
    } else {
      logMessage = `Unknown event: ${eventData.event}`;
    }

    // Log the message to the file
    this.logToFile(logMessage);
    
  }
}

export default LoggingObserver;
