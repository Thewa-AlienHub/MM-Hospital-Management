import express from "express";
import {
  addPatientHistory,
  getPatientHistoriesByPatientId,
} from "../../controllers/IT22603418_Controllers/PatientHistory.controller_04.js";

const router = express.Router();

router.post("/add", addPatientHistory);
router.get("/:patientId", getPatientHistoriesByPatientId);

export default router;
