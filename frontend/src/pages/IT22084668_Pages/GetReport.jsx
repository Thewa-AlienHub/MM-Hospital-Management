import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import toast if you're using react-toastify
import BloodReport from '../../components/kk/BloodReport'; // Ensure this import is correct
import BloodPressureReport from "../../components/kk/BloodPressureReport"
import CholesterolReport from '../../components/kk/CholesterolReport';
import AngiographyReport from '../../components/kk/AngiographyReport';
import UrinalReport from '../../components/kk/UrinalReport';

const GetReport = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [selectedOption, setSelectedOption] = useState(''); // Initially empty to show default
  const [reportData, setReportData] = useState(null); // State to hold fetched report data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [options, setOptions] = useState([]); // State for dropdown options

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value); // Update selected option
  };

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const res = await fetch(`/api/test/getTestByID/${id}`); // Replace with your actual API endpoint
        const data = await res.json();

        if (res.ok) {
          setReportData(data.data);
          toast.success("Data fetched successfully");

          // Generate options based on boolean flags
          const generatedOptions = [];
          if (data.data.isBlood) generatedOptions.push('Blood Test');
          if (data.data.isCholesterol) generatedOptions.push('Cholesterol');
          if (data.data.isBloodPressure) generatedOptions.push('Blood Pressure');
          if (data.data.isUrinals) generatedOptions.push('Urinalysis');
          if (data.data.isAngiography) generatedOptions.push('Angiography');
          if (data.data.isMri) generatedOptions.push('MRI');
          if (data.data.isXray) generatedOptions.push('Xray');

          setOptions(generatedOptions); // Set the options for the dropdown
        } else {
          toast.error(data.message || "Failed to fetch data");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    handleFetchData(); // Call the function here
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  // Map selected option to the corresponding component
  const renderSelectedComponent = () => {
    
    const personalData = {ID:id,Name:reportData.Name}
    switch (selectedOption) {
      case 'Blood Test':
        return <BloodReport data={personalData}/>; // Render Blood Test component
      case 'Cholesterol':
        return <CholesterolReport  data={personalData}/>; // Render Cholesterol Test component (imported)
      case 'Blood Pressure':
        return <BloodPressureReport  data={personalData}/>; // Render Blood Pressure component
      case 'Urinalysis':
        return <UrinalReport data={personalData}/>; // Render Urinalysis component
      case 'Angiography':
        return <AngiographyReport data={personalData}/>; // Render Angiography component
      case 'MRI':
        return <MriTest />; // Render MRI component
      case 'Xray':
        return <XrayTest />; // Render Xray component
      default:
        return <p>Please select a test from the dropdown.</p>; // Default case
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">

        {/* Card for displaying Name and ID */}
        {reportData && (
          <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-md">
            <h2 className="text-xl font-semibold">Report Details</h2>
            <p><strong>Name:</strong> {reportData.Name}</p>
            <p><strong>ID:</strong> {reportData.ID}</p>
          </div>
        )}

        <h1 className="text-3xl font-semibold text-center mb-4">Data Entry Table</h1>

        {/* Dropdown for selecting options */}
        <div className="mb-4">
          <label htmlFor="options" className="mr-2 font-medium text-gray-700">
            Choose a test among required tests
          </label>
          <select
            id="options"
            value={selectedOption}
            onChange={handleDropdownChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a test</option> {/* Default disabled option */}
            {options.length > 0 ? (
              options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))
            ) : (
              <option value="" disabled>No available tests</option>
            )}
          </select>
        </div>

        {/* Render the selected component based on the dropdown choice */}
        {renderSelectedComponent()}

      </div>
    </div>
  );
};

export default GetReport;
