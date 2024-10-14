import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  PatientProfileId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookingNumber: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  bookingId:{
    type: String,
    required: true,
    Unique: true
  }
 
}, {timestamps:true});

// Export the model
const Appointment = mongoose.model('Appointments', AppointmentSchema);
export default Appointment;
