import express from 'express';
import { CreateReport,getAllAngiographyReports,deleteAngiographyReport,getLatestAngiographyReport,getAllReportsById,updateAngiographyReport} from '../../controllers/IT22084668_Controllers/AngiographyReport.Ccontroller.js';

const router = express.Router();

router.post('/addAngiographyReport',CreateReport);
router.get('/getLatestAngiographyReport/:id',getLatestAngiographyReport);
router.delete('/deleteAngiographyReport/:id',deleteAngiographyReport);
router.put('/editAngiographyReport/:id',updateAngiographyReport);
router.get('/Allreports/:id', getAllReportsById);
router.get('/All', getAllAngiographyReports);


export default router;