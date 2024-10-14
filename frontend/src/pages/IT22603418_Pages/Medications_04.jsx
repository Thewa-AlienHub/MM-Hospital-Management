import React, { useState, useEffect } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Medications_04 = ({ loggedInUser }) => {
  // const { patientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [illness, setIllness] = useState("");
  const { patientId } = location.state || {};

  // State for patient's name
  const [patientName, setPatientName] = useState("");

  // Fetch patient's name based on patientId
  useEffect(() => {
    const fetchPatientName = async () => {
      if (!patientId) {
        console.error("Patient ID is undefined");
        return; // Early return if patientId is not available
      }

      try {
        const response = await fetch(`/api/patient/${patientId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient name");
        }
        const data = await response.json();
        setPatientName(data.basicInfo.name); // Assuming the patient name is in the 'name' field
      } catch (error) {
        console.error("Error fetching patient name:", error);
      }
    };

    fetchPatientName();
  }, [patientId]);

  const medicationOptions = [
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Panadol",
    "Amlodipine",
    "Levothyroxine",
    "Simvastatin",
    "Losartan",
    "Sertraline",
    "Furosemide",
    "Gabapentin",
  ].sort(); // Sort medication names alphabetically

  const dosageOptions = [
    "500mg",
    "10mg",
    "20mg",
    "5mg",
    "75mcg",
    "40mg",
    "50mg",
    "300mg",
    "20mg",
    "100mg",
  ].sort((a, b) => {
    // Custom sort to handle numeric values correctly
    const aNum = parseInt(a) || (a.endsWith("mcg") ? 0 : Infinity);
    const bNum = parseInt(b) || (b.endsWith("mcg") ? 0 : Infinity);
    return aNum - bNum;
  });

  const frequencyOptions = [
    "Once a day",
    "Twice a day",
    "Three times a day",
    "Every other day",
  ];

  // Handler to add medication
  const handleAddMedication = () => {
    if (selectedMedication && selectedDosage && selectedFrequency) {
      const newMedication = {
        name: selectedMedication,
        dosage: selectedDosage,
        frequency: selectedFrequency,
      };
      setMedications((prev) => [...prev, newMedication]);
      // Reset selections
      setSelectedMedication("");
      setSelectedDosage("");
      setSelectedFrequency("");
    } else {
      alert("Please select all fields before adding.");
    }
  };

  // Handler to submit the medications and illness
  const handleSubmit = async () => {
    if (illness && medications.length > 0) {
      const historyData = {
        patientId: patientId, // Use patientId from params
        doctorId: currentUser._id, // Assuming the current user's ID is the doctor's ID
        doctorName: currentUser.username,
        disease: [illness], // Store illness as an array
        medications: medications,
      };

      try {
        const response = await fetch(`/api/patient-history/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit patient history");
        }

        const data = await response.json();
        console.log("Patient history submitted successfully:", data);
        // Optionally reset state or show a success message
        setMedications([]);
        setIllness("");
      } catch (error) {
        console.error("Error submitting patient history:", error);
      }
    } else {
      alert("Please fill in all required fields before submitting.");
    }
  };

  // Handler for navigating to LabTest_04
  const handleLabTest = () => {
    navigate(`/lab-tests/${patientId}`, {
      state: { patientId, doctorId: currentUser._id },
    });
  };

  // Handler for closing the channel and clearing patient details
  const handleCloseChannel = () => {
    setMedications([]);
    setIllness("");
    setPatientName("");
    navigate(`/scanQR_04`); // Navigates to the ScanQR screen
  };

  return (
    <div className="bg-white rounded-3xl shadow-md max-w-lg mx-auto p-3 w-full mt-5">
      <h2 className="text-xl font-bold mb-4 text-center">
        Medications for : {patientName} <br />
        Doctor Name : {currentUser.username}
      </h2>
      <div>
        <label className="block mb-2">Medication:</label>
        <Select
          onChange={(e) => setSelectedMedication(e.target.value)}
          value={selectedMedication}
        >
          <option value="" disabled>
            Select Medication
          </option>
          {medicationOptions.map((medication, index) => (
            <option key={index} value={medication}>
              {medication}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <label className="block mb-2">Dosage:</label>
        <Select
          onChange={(e) => setSelectedDosage(e.target.value)}
          value={selectedDosage}
        >
          <option value="" disabled>
            Select Dosage
          </option>
          {dosageOptions.map((dosage, index) => (
            <option key={index} value={dosage}>
              {dosage}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <label className="block mb-2">Frequency:</label>
        <Select
          onChange={(e) => setSelectedFrequency(e.target.value)}
          value={selectedFrequency}
        >
          <option value="" disabled>
            Select Frequency
          </option>
          {frequencyOptions.map((frequency, index) => (
            <option key={index} value={frequency}>
              {frequency}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <label className="block mb-2">Illness:</label>
        <TextInput
          onChange={(e) => setIllness(e.target.value)}
          value={illness}
          placeholder="Enter the patient's illness"
        />
      </div>

      <Button
        onClick={handleAddMedication}
        className="mt-4 w-full bg-blue-950 rounded-full"
      >
        Add Medication
      </Button>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Current Medications</h3>
        <ul>
          {medications.map((med, index) => (
            <li key={index}>
              {med.name} - {med.dosage} ({med.frequency})
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-500 rounded-full"
      >
        Submit Patient History
      </Button>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleLabTest}
          className="bg-blue-500 rounded-full w-full"
        >
          Take Lab Test
        </Button>
        <Button
          onClick={handleCloseChannel}
          className="bg-red-500 rounded-full w-full"
        >
          Close Channel
        </Button>
      </div>
    </div>
  );
};

export default Medications_04;
