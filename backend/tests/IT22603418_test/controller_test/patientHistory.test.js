// tests/IT22603418_Tests/patientHistory.test.js
const request = require("supertest");
const express = require("express");
const {
  addPatientHistory,
  getPatientHistoriesByPatientId,
} = require("../../../controllers/IT22603418_Controllers/PatientHistory.controller_04.js");
const mongoose = require("mongoose");

// Inside your test file
const validObjectId = new mongoose.Types.ObjectId();
const app = express();
app.use(express.json());
app.post("/add", addPatientHistory);
app.get("/:patientId", getPatientHistoriesByPatientId);

describe("Patient History API", () => {
  test("POST /add - successfully adds patient history", async () => {
    const response = await request(app)
      .post("/api/patient-history/add") // Adjust the route if needed
      .send({
        patientId: "60c72b2f4f1a2c001f644c1b", // Replace with valid ObjectId
        doctorId: "60c72b2f4f1a2c001f644c1c",
        doctorName: "Dr. Smith",
        disease: ["Flu"],
        medications: [
          { name: "Medication A", dosage: "500mg", frequency: "Twice a day" },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.disease).toEqual(expect.arrayContaining(["Flu"]));
  });

  test("POST /add - fails to add patient history with missing fields", async () => {
    const response = await request(app)
      .post("/api/patient-history/add")
      .send({
        doctorId: "60c72b2f4f1a2c001f644c1c",
        doctorName: "Dr. Smith",
        disease: ["Flu"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required.");
  });

  test("POST /add - fails to add patient history with invalid ObjectId", async () => {
    const response = await request(app)
      .post("/api/patient-history/add")
      .send({
        patientId: "invalid_id", // Invalid ObjectId
        doctorId: validObjectId, // Use a valid ObjectId for the test
        doctorName: "Dr. Smith",
        disease: ["Flu"],
        medications: [
          { name: "Medication A", dosage: "500mg", frequency: "Twice a day" },
        ],
      });

    expect(response.status).toBe(400); // Assuming you add validation for this
    expect(response.body).toHaveProperty(
      "message",
      "Invalid patient ID format."
    );
  });

  test("GET /:patientId - successfully fetches patient histories", async () => {
    const newHistory = new PatientHistory({
      patientId: "60c72b2f4f1a2c001f644c1b",
      doctorId: "60c72b2f4f1a2c001f644c1c",
      doctorName: "Dr. Smith",
      disease: ["Flu"],
      medications: [
        { name: "Medication A", dosage: "500mg", frequency: "Twice a day" },
      ],
    });
    await newHistory.save();

    const response = await request(app).get(
      "/api/patient-history/60c72b2f4f1a2c001f644c1b"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("doctorName", "Dr. Smith");
  });

  test("GET /:patientId - returns 404 if no histories found", async () => {
    const response = await request(app).get(
      "/api/patient-history/60c72b2f4f1a2c001f644c1b"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "No history found for this patient."
    );
  });
});
