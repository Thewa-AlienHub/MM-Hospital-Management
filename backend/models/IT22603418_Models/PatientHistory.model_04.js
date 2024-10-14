import mongoose from "mongoose";

// Define a schema for the medication details
const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
});

// Define the main patient history schema
const patientHistorySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientProfile", // Assuming your patient profile model is named this
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a user model for doctors
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  disease: {
    type: [String], // Array of strings for diseases
    required: true,
  },
  medications: {
    type: [medicationSchema], // Use the medication schema as an array
    required: true,
  },
  historyAddedDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const PatientHistory = mongoose.model("PatientHistory", patientHistorySchema);
export default PatientHistory;
