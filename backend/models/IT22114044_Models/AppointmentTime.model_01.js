import mongoose from "mongoose";

const AppointmentTimeSchema = new mongoose.Schema({
    AppointmentID: {
        type: String,
        required: true
        
    },
    UserID: {
        type: String,
        required: true
        
    },
    AppointmentDate: {
        type: Date,
        required: true
        
    },
    AppointmentTime: {
        type: String,
        required: true
        
    },
}, { timestamps: true }
);

const AppointmentTime = mongoose.model("AppointmentTime",AppointmentTimeSchema);
export default AppointmentTime;