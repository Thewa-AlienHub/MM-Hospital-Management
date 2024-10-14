import { assignLabTests } from "./../../controllers/IT22603418_Controllers/LabTest.controller_04.js";
import express from "express";
const router = express.Router();

// Route for assigning a lab test
router.post("/assign", assignLabTests);

export default router;
