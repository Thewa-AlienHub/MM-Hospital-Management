// services/PatientProfile.service.js
import { findProfileByOwnerId, saveProfile } from '../../repositories/IT22602978_Repositories/PatientProfile_03.repo.js';
import LoggingObserver from '../../observers/IT22602978_Observers/LoggingObserver_03.js';
import AppointmentSubject from '../../observers/IT22602978_Observers/Subjects_03/AppointmentSubject_03.js';

const appointmentSubject = new AppointmentSubject();
appointmentSubject.attach(new LoggingObserver());

// Function to validate required fields
const validateProfileData = (data) => {
    const requiredFields = [
        'FirstName', 'LastName', 'OwnerId', 'dob', 'gender',
        'contactNumber', 'email', 'bloodGroup', 'allergies',
        'preConditions', 'medications', 'emergencyContactName', 
        'emergencyContactNumber'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Field "${field}" is required`);
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format');
    }

    // Validate date of birth
    const dob = new Date(data.dob);
    if (dob > new Date()) {
        throw new Error('Date of birth cannot be in the future');
    }

    // Validate contact number
    if (!/^\d{10}$/.test(data.contactNumber)) {
        throw new Error('Invalid contact number');
    }
};

// Main service to create a new patient profile
export const createProfileService = async (profileData) => {
    try {
        // Validate the profile data
        validateProfileData(profileData);

        // Check for existing profile by OwnerId
        const existingProfile = await findProfileByOwnerId(profileData.OwnerId);
        if (existingProfile) {
            throw new Error("Profile already exists");
        }

        // Save the new profile
        const newProfile = await saveProfile(profileData);

        // Notify observers about the new profile creation
        appointmentSubject.notify({ event: 'ProfileCreated', profile: newProfile });

        return newProfile; // Return the new profile
    } catch (error) {
        console.error('Error creating profile:', error.message);
        throw error; // Propagate the error for further handling
    }
};

// Service to get a patient profile
export const getProfileService = async (patientId) => {
    try {
        const profile = await findProfileByOwnerId(patientId);
        if (!profile) throw new Error("Profile not found");

        // Notify observers about the profile retrieval
        appointmentSubject.notify({ event: 'ProfileRetrieved', profile });

        return profile;
    } catch (error) {
        console.error('Error retrieving profile:', error.message);
        throw new Error(error.message);
    }
};
