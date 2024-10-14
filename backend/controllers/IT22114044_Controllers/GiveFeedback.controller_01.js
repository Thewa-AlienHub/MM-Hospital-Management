import * as feedbackService from "../../services/IT22114044_Services/GiveFeedback_01.services.js";

export const createFeedback = async (req, res, next) => {
    try {
        const newFeedback = await feedbackService.createFeedbackService(req.body);
        return res.status(201).json(newFeedback);
    } catch (error) {
        console.error("Error saving feedback:", error.message); // Log the error message
        next(error);
    }
};

export const getFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await feedbackService.getAllFeedbacksService();
        res.status(200).send(feedbacks);
    } catch (error) {
        next(error);
    }
};

export const getFeedbacksByUserEmail = async (req, res, next) => {
    const { email } = req.query; // Get the email from the query parameters
    try {
        const feedbacks = await feedbackService.getFeedbacksByUserEmailService(email);
        res.status(200).send(feedbacks);
    } catch (error) {
        next(error);
    }
};

export const updateFeedbackStatus = async (req, res, next) => {
    const { id } = req.params; // Get feedback ID from URL params
    const { status } = req.body; // Get new status from the request body

    try {
        const updatedFeedback = await feedbackService.updateFeedbackStatusService(id, status);
        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json(updatedFeedback);
    } catch (error) {
        console.error("Error updating feedback status:", error.message); // Log the error message
        next(error);
    }
};