import express from 'express';
import {CreatePatientProfile,getPatientProfile} from '../../controllers/IT22602978_Controllers/PatientProfileCreation.controller_03.js';
import { verifyToken } from '../../utils/verifyUser.js';


const router = express.Router();

router.post('/CreatePatient',verifyToken,CreatePatientProfile);
router.get('/get/:patientId',verifyToken,getPatientProfile);





export default router;