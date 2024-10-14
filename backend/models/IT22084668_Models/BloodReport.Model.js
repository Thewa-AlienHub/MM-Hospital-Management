import mongoose from "mongoose";

const BloodReportSchema = new mongoose.Schema({
    ID:{type:String,required:true},
    Name:{type:String,required:true},
    hemoglobin: { type: Number, required: true },  // Use Number instead of Double
    rbcCount: { type: Number, required: true },    // Assuming it's numeric
    pcv: { type: Number, required: true },         // Assuming Packed Cell Volume is a number
    mcv: { type: Number, required: true },         // Mean Corpuscular Volume as a number
    mch: { type: Number, required: false },        // If this field is optional
    mchc: { type: Number, required: false },       // If this field is optional
    rdw: { type: Number, required: false },
    wbcCount: { type: Number, required: false },
    neutrophils: { type: Number, required: false },
    lymphocytes: { type: Number, required: false },
    eosinophils: { type: Number, required: false },
    monocytes: { type: Number, required: false },
    basophils: { type: Number, required: false },
    absNeutrophils: { type: Number, required: false },
    absLymphocytes: { type: Number, required: false },
    absEosinophils: { type: Number, required: false },
    absMonocytes: { type: Number, required: false },
    absBasophils: { type: Number, required: false },
    platelets: { type: Number, required: false },
}, { timestamps: true });

const BloodReport = mongoose.model('BloodReport', BloodReportSchema);
export default BloodReport;
