import mongoose from "mongoose";

const PatientProfileCreationSchema = new mongoose.Schema({
  
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    emergencyContactNumber: {
        type: String,
        required: true,
    },
    emergencyContactName: {
        type: String,
        required: true,
    },
    medications: {
        type: String,
        required: true,
    },
    preConditions: {
        type: String,
        required: true,
    },
    allergies: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    OwnerId: {
        type: String,
        required: true,
    },




}, {timestamps:true});

const PatientProfileCreation = mongoose.model('PatientProfile', PatientProfileCreationSchema);
export default PatientProfileCreation;