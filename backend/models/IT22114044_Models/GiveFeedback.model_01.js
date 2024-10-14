import mongoose from "mongoose";

const GiveFeedbackSchema = new mongoose.Schema({
    doctor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true, //logged-in user's email is stored
    },
    status: { // New status field
        type: String,
        enum: ['Pending', 'Thank You', 'Get Action Quickly'], // Define allowed statuses
        default: 'Pending'
    }
}, { timestamps: true }

);
const GiveFeedback = mongoose.model("Feedback",GiveFeedbackSchema)
export default GiveFeedback;