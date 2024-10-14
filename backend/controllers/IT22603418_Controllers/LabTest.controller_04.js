import LabTest from "../../models/IT22603418_Models/LabTest.model_04.js";
import TestRequestObserverImplementation from "../../controllers/IT22603418_Controllers/TestRequestsObserverImpl.js"; // Import the observer update class

// Initialize the observer
const testRequestObserver = new TestRequestObserverImplementation();

// Function to assign lab tests
export const assignLabTests = async (req, res) => {
  const { patientId, doctorId, tests } = req.body;

  try {
    // Create a new LabTest instance
    const labTest = new LabTest({
      patientId,
      doctorId,
      tests,
    });

    // Save the LabTest instance to the database
    await labTest.save();

    // Notify the observer after saving the LabTest
    testRequestObserver.update(labTest);

    // Respond with a success message
    return res
      .status(200)
      .json({
        message: "Lab tests assigned and test request updated successfully.",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to assign lab tests", error: error.message });
  }
};
