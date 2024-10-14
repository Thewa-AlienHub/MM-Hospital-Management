// repositories/PatientProfile.repository.js
import PatientProfileCreation from '../../models/IT22602978_Models/PatientProfileCreation.model_03.js';

export const findProfileByOwnerId = (ownerId) => {
    return PatientProfileCreation.findOne({ OwnerId: ownerId });
};

export const saveProfile = (profileData) => {
    const newProfile = new PatientProfileCreation(profileData);
    return newProfile.save();
};
