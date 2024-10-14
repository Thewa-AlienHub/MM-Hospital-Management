import express from 'express';
import { CreateReport,deleteCholesterolReport,getAllCholesterolReports,getAllReportsById,getLatestCholesterolReport,updateCholesterolReport } from '../../controllers/IT22084668_Controllers/CholesterolReport.controller.js';

const router = express.Router();

router.post('/addCholesterolReport',CreateReport);
router.get('/getLatestCholesterolReport/:id',getLatestCholesterolReport);
router.delete('/deleteCholesterolReport/:id',deleteCholesterolReport);
router.put('/editCholesterolReport/:id',updateCholesterolReport);
router.get('/Allreports/:id', getAllReportsById);
router.get('/All', getAllCholesterolReports);


export default router;