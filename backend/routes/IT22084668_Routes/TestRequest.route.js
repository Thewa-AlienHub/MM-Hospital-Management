import express from 'express';
import { getAllTests,getTestById } from '../../controllers/IT22084668_Controllers/TestRequest.controller.js';



const router = express.Router();


router.get('/getAllTest', getAllTests);
router.get('/getTestByID/:id', getTestById);

export default router;