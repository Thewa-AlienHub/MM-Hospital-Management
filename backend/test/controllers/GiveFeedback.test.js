// tests/GiveFeedback.controller.test.js
import { createFeedback, getFeedbacks, getFeedbacksByUserEmail, updateFeedbackStatus } from '../../controllers/IT22114044_Controllers/GiveFeedback.controller_01.js';
import * as feedbackService from '../../services/IT22114044_Services/GiveFeedback_01.services.js';

jest.mock('../../services/IT22114044_Services/GiveFeedback_01.services.js'); // Mocking the service module

describe('GiveFeedback Controller', () => {
    // Mocking req, res, and next objects
    const req = {
        body: {
            doctor: "Dr. Smith",
            date: new Date(),
            feedback: "Great service!",
            rating: 5,
            email: "test@example.com",
        },
        params: { id: "someFeedbackId" },
        query: { email: "test@example.com" }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    };
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks before each test
    });

    describe('createFeedback', () => {
        it('should create feedback and return 201 status', async () => {
            feedbackService.createFeedbackService.mockResolvedValue(req.body); // Mocking successful service response

            await createFeedback(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
            expect(next).not.toHaveBeenCalled();
        });

        it('should call next with an error when service fails', async () => {
            const error = new Error('Database error');
            feedbackService.createFeedbackService.mockRejectedValue(error); // Mocking failed service response

            await createFeedback(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getFeedbacks', () => {
        it('should return all feedbacks with a 200 status', async () => {
            const feedbacksArray = [req.body]; // Mock feedback data
            feedbackService.getAllFeedbacksService.mockResolvedValue(feedbacksArray);

            await getFeedbacks(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(feedbacksArray);
            expect(next).not.toHaveBeenCalled();
        });

        it('should call next with an error if fetching feedbacks fails', async () => {
            const error = new Error('Fetching error');
            feedbackService.getAllFeedbacksService.mockRejectedValue(error);

            await getFeedbacks(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getFeedbacksByUserEmail', () => {
        it('should return feedbacks by user email with a 200 status', async () => {
            const feedbacksArray = [req.body]; // Mock feedback data
            feedbackService.getFeedbacksByUserEmailService.mockResolvedValue(feedbacksArray);

            await getFeedbacksByUserEmail(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(feedbacksArray);
            expect(next).not.toHaveBeenCalled();
        });

        it('should call next with an error if fetching feedbacks by email fails', async () => {
            const error = new Error('Fetching by email error');
            feedbackService.getFeedbacksByUserEmailService.mockRejectedValue(error);

            await getFeedbacksByUserEmail(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateFeedbackStatus', () => {
        it('should update feedback status and return 200 status', async () => {
            const updatedFeedback = { ...req.body, status: 'Thank You' }; // Mock updated feedback data
            feedbackService.updateFeedbackStatusService.mockResolvedValue(updatedFeedback);

            await updateFeedbackStatus(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedFeedback);
            expect(next).not.toHaveBeenCalled();
        });

        it('should return 404 if feedback is not found', async () => {
            feedbackService.updateFeedbackStatusService.mockResolvedValue(null); // Simulate feedback not found

            await updateFeedbackStatus(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Feedback not found" });
        });

        it('should call next with an error if updating status fails', async () => {
            const error = new Error('Update error');
            feedbackService.updateFeedbackStatusService.mockRejectedValue(error);

            await updateFeedbackStatus(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
