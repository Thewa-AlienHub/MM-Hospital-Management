import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LabTest_04 = () => {
  const location = useLocation();
  const { patientId } = useParams();
  const { doctorId } = location.state || {};
  const [selectedTests, setSelectedTests] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [patientName, setPatientName] = useState("");
  const navigate = useNavigate();

  // Fetch patient's name
  useEffect(() => {
    const fetchPatientName = async () => {
      if (!patientId) return;

      try {
        const response = await fetch(`/api/patient/${patientId}`);
        const data = await response.json();
        setPatientName(data.basicInfo.name);
      } catch (error) {
        console.error("Error fetching patient name:", error);
      }
    };

    fetchPatientName();
  }, [patientId]);

  const labTests = [
    { id: 1, name: "Blood Test" },
    { id: 2, name: "Urine Test" },
    { id: 3, name: "Angiography" },
    { id: 4, name: "Blood Pressure" },
    { id: 5, name: "Cholesterol" },
    { id: 6, name: "MRI" },
    { id: 7, name: "X-Ray" },
  ];

  const handleTestChange = (e, test) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTests((prev) => [
        ...prev,
        { testType: value, priority: "Normal" }, // Default priority
      ]);
    } else {
      setSelectedTests((prev) => prev.filter((t) => t.testType !== value));
    }
  };

  const handlePriorityChange = (e, testType) => {
    const { value } = e.target;
    setSelectedTests((prev) =>
      prev.map((test) =>
        test.testType === testType ? { ...test, priority: value } : test
      )
    );
  };

  const handleUpdateQR = async () => {
    try {
      const response = await fetch("/api/labTests/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          doctorId,
          tests: selectedTests,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to assign lab tests: ${errorData.message}`);
      }

      const result = await response.json();
      alert(result.message);

      // Clear the selected tests after successful submission
      setSelectedTests([]);
    } catch (error) {
      console.error("Error updating lab tests:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Handler for navigating back with patient's history
  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  // Handler for navigating to LabTest_04
  const handleMedication = () => {
    navigate(`/medications/${patientId}`, {
      state: { patientId, doctorId: currentUser._id },
    });
  };

  // Handler for closing the channel and clearing patient details
  const handleCloseChannel = () => {
    setSelectedTests([]);
    setPatientName("");
    navigate(`/scanQR_04`); // Navigates to the ScanQR screen
  };

  return (
    <div className="bg-white rounded-3xl shadow-md max-w-lg mx-auto p-3 w-full mt-5">
      <h2 className="text-xl font-bold mb-4 text-center">
        Lab test for: {patientName} <br />
        Doctor Name: {currentUser.username}
      </h2>
      <div className="mb-4">
        {labTests.map((test) => (
          <div key={test.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={test.name}
              value={test.name}
              checked={selectedTests.some((t) => t.testType === test.name)}
              onChange={(e) => handleTestChange(e, test)}
              className="mr-2"
            />
            <label htmlFor={test.name} className="text-gray-700 mr-4">
              {test.name}
            </label>
            {selectedTests.some((t) => t.testType === test.name) && (
              <select
                value={
                  selectedTests.find((t) => t.testType === test.name)
                    ?.priority || "Normal"
                }
                onChange={(e) => handlePriorityChange(e, test.name)}
                className="border border-gray-300 rounded p-1"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Routine">Routine</option>
              </select>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={handleUpdateQR}
        className="w-full bg-blue-950 rounded-full"
      >
        Add Tests
      </Button>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleBack}
          className="bg-gray-400 rounded-full w-full"
        >
          Back
        </Button>
        <Button
          onClick={handleMedication}
          className="bg-blue-500 rounded-full w-full"
        >
          Add Medication
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

export default LabTest_04;
