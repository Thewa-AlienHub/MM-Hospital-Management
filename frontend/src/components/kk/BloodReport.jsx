import React, { useState } from 'react';

const BloodReport = ({data}) => {
  // Initialize state for each input field
  console.log(data,data.ID,data.Name);
  
  const [results, setResults] = useState({
    hemoglobin: '',
    rbcCount: '',
    pcv: '',
    mcv: '',
    mch: '',
    mchc: '',
    rdw: '',
    wbcCount: '',
    neutrophils: '',
    lymphocytes: '',
    eosinophils: '',
    monocytes: '',
    basophils: '',
    absNeutrophils: '',
    absLymphocytes: '',
    absEosinophils: '',
    absMonocytes: '',
    absBasophils: '',
    platelets: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResults((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const isValid = Object.values(results).every(value => !isNaN(value) && value.trim() !== '');
  
    if (isValid) {
      // Prepare data for submission
      const newBloodReportData = {
        ...results, // Include all results from the form
        ID: data.ID,
        Name: data.Name,
      };
  
      try {
        // Submit data to create a new document
        const res = await fetch('/api/bloodreport/addBloodReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBloodReportData), // Sending the data as a new document
        });
  
        // Handle the response
        if (res.ok) {
          const responseData = await res.json();
          console.log('Response from server:', responseData);
          alert('Blood report submitted successfully!');
  
          // Optionally reset the form after submission
          setResults({
            hemoglobin: '',
            rbcCount: '',
            pcv: '',
            mcv: '',
            mch: '',
            mchc: '',
            rdw: '',
            wbcCount: '',
            neutrophils: '',
            lymphocytes: '',
            eosinophils: '',
            monocytes: '',
            basophils: '',
            absNeutrophils: '',
            absLymphocytes: '',
            absEosinophils: '',
            absMonocytes: '',
            absBasophils: '',
            platelets: '',
          });
        } else {
          // Handle error response
          const errorData = await res.json();
          console.error('Error submitting blood report:', errorData);
          alert('Failed to submit blood report. Please try again later.');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('An error occurred while submitting the blood report. Please try again later.');
      }
    } else {
      alert('Please fill in all fields with valid numbers.');
    }
  };
  

  return (
    <div className="overflow-x-auto">
    <form onSubmit={handleSubmit} className="overflow-x-auto">
      <h2 className="text-center font-bold text-lg mb-4">
        Complete Blood Count (CBC) with Absolute Count
      </h2>
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Investigation</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Reference Value</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Unit</th>
          </tr>
        </thead>
        <tbody>
          {/* Primary Sample */}
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Primary Sample Type</td>
            <td className="border border-gray-300 px-4 py-2">Blood</td>
            <td className="border border-gray-300 px-4 py-2"></td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>

          {/* Hemoglobin */}
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Hemoglobin (Hb)</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="hemoglobin"
                value={results.hemoglobin}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">13.0 - 17.0</td>
            <td className="border border-gray-300 px-4 py-2">g/dL</td>
          </tr>

          {/* RBC Count */}
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Total RBC count</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="rbcCount"
                value={results.rbcCount}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">4.5 - 5.5</td>
            <td className="border border-gray-300 px-4 py-2">mill/cumm</td>
          </tr>

          {/* Blood Indices */}
          <tr className="bg-gray-100">
            <td colSpan={4} className="border border-gray-300 px-4 py-2 font-bold">
              Blood Indices
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Packed Cell Volume (PCV)</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="pcv"
                value={results.pcv}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">40 - 50</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Mean Corpuscular Volume (MCV)</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="mcv"
                value={results.mcv}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">83 - 101</td>
            <td className="border border-gray-300 px-4 py-2">fL</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">MCH</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="mch"
                value={results.mch}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">27 - 32</td>
            <td className="border border-gray-300 px-4 py-2">pg</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">MCHC</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="mchc"
                value={results.mchc}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">32.5 - 34.5</td>
            <td className="border border-gray-300 px-4 py-2">g/dL</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">RDW</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="rdw"
                value={results.rdw}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">11.6 - 14.0</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          {/* WBC Count */}
          <tr className="bg-gray-100">
            <td colSpan={4} className="border border-gray-300 px-4 py-2 font-bold">
              WBC Count
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Total WBC count</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="wbcCount"
                value={results.wbcCount}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">4000 - 11000</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          {/* Differential Count */}
          <tr className="bg-gray-100">
            <td colSpan={4} className="border border-gray-300 px-4 py-2 font-bold">
              Differential Count
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Neutrophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="neutrophils"
                value={results.neutrophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">50 - 62</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Lymphocytes</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="lymphocytes"
                value={results.lymphocytes}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">20 - 40</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Eosinophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="eosinophils"
                value={results.eosinophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">1 - 6</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Monocytes</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="monocytes"
                value={results.monocytes}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">2 - 10</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Basophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="basophils"
                value={results.basophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">0 - 1</td>
            <td className="border border-gray-300 px-4 py-2">%</td>
          </tr>

          {/* Absolute Count */}
          <tr className="bg-gray-100">
            <td colSpan={4} className="border border-gray-300 px-4 py-2 font-bold">
              Absolute Count
            </td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Absolute Neutrophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="absNeutrophils"
                value={results.absNeutrophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">2500 - 7000</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Absolute Lymphocytes</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="absLymphocytes"
                value={results.absLymphocytes}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">1500 - 4000</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Absolute Eosinophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="absEosinophils"
                value={results.absEosinophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">50 - 500</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Absolute Monocytes</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="absMonocytes"
                value={results.absMonocytes}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">100 - 1000</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Absolute Basophils</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="absBasophils"
                value={results.absBasophils}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">0 - 100</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>

          {/* Platelets */}
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Platelet count</td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="platelets"
                value={results.platelets}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">150000 - 450000</td>
            <td className="border border-gray-300 px-4 py-2">cells/cumm</td>
          </tr>
        </tbody>
      </table>
      <button 
        type="submit" 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit Report
      </button>
    </form>
    </div>
  );
};

export default BloodReport;
