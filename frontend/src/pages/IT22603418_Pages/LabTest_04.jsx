import React, { useState } from "react";
import { Button } from "flowbite-react";

const LabTest_04 = () => {
  // Initialize an array to keep track of selected lab tests
  const [selectedTests, setSelectedTests] = useState([]);

  const labTests = [
    { id: 1, name: "Blood Test" },
    { id: 2, name: "Urine Test" },
    { id: 3, name: "Angiography" },
    { id: 4, name: "Blood Pressure" },
    { id: 5, name: "Cholesterol" },
    { id: 6, name: "MRI" },
    { id: 7, name: "X-Ray" },
  ];

  // Handle checkbox changes
  const handleTestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the test to the array if checked
      setSelectedTests((prev) => [...prev, value]);
    } else {
      // Remove the test from the array if unchecked
      setSelectedTests((prev) => prev.filter((test) => test !== value));
    }
  };

  const handleUpdateQR = () => {
    // Simulate updating the QR code with selected lab tests
    console.log("Lab Tests ordered:", selectedTests);
    alert("QR Code updated with new lab tests.");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Lab Tests</h2>
      <div className="mb-4">
        {labTests.map((test) => (
          <div key={test.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={test.name}
              value={test.name}
              checked={selectedTests.includes(test.name)}
              onChange={handleTestChange}
              className="mr-2"
            />
            <label htmlFor={test.name} className="text-gray-700">
              {test.name}
            </label>
          </div>
        ))}
      </div>
      <Button
        onClick={handleUpdateQR}
        className="w-full bg-blue-950 rounded-full"
      >
        Add Tests
      </Button>
    </div>
  );
};

export default LabTest_04;
