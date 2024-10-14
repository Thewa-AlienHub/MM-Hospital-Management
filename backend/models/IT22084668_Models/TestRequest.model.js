import mongoose from "mongoose";

const TestRequestSchema = new mongoose.Schema({
    ID: { type: String, required: true }, // Ensure unique ID if necessary
    Name: { type: String, required: true },
    isBlood: { type: Boolean, required: true },
    isCholesterol: { type: Boolean, required: true },
    isUrinals: { type: Boolean, required: true },
    isAngiography: { type: Boolean, required: true },
    isBloodPressure: { type: Boolean, required: true },
    isMri: { type: Boolean, required: true },
    isXray: { type: Boolean, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

const TestRequest = mongoose.model('TestRequest', TestRequestSchema);
export default TestRequest;
