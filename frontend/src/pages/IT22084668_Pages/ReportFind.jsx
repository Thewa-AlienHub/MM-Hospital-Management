import React, { useState, useEffect } from 'react';

import {
  fetchAllBloodReports,
  fetchAllUrinalReportsById,
  fetchAllBloodReportsById,
  fetchAllAngiographyReportsById,
  fetchAllBloodPressureReportsById,
  fetchAllCholesterolReportsById,
  fetchAllAngiographyReports,
  fetchAllBloodPressureReports,
  fetchAllCholesterolReports,
  fetchAllUrinalReports
} from '../services/IT22084668_front/reportService.js'

const ReportFind = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [reportType,setReportType] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    ID: '',
    date: '',
    reportType: '',
  });

  const reportTypes = ['Blood Test', 'Urine Test', 'Blood Pressure','Angiography','Cholesterol','X-ray', 'MRI']; // Replace with actual report types

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  const handleFilterReports = () => {
    const { ID, date, reportType } = filterCriteria;
  
    // Set selectedType based on the report type
    const selectedType = reportType;
  
    if (ID.trim() !== '') {
      handleIDInput(ID, selectedType);
    } else {
      handleEmptyIDInput(selectedType); // Pass selectedType to handleEmptyIDInput
    }
  
    // Apply additional filters
    const filtered = reports.filter((report) =>
      (ID === '' || report.ID.includes(ID)) &&
      (date === '' || report.date.includes(date)) &&
      (reportType === '' || report.reportType === reportType)
    );
  
    setFilteredReports(filtered);
  };
  
  const handleIDInput = (id, selectedType) => {
    switch (selectedType) {
      case 'Blood Test':
        fetchAllBloodReportsById(id).then((data) => {
          if (Array.isArray(data)) {
            setFilteredReports(data);
          } else {
            setFilteredReports([]);
          }
        });
        break;
      case 'Blood Pressure':
        fetchAllBloodPressureReportsById(id).then((data) => {
          if (Array.isArray(data)) {
            setFilteredReports(data);
          } else {
            setFilteredReports([]);
          }
        });
        break;
      case 'Angiography':
        fetchAllAngiographyReportsById(id).then((data) => {
          if (Array.isArray(data)) {
            setFilteredReports(data);
          } else {
            setFilteredReports([]);
          }
        });
        break;
      case 'Cholesterol':
        fetchAllCholesterolReportsById(id).then((data) => {
          if (Array.isArray(data)) {
            setFilteredReports(data);
          } else {
            setFilteredReports([]);
          }
        });
        break;
      case 'Urine Test':
        fetchAllUrinalReportsById(id).then((data) => {
          if (Array.isArray(data)) {
            setFilteredReports(data);
          } else {
            setFilteredReports([]);
          }
        });
        break;
      default:
        console.log('Nothing');
        break;
    }
  };

  const handleEmptyIDInput = (selectedType) => {
    switch (selectedType) {
      case 'Blood Test':
        fetchAllBloodReports().then((data) => {
          setReports(data);
          setFilteredReports(data);
        });
        break;
      case 'Angiography':
        fetchAllAngiographyReports().then((data) => {
          setReports(data);
          setFilteredReports(data);
        });
        break;
      case 'Blood Pressure':
        fetchAllBloodPressureReports().then((data) => {
          setReports(data);
          setFilteredReports(data);
        });
        break;
      case 'Urine Test':
        fetchAllUrinalReports().then((data) => {
          setReports(data);
          setFilteredReports(data);
        });
        break;
      case 'Cholesterol':
        fetchAllCholesterolReports().then((data) => {
          setReports(data);
          setFilteredReports(data);
        });
        break;
      default:
        console.log('No');
        break;
    }
  };
  
  
  

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-6">Find Reports</h1>

      {/* Filter inputs */}
      <div className="mb-6 flex flex-row space-x-4">
        <input
          type="text"
          name="ID"
          value={filterCriteria.ID}
          onChange={handleFilterChange}
          placeholder="Filter by ID"
          className="border p-2 rounded-lg w-1/3"
        />
        <input
          type="date"
          name="date"
          value={filterCriteria.date}
          onChange={handleFilterChange}
          className="border p-2 rounded-lg w-1/3"
        />
        <select
          name="reportType"
          value={filterCriteria.reportType}
          onChange={handleFilterChange}
          className="border p-2 rounded-lg w-1/3"
        >
          <option value="">Filter by Report Type</option>
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFilterReports}
        className="bg-blue-500 text-white p-2 rounded-lg mt-4"
      >
        Find Reports
      </button>

      {/* Display filtered reports */}
      <div className="grid grid-cols-1 gap-6 mt-6 w-full max-w-4xl">
        {filteredReports.map((report) => (
          <div key={report.ID} className="flex border p-6 rounded-lg shadow-lg w-full">
            <div className="flex flex-row justify-between w-full">
              <div className="flex-1">
                <p><strong>ID:</strong> {report.ID}</p>
              </div>
              <div className="flex-1">
                <p><strong>Name:</strong> {report.Name}</p>
              </div>
              <div className="flex-1">
                <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportFind;
