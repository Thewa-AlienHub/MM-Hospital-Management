import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Importing the Chart.js auto package

const PeakTimeAnalysis = () => {
  const [appointments, setAppointments] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [error, setError] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Store appointments for the selected date

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/AppointmentTimes/AppointmentTimes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent for verification
          },
        });
        console.log('Appointments:', res.data);  // Log data to inspect the response
        setAppointments(res.data);

        // Group appointments by hour for the chart
        const groupedByHour = groupAppointmentsByHour(res.data);
        setHourlyData(groupedByHour);
      } catch (err) {
        setError('Could not fetch appointments');
        console.error(err);
      }
    };
    
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


  // Function to group appointments by hour
  const groupAppointmentsByHour = (appointments) => {
    const hours = Array(24).fill(0); // Create an array with 24 entries, each initialized to 0 (for 24 hours)
    appointments.forEach((appointment) => {
      const hour = parseInt(appointment.AppointmentTime.split(':')[0], 10); // Extract the hour part
      hours[hour] += 1; // Increment the count for this hour
    });
    return hours;
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date); // Set the selected date
  
    // Log the selected date to verify
    console.log('Selected Date:', date);
  
    // Filter appointments for the selected date
    const filtered = appointments.filter(appointment => {
      // Parse the appointment date, converting it to a local date object
      const appointmentDate = new Date(appointment.AppointmentDate);
      
      // Get just the date part of both dates for comparison
      const formattedSelectedDate = new Date(date);
      
      // Compare only the date parts (year, month, day)
      return (
        appointmentDate.getFullYear() === formattedSelectedDate.getFullYear() &&
        appointmentDate.getMonth() === formattedSelectedDate.getMonth() &&
        appointmentDate.getDate() === formattedSelectedDate.getDate()
      );
    });
  
    console.log('Filtered Appointments:', filtered); // Log the filtered appointments
  
    setFilteredAppointments(filtered); // Set the filtered appointments
  };
  
  

  // Prepare data for the chart
  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Labels for each hour
    datasets: [{
      label: 'Number of Appointments',
      data: hourlyData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      }
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-4 underline">Peak Time Analysis</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!appointments.length && !error && <div>Loading appointments...</div>}

      {appointments.length > 0 && (
        <div>
          {/* Date Search Section */}
          <div className="mb-8">
            <label htmlFor="appointment-date" className="block text-lg font-bold mb-2">Select Date:</label>
            <input 
              type="date" 
              id="appointment-date" 
              className="p-2 border border-gray-300 rounded w-full"
              value={selectedDate} 
              onChange={handleDateChange} 
            />
          </div>

           {/* Display number of appointments for the selected date */}
           {selectedDate && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2" style={{marginLeft:'-65%'}}>
                Appointments on {selectedDate} :- {filteredAppointments.length}
              </h2>
              <ul className="list-disc ml-5" style={{marginLeft:'-60%'}}>
                {filteredAppointments.map((appointment) => (
                  <li key={appointment._id}>Appointment ID: {appointment.AppointmentID} at {appointment.AppointmentTime}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Chart Section */}
          <div className="mb-8" style={{marginTop:"-1%"}}>
            <h2 className="text-xl font-bold mb-4">Hourly Appointment Distribution</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Table Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <table className="table-auto w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Appointment ID</th>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Appointment Date</th>
                  <th className="border px-4 py-2">Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="border px-4 py-2">{appointment.AppointmentID}</td>
                    <td className="border px-4 py-2">{appointment.UserID}</td>
                    <td className="border px-4 py-2">{formatDate(appointment.AppointmentDate)}</td>
                    <td className="border px-4 py-2">{appointment.AppointmentTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeakTimeAnalysis;
