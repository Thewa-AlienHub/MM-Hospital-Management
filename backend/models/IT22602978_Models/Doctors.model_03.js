import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorID: {
    type: String,
    required: true,
    unique: true
  },
  doctorName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  availableTimes: {
    type: [String], // Array of strings for time ranges
    required: true
  },
  availableDays: {
    type: [String], // Array of days (e.g., "Monday", "Thursday")
    required: true
  },
 
}, {timestamps:true});

// Create the model based on the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
