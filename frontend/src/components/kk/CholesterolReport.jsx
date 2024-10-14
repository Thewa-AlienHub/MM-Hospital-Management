import React, { useState } from 'react';

// Create a reusable input component
const InputField = ({ label, name, value, onChange, referenceValue, unit }) => (
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">{label}</td>
    <td className="border border-gray-300 px-4 py-2">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </td>
    <td className="border border-gray-300 px-4 py-2">{referenceValue}</td>
    <td className="border border-gray-300 px-4 py-2">{unit}</td>
  </tr>
);

const CholesterolReport = ({ data }) => {
  const [results, setResults] = useState({
    totalCholesterol: '',
    hdl: '',
    ldl: '',
    triglycerides: '',
    vldl: '',
  });

  // State to track form submission and editing
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState(null); 
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResults((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newCholesterolReportData = {
      ...results,
      ID: data.ID,
      Name: data.Name,
    };
  
    try {
      // Check if `reportId` is present to update; otherwise, create a new report
      const endpoint = reportId
        ? `/api/cholesterolreport/editCholesterolReport/${reportId}`
        : '/api/cholesterolreport/addCholesterolReport';
  
      const method = reportId ? 'PUT' : 'POST';
  
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCholesterolReportData),
      });
  
      if (res.ok) {
        alert(`Cholesterol report ${reportId ? 'updated' : 'submitted'} successfully!`);
        fetchLastReport();
        setSubmitted(true); // Flag as submitted
      } else {
        const errorMsg = await res.text(); // Extract error response from backend
        console.error('Server error:', errorMsg);
        alert('Failed to submit cholesterol report.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report.');
    }
  };
  
  // When fetching and editing
  const handleEdit = async () => {
    await fetchLastReport();
    setSubmitted(false); // Ensure form is editable
  };
  
  // Make sure your fetchLastReport works correctly to get the latest data
  const fetchLastReport = async () => {
    try {
      const res = await fetch(`/api/cholesterolreport/getLatestCholesterolReport/${data.ID}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setResults({
          totalCholesterol: fetchedData.totalCholesterol || '',
          hdl: fetchedData.hdl || '',
          ldl: fetchedData.ldl || '',
          triglycerides: fetchedData.triglycerides || '',
          vldl: fetchedData.vldl || '',
        });
        setReportId(fetchedData._id); // Set reportId for future updates
      } else {
        const errorMsg = await res.text(); // Capture server response
        console.error('Failed to fetch report:', errorMsg);
        alert('Failed to fetch the last report.');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      alert('An error occurred while fetching the report.');
    }
  };
  

  

  const handleDelete = async () => {
    if (!reportId) {
        alert('No report to delete!'); // Alert if there is no report to delete
        return;
    }
    
    try {
        const res = await fetch(`/api/cholesterolreport/deleteCholesterolReport/${reportId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            console.log('Record deleted successfully');
            alert('Cholesterol report deleted successfully!'); // User feedback
            setResults({
                totalCholesterol: '',
                hdl: '',
                ldl: '',
                triglycerides: '',
                vldl: '',
            });
            setSubmitted(false); // Reset the submitted state
            setReportId(null); // Reset reportId after deletion
        } else {
            alert('Failed to delete cholesterol report. Please try again.'); // Handle failure
        }
    } catch (error) {
        console.error('Error deleting report:', error);
        alert('An error occurred while trying to delete the report.'); // Handle errors
    }
};

  
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Cholesterol Report</h2>

      {submitted ? (
        // Display submitted data in a static table
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Test</th>
              <th className="border border-gray-300 px-4 py-2">Result</th>
              <th className="border border-gray-300 px-4 py-2">Reference Value</th>
              <th className="border border-gray-300 px-4 py-2">Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Total Cholesterol</td>
              <td className="border border-gray-300 px-4 py-2">{results.totalCholesterol}</td>
              <td className="border border-gray-300 px-4 py-2">Less than 200</td>
              <td className="border border-gray-300 px-4 py-2">mg/dL</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">HDL (High-Density Lipoprotein)</td>
              <td className="border border-gray-300 px-4 py-2">{results.hdl}</td>
              <td className="border border-gray-300 px-4 py-2">40-60</td>
              <td className="border border-gray-300 px-4 py-2">mg/dL</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">LDL (Low-Density Lipoprotein)</td>
              <td className="border border-gray-300 px-4 py-2">{results.ldl}</td>
              <td className="border border-gray-300 px-4 py-2">Less than 100</td>
              <td className="border border-gray-300 px-4 py-2">mg/dL</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Triglycerides</td>
              <td className="border border-gray-300 px-4 py-2">{results.triglycerides}</td>
              <td className="border border-gray-300 px-4 py-2">Less than 150</td>
              <td className="border border-gray-300 px-4 py-2">mg/dL</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">VLDL (Very Low-Density Lipoprotein)</td>
              <td className="border border-gray-300 px-4 py-2">{results.vldl}</td>
              <td className="border border-gray-300 px-4 py-2">5-40</td>
              <td className="border border-gray-300 px-4 py-2">mg/dL</td>
            </tr>
          </tbody>
        </table>
      ) : (
        // Display form with input fields
        <form onSubmit={handleSubmit}>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Test</th>
                <th className="border border-gray-300 px-4 py-2">Result</th>
                <th className="border border-gray-300 px-4 py-2">Reference Value</th>
                <th className="border border-gray-300 px-4 py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              <InputField
                label="Total Cholesterol"
                name="totalCholesterol"
                value={results.totalCholesterol}
                onChange={handleInputChange}
                referenceValue="Less than 200"
                unit="mg/dL"
              />
              <InputField
                label="HDL (High-Density Lipoprotein)"
                name="hdl"
                value={results.hdl}
                onChange={handleInputChange}
                referenceValue="40-60"
                unit="mg/dL"
              />
              <InputField
                label="LDL (Low-Density Lipoprotein)"
                name="ldl"
                value={results.ldl}
                onChange={handleInputChange}
                referenceValue="Less than 100"
                unit="mg/dL"
              />
              <InputField
                label="Triglycerides"
                name="triglycerides"
                value={results.triglycerides}
                onChange={handleInputChange}
                referenceValue="Less than 150"
                unit="mg/dL"
              />
              <InputField
                label="VLDL (Very Low-Density Lipoprotein)"
                name="vldl"
                value={results.vldl}
                onChange={handleInputChange}
                referenceValue="5-40"
                unit="mg/dL"
              />
            </tbody>
          </table>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Submit Report
          </button>
        </form>
      )}

      {submitted && (
        <div className="mt-4">
          <button onClick={handleEdit} className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Edit
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CholesterolReport;
