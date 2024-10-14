import express from 'express';
import {CreateReport,getAllReports,getReportById,getAllReportsById} from '../../controllers/IT22084668_Controllers/BloodReport.controller.js';

const router = express.Router();

router.post('/addBloodReport',CreateReport);
router.get('/getReportById/:id', getReportById);
router.get('/getAllReports', getAllReports);
router.get('/Allreports/:id', getAllReportsById);
export default router;
