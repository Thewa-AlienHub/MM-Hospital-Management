// GiveFeedback.repository.js
import GiveFeedback from "../../models/IT22114044_Models/GiveFeedback.model_01.js";

export const createFeedback = async (feedbackData) => {
    const newFeedback = new GiveFeedback(feedbackData);
    return await newFeedback.save();
};

export const getAllFeedbacks = async () => {
    return await GiveFeedback.find();
};

export const getFeedbacksByUserEmail = async (email) => {
    return await GiveFeedback.find({ email });
};

export const updateFeedbackStatusById = async (id, status) => {
    return await GiveFeedback.findByIdAndUpdate(id, { status }, { new: true });
};
