import express from 'express';
import { CreateReport,deleteUrinalReport,getLatestUrinalReport,updateUrinalReport,getAllReportsById, getAllUrinalReports } from '../../controllers/IT22084668_Controllers/UrinalReport.Controller.js';

const router = express.Router();

router.post('/addUrinalReport',CreateReport);
router.get('/getLatestUrinalReport/:id',getLatestUrinalReport);
router.delete('/deleteUrinalReport/:id',deleteUrinalReport);
router.put('/editUrinalReport/:id',updateUrinalReport);
router.get('/Allreports/:id', getAllReportsById);
router.get('/All', getAllUrinalReports);

export default router;