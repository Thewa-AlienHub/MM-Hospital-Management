// __tests__/PatientProfileCreation.controller.test.js
import request from 'supertest';
import express from 'express';
import { CreatePatientProfile, getPatientProfile } from '../../../controllers/IT22602978_Controllers/PatientProfileCreation.controller_03.js';
import * as PatientProfileService from '../../../services/IT22602978_Services/PatientProfile.service.js';

const app = express();
app.use(express.json());
app.post('/CreatePatient', CreatePatientProfile);
app.get('/get/:patientId', getPatientProfile);

jest.mock('../../../services/IT22602978_Services/PatientProfile.service.js');

describe('PatientProfile Creation Controller Tests', () => {
  const mockProfileData = {
    FirstName: 'John',
    LastName: 'Doe',
    OwnerId: '123',
    dob: '2000-01-01',
    gender: 'Male',
    contactNumber: '1234567890',
    email: 'john.doe@example.com',
    bloodGroup: 'O+',
    allergies: 'None',
    preConditions: 'None',
    medications: 'None',
    emergencyContactName: 'Jane Doe',
    emergencyContactNumber: '0987654321'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Positive Test Cases
  test('should create a new patient profile successfully', async () => {
    // Arrange
    PatientProfileService.createProfileService.mockResolvedValue(mockProfileData);

    // Act
    const response = await request(app).post('/CreatePatient').send(mockProfileData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.newProfile).toEqual(mockProfileData);
  });

  test('should retrieve an existing patient profile successfully', async () => {
    // Arrange
    PatientProfileService.getProfileService.mockResolvedValue(mockProfileData);

    // Act
    const response = await request(app).get('/get/123');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfileData);
  });

  // Negative Test Cases
  test('should return 404 if all required fields are missing when creating a profile', async () => {
    // Arrange
    const incompleteProfileData = { FirstName: undefined }; // Missing required fields
    PatientProfileService.createProfileService.mockRejectedValue(new Error('all fields are required'));

    // Act
    const response = await request(app).post('/CreatePatient').send(incompleteProfileData);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('all fields are required');
  });

  test('should return 404 if the profile is not found during retrieval', async () => {
    // Arrange
    PatientProfileService.getProfileService.mockRejectedValue(new Error('Profile not found'));

    // Act
    const response = await request(app).get('/get/non-existent-id');

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Profile not found');
  });

  test('should return 500 if there is an internal server error during profile creation', async () => {
    // Arrange
    PatientProfileService.createProfileService.mockRejectedValue(new Error('Internal Server Error'));

    // Act
    const response = await request(app).post('/CreatePatient').send(mockProfileData);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
