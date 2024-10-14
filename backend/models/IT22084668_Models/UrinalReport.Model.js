import mongoose from "mongoose";

const UrinalReportSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    Name: { type: String, required: true },
    color: { type: String, required: true }, // Added color field
    PH: { type: String, required: true }, // Added PH field
    SpecificGravity: { type: String, required: true }, // Added SpecificGravity field
    protein: { type: String, required: true }, // Added protein field (fixed spelling from "protien" to "protein")
    Glucose: { type: String, required: true }, // Added Glucose field
    Ketones: { type: String, required: true }, // Added Ketones field
    LE: { type: String, required: true }, // Added LE field
    Nitrites: { type: String, required: true }, // Added Nitrites field
    Bilirubin: { type: String, required: true }, // Added Bilirubin field
    Urobilinogen: { type: String, required: true }, // Added Urobilinogen field
    RBC: { type: String, required: true }, // Added RBC field
    WBC: { type: String, required: true }, // Added WBC field
    Casts: { type: String, required: true }, // Added Casts field
    Crystals: { type: String, required: true }, // Added Crystals field
    Bacteria: { type: String, required: true }, // Added Bacteria field
    EC: { type: String, required: true }, // Added EC field
}, { timestamps: true });

const UrinalReport = mongoose.model('UrinalReport', UrinalReportSchema);

export default UrinalReport;
