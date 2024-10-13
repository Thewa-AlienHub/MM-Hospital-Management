import PatientHistory from "../../models/IT22603418_Models/PatientHistory.model_04.js";

export const addPatientHistory = async (req, res) => {
  const { patientId, doctorId, doctorName, disease, medications } = req.body;

  // Validate the incoming data
  if (
    !patientId ||
    !doctorId ||
    !doctorName ||
    !disease ||
    !medications ||
    medications.length === 0
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new patient history entry
    const newHistory = new PatientHistory({
      patientId,
      doctorId,
      doctorName,
      disease,
      medications,
    });

    // Save to the database
    await newHistory.save();

    // Respond with the created record
    return res.status(201).json(newHistory);
  } catch (error) {
    console.error("Error adding patient history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to fetch patient history by patient ID
export const getPatientHistoriesByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const histories = await PatientHistory.find({ patientId })
      .populate("doctorId", "name") // Populate doctorId to get doctor's name
      .exec();

    if (!histories || histories.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this patient." });
    }

    return res.status(200).json(histories);
  } catch (error) {
    console.error("Error fetching patient histories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
