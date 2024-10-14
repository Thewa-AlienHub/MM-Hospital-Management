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

const AngiographyReport = ({ data }) => {
  console.log('angiograpgy');
  
  const [results, setResults] = useState({
    PAB: '',
    BVD: '',
    BFV: '',
    FFR: '',
    BPA: '',
    EF: '',
    Aneurysm: '',
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
  
    const newAngiographyReportData = {
      ...results,
      ID: data.ID,
      Name: data.Name,
    };
  
    try {
      // Check if `reportId` is present to update; otherwise, create a new report
      const endpoint = reportId
        ? `/api/angiographyreport/editAngiographyReport/${reportId}`
        : '/api/angiographyreport/addAngiographyReport';
  
      const method = reportId ? 'PUT' : 'POST';
  
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAngiographyReportData),
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
      const res = await fetch(`/api/angiographyreport/getLatestAngiographyReport/${data.ID}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setResults({
            PAB: fetchedData.PAB || '',
            BVD: fetchedData.BVD || '',
            BFV: fetchedData.BFV || '',
            FFR: fetchedData.FFR || '',
            BPA: fetchedData.BPA || '',
            EF: fetchedData.EF || '',
            Aneurysm: fetchedData.Aneurysm || '',
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
        const res = await fetch(`/api/angiographyreport/deleteAngiographyReport/${reportId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            console.log('Record deleted successfully');
            alert('Angiography report deleted successfully!'); // User feedback
            setResults({
                PAB: '',
                BVD: '',
                BFV: '',
                FFR: '',
                BPA: '',
                EF: '',
                Aneurysm: '',
            });
            setSubmitted(false); // Reset the submitted state
            setReportId(null); // Reset reportId after deletion
        } else {
            alert('Failed to delete Angiography report. Please try again.'); // Handle failure
        }
    } catch (error) {
        console.error('Error deleting report:', error);
        alert('An error occurred while trying to delete the report.'); // Handle errors
    }
};

  
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Angiography Report</h2>

      {submitted ? (
        // Display submitted data in a static table
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Test</th>
              <th className="border border-gray-300 px-4 py-2">Result</th>
              <th className="border border-gray-300 px-4 py-2">Lowest Value</th>
              <th className="border border-gray-300 px-4 py-2">Highest Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Percentage of Arterial Blockage (Stenosis)</td>
              <td className="border border-gray-300 px-4 py-2">{results.PAB}</td>
              <td className="border border-gray-300 px-4 py-2">0% - No blockage</td>
              <td className="border border-gray-300 px-4 py-2">100% -Complete blockage</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Blood Vessel Diameter (mm)</td>
              <td className="border border-gray-300 px-4 py-2">{results.BVD}</td>
              <td className="border border-gray-300 px-4 py-2">~2 mm (smallest detectable arteries)</td>
              <td className="border border-gray-300 px-4 py-2">20-30 mm (large arteries like the aorta)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Blood Flow Velocity (cm/s)</td>
              <td className="border border-gray-300 px-4 py-2">{results.BFV}</td>
              <td className="border border-gray-300 px-4 py-2">0 cm/s (no blood flow, occlusion)</td>
              <td className="border border-gray-300 px-4 py-2">~200 cm/s (high velocity due to stenosis)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Fractional Flow Reserve (FFR)</td>
              <td className="border border-gray-300 px-4 py-2">{results.FFR}</td>
              <td className="border border-gray-300 px-4 py-2">0 (no blood flow)</td>
              <td className="border border-gray-300 px-4 py-2">1 (normal blood flow)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Blood Pressure in Arteries (mmHg)</td>
              <td className="border border-gray-300 px-4 py-2">{results.BPA}</td>
              <td className="border border-gray-300 px-4 py-2">0 mmHg (no flow)</td>
              <td className="border border-gray-300 px-4 py-2">~180-200 mmHg (severe hypertension)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Ejection Fraction (for cardiac angiograms)</td>
              <td className="border border-gray-300 px-4 py-2">{results.EF}</td>
              <td className="border border-gray-300 px-4 py-2">0-30% (severely reduced function)</td>
              <td className="border border-gray-300 px-4 py-2">70% (normal/hyperdynamic)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Aneurysm Size (cm)</td>
              <td className="border border-gray-300 px-4 py-2">{results.Aneurysm}</td>
              <td className="border border-gray-300 px-4 py-2">~1-2 cm (small aneurysm)</td>
              <td className="border border-gray-300 px-4 py-2">5-6 cm (high risk of rupture)</td>
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
                <th className="border border-gray-300 px-4 py-2">Lowest Value</th>
                <th className="border border-gray-300 px-4 py-2">Highest Value</th>
              </tr>
            </thead>
            <tbody>
            <InputField
  label="Percentage of Arterial Blockage (Stenosis)"
  name="PAB"  // This should match the state key
  value={results.PAB}
  onChange={handleInputChange}
  referenceValue="0% - No blockage"
  unit="100% - Complete blockage"
/>
<InputField
  label="Blood Vessel Diameter (mm)"
  name="BVD"  // This should match the state key
  value={results.BVD}
  onChange={handleInputChange}
  referenceValue="~2 mm (smallest detectable arteries)"
  unit="20-30 mm (large arteries like the aorta)"
/>
<InputField
  label="Blood Flow Velocity (cm/s)"
  name="BFV"  // This should match the state key
  value={results.BFV}
  onChange={handleInputChange}
  referenceValue="0 cm/s (no blood flow, occlusion)"
  unit="~200 cm/s (high velocity due to stenosis)"
/>
<InputField
  label="Fractional Flow Reserve (FFR)"
  name="FFR"  // This should match the state key
  value={results.FFR}
  onChange={handleInputChange}
  referenceValue="0 (no blood flow)"
  unit="1 (normal blood flow)"
/>
<InputField
  label="Blood Pressure in Arteries (mmHg)"
  name="BPA"  // This should match the state key
  value={results.BPA}
  onChange={handleInputChange}
  referenceValue="0 mmHg (no flow)"
  unit="~180-200 mmHg (severe hypertension)"
/>
<InputField
  label="Ejection Fraction (for cardiac angiograms)"
  name="EF"  // This should match the state key
  value={results.EF}
  onChange={handleInputChange}
  referenceValue="0-30% (severely reduced function)"
  unit="70% (normal/hyperdynamic)"
/>
<InputField
  label="Aneurysm Size (cm)"
  name="Aneurysm"  // This should match the state key
  value={results.Aneurysm}
  onChange={handleInputChange}
  referenceValue="~1-2 cm (small aneurysm)"
  unit="5-6 cm (high risk of rupture)"
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

export default AngiographyReport;
