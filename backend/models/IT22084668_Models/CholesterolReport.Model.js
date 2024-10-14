import mongoose from "mongoose";

const CholesterolReportSchema=new mongoose.Schema({
    ID:{type:String,required:true},
    Name:{type:String,required:true},
    totalCholesterol:{type:Number,required:true},
    hdl:{type:Number,required:true},
    ldl:{type:Number,required:true},
    triglycerides:{type:Number,required:true},
    vldl:{type:Number,required:true},
}, { timestamps: true });
const CholesterolReport = mongoose.model('CholesteroleReport',CholesterolReportSchema)
export default CholesterolReport;