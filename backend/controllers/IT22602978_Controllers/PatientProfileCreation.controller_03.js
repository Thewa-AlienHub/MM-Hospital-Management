// controllers/PatientProfileCreation.controller.js
import { createProfileService, getProfileService } from '../../services/IT22602978_Services/PatientProfile.service.js';

export const CreatePatientProfile = async (req, res, next) => {
    try {
        const newProfile = await createProfileService(req.body);
        return res.status(201).json({ success: true, newProfile });
    } catch (error) {
        if (error.message === 'all fields are required') {
            res.status(404).json({ message: 'all fields are required' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const getPatientProfile = async (req, res, next) => {
    try {
        const profile = await getProfileService(req.params.patientId);
        return res.status(200).json(profile);
    } catch (error) {
        if (error.message === 'Profile not found') {
            res.status(404).json({ message: 'Profile not found' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
