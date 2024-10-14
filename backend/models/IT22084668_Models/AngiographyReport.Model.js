import mongoose from "mongoose";

const AngiographyReportSchema=new mongoose.Schema({
    ID:{type:String,required:true},
    Name:{type:String,required:true},
    PAB:{type:Number,required:true},
    BVD:{type:Number,required:true},
    BFV:{type:Number,required:true},
    FFR:{type:Number,required:true},
    BPA:{type:Number,required:true},
    EF:{type:Number,required:true},
    Aneurysm:{type:Number,required:true},
}, { timestamps: true });
const AngiographyReport = mongoose.model('AngiographyReport',AngiographyReportSchema)
export default AngiographyReport;