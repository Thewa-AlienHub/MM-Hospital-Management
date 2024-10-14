// backend/tests/IT22602978_tests/services/PatientProfile.service.test.js

import { createProfileService, getProfileService } from '../../../services/IT22602978_Services/PatientProfile.service.js';
import { findProfileByOwnerId, saveProfile } from '../../../repositories/IT22602978_Repositories/PatientProfile_03.repo.js';

// Mock the repository functions
jest.mock('../../../repositories/IT22602978_Repositories/PatientProfile_03.repo.js', () => ({
    findProfileByOwnerId: jest.fn(),
    saveProfile: jest.fn(),
}));

describe('PatientProfile Service', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('createProfileService', () => {
        it('should create a profile successfully', async () => {
            const profileData = {
                FirstName: 'John',
                LastName: 'Doe',
                OwnerId: '12345',
                dob: '1990-01-01',
                gender: 'Male',
                contactNumber: '1234567890',
                email: 'john.doe@example.com',
                bloodGroup: 'O+',
                allergies: 'None',
                preConditions: 'None',
                medications: 'None',
                emergencyContactName: 'Jane Doe',
                emergencyContactNumber: '0987654321',
            };

            saveProfile.mockResolvedValue(profileData); // Mock saveProfile return value
            findProfileByOwnerId.mockResolvedValue(null); // Mock no existing profile

            const result = await createProfileService(profileData);
            expect(result).toEqual(profileData);
            expect(saveProfile).toHaveBeenCalledWith(profileData);
            expect(findProfileByOwnerId).toHaveBeenCalledWith(profileData.OwnerId);
        });

        it('should throw an error if a required field is missing', async () => {
            const profileData = {
                FirstName: 'John',
                LastName: 'Doe',
                OwnerId: '12345',
                dob: '1990-01-01',
                gender: 'Male',
                contactNumber: '1234567890',
                email: 'john.doe@example.com',
                bloodGroup: 'O+',
                allergies: 'None',
                preConditions: 'None',
                medications: 'None',
                emergencyContactName: 'Jane Doe',
                // emergencyContactNumber is missing
            };

            await expect(createProfileService(profileData)).rejects.toThrow('Field "emergencyContactNumber" is required');
        });

        it('should throw an error if the email format is invalid', async () => {
            const profileData = {
                FirstName: 'John',
                LastName: 'Doe',
                OwnerId: '12345',
                dob: '1990-01-01',
                gender: 'Male',
                contactNumber: '1234567890',
                email: 'invalid-email-format',
                bloodGroup: 'O+',
                allergies: 'None',
                preConditions: 'None',
                medications: 'None',
                emergencyContactName: 'Jane Doe',
                emergencyContactNumber: '0987654321',
            };

            await expect(createProfileService(profileData)).rejects.toThrow('Invalid email format');
        });

        it('should throw an error if a profile already exists', async () => {
            const profileData = {
                FirstName: 'John',
                LastName: 'Doe',
                OwnerId: '12345',
                dob: '1990-01-01',
                gender: 'Male',
                contactNumber: '1234567890',
                email: 'john.doe@example.com',
                bloodGroup: 'O+',
                allergies: 'None',
                preConditions: 'None',
                medications: 'None',
                emergencyContactName: 'Jane Doe',
                emergencyContactNumber: '0987654321',
            };

            findProfileByOwnerId.mockResolvedValue(profileData); // Mock existing profile

            await expect(createProfileService(profileData)).rejects.toThrow('Profile already exists');
        });
    });

    describe('getProfileService', () => {
        it('should return the profile if found', async () => {
            const patientId = '12345';
            const profileData = { OwnerId: patientId, FirstName: 'John', LastName: 'Doe' };
            
            findProfileByOwnerId.mockResolvedValue(profileData); // Mock profile found

            const result = await getProfileService(patientId);
            expect(result).toEqual(profileData);
            expect(findProfileByOwnerId).toHaveBeenCalledWith(patientId);
        });

        it('should throw an error if the profile is not found', async () => {
            const patientId = '12345';
            findProfileByOwnerId.mockResolvedValue(null); // Mock no profile found

            await expect(getProfileService(patientId)).rejects.toThrow('Profile not found');
        });
    });
});
