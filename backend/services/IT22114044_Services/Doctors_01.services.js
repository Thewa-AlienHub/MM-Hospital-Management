import * as doctorRepository from '../../repositories/IT22114044_Repositories/DoctorsRepo_01.repo.js'

export const createDoctorService = async (doctorData) => {
    return await doctorRepository.createDoctor(doctorData);
};

export const getAllDoctorsService = async () => {
    return await doctorRepository.getAllDoctors();
};

export const updateDoctorService = async (id, doctorData) => {
    return await doctorRepository.updateDoctorById(id, doctorData);
};

export const deleteDoctorService = async (id) => {
    return await doctorRepository.deleteDoctorById(id);
};