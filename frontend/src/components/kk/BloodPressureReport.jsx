import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Card } from 'flowbite-react';

const BloodPressureReport = ({ data }) => {
  const [results, setResults] = useState({
    Systolic: '',
    Diastolic: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Edit mode toggle
  const ID = data.ID; 
  const Name = data.Name;
  const [Systolic,setSystolic] = useState('');
  const [Diastolic,setDiastolic] = useState('');


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResults((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit');
    

    const { Systolic, Diastolic } = results;

    if (!Systolic || !Diastolic) {
      setError('Please fill out both systolic and diastolic values');
      return;
    }
    if (isNaN(Systolic) || isNaN(Diastolic)) {
      setError('Values must be numbers');
      return;
    }

    setError(null);

    const newBloodPressureReportData = {
      ID,
      Name,
      ...results,
    };

    try {
      const requestUrl = reportId 
        ? `/api/bloodpressurereport/updateBloodPressureReport/${reportId}` 
        : '/api/bloodpressurereport/addBloodPressureReport';

      const method = reportId ? 'PUT' : 'POST';
      const res = await fetch(requestUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBloodPressureReportData),
      });

      if (res.ok) {
        console.log('success');
        
        alert(`Blood pressure report ${reportId ? 'updated' : 'submitted'} successfully!`);
        setSubmitted(true);
        setResults({ Systolic: '', Diastolic: '' }); // Clear the form after submission
        setSystolic(Systolic);
        setDiastolic(Diastolic);
        setIsEditMode(false); // Reset edit mode after submission
      } else {
        const errorMsg = await res.text();
        console.error('Failed to save data:', errorMsg);
        alert('Failed to save blood pressure report.');
      }
    } catch (error) {
      console.error('Error while saving data:', error);
      alert('An error occurred while saving the data.');
    }
  };

  // Fetch the latest report for this ID
  const fetchLastReport = async () => {
    console.log('fetch last report');
    
    try {
      const res = await fetch(`/api/bloodpressurereport/getLatestBloodPressureReport/${ID}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setResults({
          Systolic: fetchedData.Systolic || '',
          Diastolic: fetchedData.Diastolic || '',
        });
        setReportId(fetchedData._id); // Set reportId for future updates
      } else {
        const errorMsg = await res.text();
        console.error('Failed to fetch report:', errorMsg);
        alert('Failed to fetch the last report.');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      alert('An error occurred while fetching the report.');
    }
  };

  // Handle edit functionality
  const handleEdit = () => {
    console.log('handle edit');
    
    setIsEditMode(true); // Enable edit mode
    setSubmitted(false); // Allow resubmission
    fetchLastReport(); // Refill the form with the last data
  };

  // Handle delete functionality
  const handleDelete = async () => {
    if (!reportId) {
      alert('No report to delete!');
      return;
    }
    try {
      const res = await fetch(`/api/bloodpressurereport/deleteBloodPressureReport/${reportId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Blood pressure report deleted successfully!');
        setResults({ Systolic: '', Diastolic: '' }); // Reset the form
        setSubmitted(false); // Reset the submitted state
        setReportId(null); // Reset reportId after deletion
      } else {
        alert('Failed to delete blood pressure report. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting report:', error.message);
      alert('An error occurred while deleting the report.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Card className="absolute left-1/2 transform -translate-x-1/2 top-20 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Blood Pressure Tracker</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="systolic" value="Systolic (mmHg)" />
            <TextInput
              id="systolic"
              name="Systolic"
              type="text"
              placeholder="Enter systolic"
              value={results.Systolic}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="diastolic" value="Diastolic (mmHg)" />
            <TextInput
              id="diastolic"
              name="Diastolic"
              type="text"
              placeholder="Enter diastolic"
              value={results.Diastolic}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">{submitted ? 'Submit':'Update'}</Button>
        </form>

        {submitted && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Blood Pressure Reading:</h2>
            <p className="mt-2">Systolic: {Systolic} mmHg</p>
            <p>Diastolic: {Diastolic} mmHg</p>
            <div className="flex justify-between mt-4">
              <Button onClick={handleEdit} className="w-1/2 mr-2" color="light">
                Edit
              </Button>
              <Button onClick={handleDelete} className="w-1/2 ml-2" color="failure">
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BloodPressureReport;
