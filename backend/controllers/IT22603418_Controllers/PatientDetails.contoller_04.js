import PatientProfileCreation from "../../models/IT22602978_Models/PatientProfileCreation.model_03.js";

// Controller to get patient details by ID
export const getPatientDetails = async (req, res) => {
  const PatientProfileId = req.params.id;

  try {
    // Find the patient by their ID
    const PatientProfile = await PatientProfileCreation.findById(
      PatientProfileId
    );

    if (!PatientProfile) {
      return res.status(404).json({ message: "Patient Profile not found" });
    }

    // Calculate age from DOB
    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const difference = Date.now() - birthDate.getTime();
      const ageDate = new Date(difference);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const age = calculateAge(PatientProfile.dob);

    // Create the response data structure
    const PatientProfileData = {
      basicInfo: {
        name: `${PatientProfile.FirstName} ${PatientProfile.LastName}`,
        age: age,
        gender: PatientProfile.gender,
        bloodGroup: PatientProfile.bloodGroup,
      },
      providedDetails: {
        preConditions:
          PatientProfile.preConditions || "No preconditions provided",
        medications: PatientProfile.medications || "No medications provided",
        allergies: PatientProfile.allergies || "No allergies provided",
      },
    };

    return res.status(200).json(PatientProfileData);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
