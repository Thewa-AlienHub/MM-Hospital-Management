import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { createFeedback, getFeedbacks, getFeedbacksByUserEmail, updateFeedbackStatus } from "../../controllers/IT22114044_Controllers/GiveFeedback.controller_01.js";


const router = express.Router();

router.post('/GiveFeedback',verifyToken,createFeedback);
router.get('/GiveFeedback',verifyToken,getFeedbacks);

// Get feedback by user email
router.get('/GiveFeedback/byEmail', verifyToken, getFeedbacksByUserEmail);

router.patch('/GiveFeedback/:id/updateStatus', verifyToken, updateFeedbackStatus);


export default router;

