import express from "express";
import { getPatientDetails } from "../../controllers/IT22603418_Controllers/PatientDetails.contoller_04.js";

const router = express.Router();
// Define the route for fetching patient details by ID
router.get("/:id", getPatientDetails);

export default router;
