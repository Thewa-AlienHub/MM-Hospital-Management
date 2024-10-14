import mongoose from "mongoose";

const DoctorsSchema = new mongoose.Schema({
    doctorID: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    availableTimes: {
        type: [String],
        required: true
    },
    availableDays: {
        type: [String],
        required: true
    },
}, { timestamps: true }

);
const Doctors = mongoose.model("doctors",DoctorsSchema)
export default Doctors;