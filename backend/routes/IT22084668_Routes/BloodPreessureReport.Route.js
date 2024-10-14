import express from 'express';
import { CreateReport,getLatestReport,deleteReport,updateReport,getAllReportsById, getAllBloodPressurReports } from '../../controllers/IT22084668_Controllers/BloodPressureReport.controller.js';

const router = express.Router();

router.post('/addBloodPressureReport',CreateReport);

// Get the latest report by ID
router.get('/getLatestBloodPressureReport/:ID', getLatestReport);

// Update a report by ID
router.put('/updateBloodPressureReport/:ID', updateReport);

// Delete a report by ID
router.delete('/deleteBloodPressureReport/:ID', deleteReport);

router.get('/Allreports/:id', getAllReportsById);

router.get('/All', getAllBloodPressurReports);
export default router;
