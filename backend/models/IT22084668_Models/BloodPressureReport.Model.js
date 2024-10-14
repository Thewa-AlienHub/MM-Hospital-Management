import mongoose from "mongoose";

const BloodPressureReportSchema=new mongoose.Schema({
    ID:{type:String,required:true},
    Name:{type:String,required:true},
    Systolic:{type:String,required:true},
    Diastolic:{type:String,required:true},
}, { timestamps: true });
const BloodPressureReport = mongoose.model('BloodPressureReport',BloodPressureReportSchema)
export default BloodPressureReport;