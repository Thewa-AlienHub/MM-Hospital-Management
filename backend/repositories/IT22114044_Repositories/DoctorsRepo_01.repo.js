import Doctors from "../../models/IT22114044_Models/Doctors.model_01.js";

export const createDoctor = async (doctorData) => {
    const newDoctor = new Doctors(doctorData);
    return await newDoctor.save();
};

export const getAllDoctors = async () => {
    return await Doctors.find();
};

export const updateDoctorById = async (id, doctorData) => {
    return await Doctors.findByIdAndUpdate(id, doctorData, { new: true });
};

export const deleteDoctorById = async (id) => {
    return await Doctors.findByIdAndDelete(id);
};