import React, { useState } from "react";
import { Button, Select } from "flowbite-react";

const Medications_04 = () => {
  // State for medications
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");

  // Dummy data for dropdowns
  const medicationOptions = [
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Medications</h2>

      <div className="mb-4">
        <Select
          value={selectedMedication}
          onChange={(e) => setSelectedMedication(e.target.value)}
          className="w-full mb-2"
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

        <Select
          value={selectedDosage}
          onChange={(e) => setSelectedDosage(e.target.value)}
          className="w-full mb-2"
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

        <Select
          value={selectedFrequency}
          onChange={(e) => setSelectedFrequency(e.target.value)}
          className="w-full mb-4"
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

        <Button
          onClick={handleAddMedication}
          className="w-full bg-blue-950 rounded-full"
        >
          Add Medication
        </Button>
      </div>

      {/* Displaying Added Medications */}
      <h3 className="text-lg font-semibold mb-2">Added Medications:</h3>
      {medications.length > 0 ? (
        medications.map((medication, index) => (
          <div key={index} className="mb-2 p-2 border rounded-md">
            <p>Name: {medication.name}</p>
            <p>Dosage: {medication.dosage}</p>
            <p>Frequency: {medication.frequency}</p>
          </div>
        ))
      ) : (
        <p>No medications added yet.</p>
      )}
    </div>
  );
};

export default Medications_04;
