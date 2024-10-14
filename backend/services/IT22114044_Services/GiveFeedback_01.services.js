// GiveFeedback.service.js

import * as feedbackRepository from '../../repositories/IT22114044_Repositories/GiveFeedbackRepo_01.repo.js';


export const createFeedbackService = async (feedbackData) => {
    try {
        return await feedbackRepository.createFeedback(feedbackData);
    } catch (error) {
        throw new Error("Error creating feedback: " + error.message);
    }
};

export const getAllFeedbacksService = async () => {
    try {
        return await feedbackRepository.getAllFeedbacks();
    } catch (error) {
        throw new Error("Error fetching feedbacks: " + error.message);
    }
};

export const getFeedbacksByUserEmailService = async (email) => {
    try {
        return await feedbackRepository.getFeedbacksByUserEmail(email);
    } catch (error) {
        throw new Error("Error fetching feedbacks by email: " + error.message);
    }
};

export const updateFeedbackStatusService = async (id, status) => {
    try {
        return await feedbackRepository.updateFeedbackStatusById(id, status);
    } catch (error) {
        throw new Error("Error updating feedback status: " + error.message);
    }
};
