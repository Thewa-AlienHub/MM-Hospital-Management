import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { createDoctor, getDoctors, updateDoctor, deleteDoctor } from "../../controllers/IT22114044_Controllers/Doctors.controller_01.js";

const router = express.Router();

router.post('/Doctors',verifyToken,createDoctor);
router.get('/Doctors',verifyToken,getDoctors);
router.put('/Doctors/:id', verifyToken, updateDoctor);  // Route for updating a doctor
router.delete('/Doctors/:id', verifyToken, deleteDoctor);  // Route for deleting a doctor

export default router;
