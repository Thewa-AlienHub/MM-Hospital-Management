import * as doctorService from '../../services/IT22114044_Services/Doctors_01.services.js'

export const createDoctor = async (req, res, next) => {
    try {
        const newDoctor = await doctorService.createDoctorService(req.body);
        return res.status(201).json(newDoctor);
    } catch (error) {
        console.error("Error saving doctor:", error);
        next(error);
    }
};

export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await doctorService.getAllDoctorsService();
        res.status(200).send(doctors);
    } catch (error) {
        next(error);
    }
};

export const updateDoctor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedDoctor = await doctorService.updateDoctorService(id, req.body);
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
    } catch (err) {
        next(err);
    }
};

export const deleteDoctor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedDoctor = await doctorService.deleteDoctorService(id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        next(err);
    }
};