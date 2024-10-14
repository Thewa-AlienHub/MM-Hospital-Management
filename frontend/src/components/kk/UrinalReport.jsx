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
const InputFieldDropdown = ({ label, name, value, onChange, options, referenceValue, unit }) => (
    <tr>
      <td className="border border-gray-300 px-4 py-2 font-semibold">{label}</td>
      <td className="border border-gray-300 px-4 py-2">
        <select
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className="border border-gray-300 px-4 py-2">{referenceValue}</td>
      <td className="border border-gray-300 px-4 py-2">{unit}</td>
    </tr>
  );
  

const UrinalReport = ({ data }) => {
  console.log('angiograpgy');

  const optionsForColor = [
    { value: '', label: 'Select color' },
    { value: 'light_yellow', label: 'Light Yellow (Normal)' },
    { value: 'dark_yellow', label: 'Dark Yellow (Dehydration)' },
    { value: 'brown', label: 'Brown (Liver issues)' },
  ];
  const optionsForNegPos = [
    { value: '', label: 'Select' },
    { value: 'Negative', label: 'Negative' },
    { value: 'Positive', label: 'Positive' },
  ];

  
 
  
  const [results, setResults] = useState({
    color: '',
    PH: '',
    SpecificGravity: '',
    protein: '',
    Glucose: '',
    Ketones: '',
    LE: '',
    Nitrites: '',
    Bilirubin: '',
    Urobilinogen: '',
    RBC: '',
    WBC: '',
    Casts: '',
    Crystals: '',
    Bacteria: '',
    EC: '',
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
        ? `/api/urinalreport/editUrinalReport/${reportId}`
        : '/api/urinalreport/addUrinalReport';
  
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
      const res = await fetch(`/api/urinalreport/getLatestUrinalReport/${data.ID}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setResults({
            color: fetchedData.color || '',
            PH: fetchedData.PH || '',
            SpecificGravity: fetchedData.SpecificGravity || '',
            protein: fetchedData.protein || '',
            Glucose: fetchedData.Glucose || '',
            Ketones: fetchedData.Ketones || '',
            LE: fetchedData.LE || '',
            Nitrites: fetchedData.Nitrites || '',
            Bilirubin: fetchedData.Bilirubin || '',
            Urobilinogen: fetchedData.Urobilinogen || '',
            RBC: fetchedData.RBC || '',
            WBC: fetchedData.WBC || '',
            Casts: fetchedData.Casts || '',
            Crystals: fetchedData.Crystals || '',
            Bacteria: fetchedData.Bacteria || '',
            EC: fetchedData.EC || '',
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
        const res = await fetch(`/api/urinalreport/deleteUrinalReport/${reportId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            console.log('Record deleted successfully');
            alert('Angiography report deleted successfully!'); // User feedback
            setResults({
                color: '',
                PH: '',
                SpecificGravity: '',
                protein: '',
                Glucose: '',
                Ketones: '',
                LE: '',
                Nitrites: '',
                Bilirubin: '',
                Urobilinogen: '',
                RBC: '',
                WBC: '',
                Casts: '',
                Crystals: '',
                Bacteria: '',
                EC: '',
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
      <h2 className="text-2xl font-semibold mb-4">Urinal Report</h2>

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
    <td className="border border-gray-300 px-4 py-2 font-semibold">Color</td>
    <td className="border border-gray-300 px-4 py-2">{results.color}</td>
    <td className="border border-gray-300 px-4 py-2">Light yellow (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Dark yellow/brown (dehydration/liver issues)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">pH</td>
    <td className="border border-gray-300 px-4 py-2">{results.PH}</td>
    <td className="border border-gray-300 px-4 py-2">4.5 (acidic)</td>
    <td className="border border-gray-300 px-4 py-2">8.0 (alkaline)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Specific Gravity</td>
    <td className="border border-gray-300 px-4 py-2">{results.SpecificGravity}</td>
    <td className="border border-gray-300 px-4 py-2">1.005 (hydrated)</td>
    <td className="border border-gray-300 px-4 py-2">1.030 (dehydrated)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Protein</td>
    <td className="border border-gray-300 px-4 py-2">{results.protein}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (kidney issues)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Glucose</td>
    <td className="border border-gray-300 px-4 py-2">{results.Glucose}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (diabetes)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Ketones</td>
    <td className="border border-gray-300 px-4 py-2">{results.Ketones}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (diabetes or fasting)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Leukocyte Esterase (LE)</td>
    <td className="border border-gray-300 px-4 py-2">{results.LE}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (infection)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Nitrites</td>
    <td className="border border-gray-300 px-4 py-2">{results.Nitrites}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (bacterial infection)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Bilirubin</td>
    <td className="border border-gray-300 px-4 py-2">{results.Bilirubin}</td>
    <td className="border border-gray-300 px-4 py-2">Negative (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (liver issues)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Urobilinogen</td>
    <td className="border border-gray-300 px-4 py-2">{results.Urobilinogen}</td>
    <td className="border border-gray-300 px-4 py-2">0.1-1.0 mg/dL (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Increased (liver disease)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">RBC (Red Blood Cells)</td>
    <td className="border border-gray-300 px-4 py-2">{results.RBC}</td>
    <td className="border border-gray-300 px-4 py-2">0-2 HPF (normal)</td>
    <td className="border border-gray-300 px-4 py-2">5 HPF (blood in urine)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">WBC (White Blood Cells)</td>
    <td className="border border-gray-300 px-4 py-2">{results.WBC}</td>
    <td className="border border-gray-300 px-4 py-2">0-5 HPF (normal)</td>
    <td className="border border-gray-300 px-4 py-2">10 HPF (infection)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Casts</td>
    <td className="border border-gray-300 px-4 py-2">{results.Casts}</td>
    <td className="border border-gray-300 px-4 py-2">None (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Positive (kidney disease)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Crystals</td>
    <td className="border border-gray-300 px-4 py-2">{results.Crystals}</td>
    <td className="border border-gray-300 px-4 py-2">None (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Present (kidney stones)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Bacteria</td>
    <td className="border border-gray-300 px-4 py-2">{results.Bacteria}</td>
    <td className="border border-gray-300 px-4 py-2">None (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Present (infection)</td>
  </tr>
  <tr>
    <td className="border border-gray-300 px-4 py-2 font-semibold">Epithelial Cells</td>
    <td className="border border-gray-300 px-4 py-2">{results.EC}</td>
    <td className="border border-gray-300 px-4 py-2">Few (normal)</td>
    <td className="border border-gray-300 px-4 py-2">Many (contamination or infection)</td>
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
                <th className="border border-gray-300 px-4 py-2">Good</th>
                <th className="border border-gray-300 px-4 py-2">Bad</th>
              </tr>
            </thead>
            <tbody>
    <InputFieldDropdown
    label="Color"
    name="color"  // This should match the state key
    value={results.color}
    onChange={handleInputChange}
    options={optionsForColor}
    referenceValue="Light yellow (normal)"
    unit="Dark yellow/brown (dehydration/liver issues)"
    />
    <InputField
    label="pH"
    name="PH"  // This should match the state key
    value={results.PH}
    onChange={handleInputChange}
    referenceValue="4.5 (acidic)"
    unit="8.0 (alkaline)"
    />
    <InputField
    label="Specific Gravity"
    name="SpecificGravity"  // This should match the state key
    value={results.SpecificGravity}
    onChange={handleInputChange}
    referenceValue="1.005 (hydrated)"
    unit="1.030 (dehydrated)"
    />
    <InputFieldDropdown
    label="Protein"
    name="protein"  // This should match the state key
    value={results.protein}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (kidney issues)"
    />
  
    <InputFieldDropdown
    label="Glucose"
    name="Glucose"  // This should match the state key
    value={results.Glucose}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (diabetes)"
    />
    <InputFieldDropdown
    label="Ketones"
    name="Ketones"  // This should match the state key
    value={results.Ketones}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (diabetes or fasting)"
    />
    <InputFieldDropdown
    label="Leukocyte Esterase (LE)"
    name="LE"  // This should match the state key
    value={results.LE}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (infection)"
    />
    <InputFieldDropdown
    label="Nitrites"
    name="Nitrites"  // This should match the state key
    value={results.Nitrites}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (bacterial infection)"
    />
    <InputFieldDropdown
    label="Bilirubin"
    name="Bilirubin"  // This should match the state key
    value={results.Bilirubin}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="Negative (normal)"
    unit="Positive (liver issues)"
    />
    <InputField
    label="Urobilinogen"
    name="Urobilinogen"  // This should match the state key
    value={results.Urobilinogen}
    onChange={handleInputChange}
    referenceValue="0.1-1.0 mg/dL (normal)"
    unit="Increased (liver disease)"
    />
    <InputField
    label="RBC (Red Blood Cells)"
    name="RBC"  // This should match the state key
    value={results.RBC}
    onChange={handleInputChange}
    referenceValue="0-2 HPF (normal)"
    unit=">5 HPF (blood in urine)"
    />
    <InputField
    label="WBC (White Blood Cells)"
    name="WBC"  // This should match the state key
    value={results.WBC}
    onChange={handleInputChange}
    referenceValue="0-5 HPF (normal)"
    unit=">10 HPF (infection)"
    />
    <InputFieldDropdown
    label="Casts"
    name="Casts"  // This should match the state key
    value={results.Casts}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="None (normal)"
    unit="Positive (kidney disease)"
    />
    <InputFieldDropdown
    label="Crystals"
    name="Crystals"  // This should match the state key
    value={results.Crystals}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="None (normal)"
    unit="Present (kidney stones)"
    />
    <InputFieldDropdown
    label="Bacteria"
    name="Bacteria"  // This should match the state key
    value={results.Bacteria}
    onChange={handleInputChange}
    options={optionsForNegPos}
    referenceValue="None (normal)"
    unit="Present (infection)"
    />
    <InputField
    label="Epithelial Cells"
    name="EC"  // This should match the state key
    value={results.EC}
    onChange={handleInputChange}
    referenceValue="Few (normal)"
    unit="Many (contamination or infection)"
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

export default UrinalReport;
