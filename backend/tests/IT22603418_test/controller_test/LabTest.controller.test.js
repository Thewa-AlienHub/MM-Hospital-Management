// tests/controllers/LabTest.controller.test.js
import request from 'supertest';
import express from 'express';
import { assignLabTests } from '../../controllers/IT22603418_Controllers/LabTest.controller_04.js';
import mongoose from 'mongoose';

// Mock the LabTest model
jest.mock('../../models/IT22603418_Models/LabTest.model_04.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue(true), // Mock save method
    };
  });
});

const app = express();
app.use(express.json());
app.post('/assign', assignLabTests);

describe('LabTest Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('should assign lab tests successfully', async () => {
    const response = await request(app)
      .post('/assign')
      .send({
        patientId: new mongoose.Types.ObjectId(),
        doctorId: new mongoose.Types.ObjectId(),
        tests: [{ testType: 'blood test', priority: 'Urgent' }],
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Lab tests assigned and test request updated successfully.');
  });

  test('should return 500 when saving lab tests fails', async () => {
    // Mock the save method to reject
    const LabTest = require('../../models/IT22603418_Models/LabTest.model_04.js');
    LabTest.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValue(new Error('Database Error')),
    }));

    const response = await request(app)
      .post('/assign')
      .send({
        patientId: new mongoose.Types.ObjectId(),
        doctorId: new mongoose.Types.ObjectId(),
        tests: [{ testType: 'blood test', priority: 'Urgent' }],
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to assign lab tests');
  });

  test('should return 400 for missing patientId', async () => {
    const response = await request(app)
      .post('/assign')
      .send({
        doctorId: new mongoose.Types.ObjectId(),
        tests: [{ testType: 'blood test', priority: 'Urgent' }],
      });

    expect(response.status).toBe(400); // Assuming you handle validation in your controller
    expect(response.body.message).toBe('Patient ID is required');
  });
});
