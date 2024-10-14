import { useEffect, useState } from 'react';
import axios from 'axios';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [doctorData, setDoctorData] = useState({
    doctorID: '',
    doctorName: '',
    email: '',
    availableTimes: '',
    availableDays: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('/api/Doctors/Doctors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent for verification
          },
        });
        setDoctors(res.data);
      } catch (err) {
        setError('Could not fetch doctors');
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  // Handle updating existing doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editDoctor) {
      try {
        // Update doctor
        const res = await axios.put(`/api/Doctors/Doctors/${editDoctor._id}`, doctorData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDoctors(doctors.map((doc) => (doc._id === editDoctor._id ? res.data.updatedDoctor : doc)));
        setEditDoctor(null);
        setDoctorData({
          doctorID: '',
          doctorName: '',
          email: '',
          availableTimes: '',
          availableDays: ''
        });
      } catch (err) {
        console.error(err);
        setError('Could not update doctor');
      }
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Doctors/Doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete doctor');
    }
  };

  // Handle edit
  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setDoctorData({
      doctorID: doctor.doctorID,
      doctorName: doctor.doctorName,
      email: doctor.email,
      availableTimes: doctor.availableTimes.join(', '),
      availableDays: doctor.availableDays.join(', ')
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-10 underline">Doctor Details</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Edit Doctor Form */}
      {editDoctor && (
        <form onSubmit={handleSubmit} className="mb-10">
          <input
            type="text"
            name="doctorID"
            value={doctorData.doctorID}
            onChange={handleChange}
            placeholder="Doctor ID"
            className="border px-4 py-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="doctorName"
            value={doctorData.doctorName}
            onChange={handleChange}
            placeholder="Doctor Name"
            className="border px-4 py-2 w-full mb-2"
            required
          />
          <input
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border px-4 py-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="availableTimes"
            value={doctorData.availableTimes}
            onChange={handleChange}
            placeholder="Available Times (comma-separated)"
            className="border px-4 py-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="availableDays"
            value={doctorData.availableDays}
            onChange={handleChange}
            placeholder="Available Days (comma-separated)"
            className="border px-4 py-2 w-full mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Update Doctor
          </button>
        </form>
      )}

      {!doctors.length && !error && <div>Loading doctors...</div>}

      {/* Display Doctors in a Table */}
      <table className="table-auto w-full text-left border-collapse border border-gray-200 mt-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Doctor Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Available Days</th>
            <th style={{width:'24%'}} className="border px-4 py-2">Available Times</th>
            <th style={{width:'20%'}} className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="border px-4 py-2">{doctor.doctorName}</td>
              <td className="border px-4 py-2 text-center">{doctor.email}</td>
              <td className="border px-4 py-2">{doctor.availableDays.join(', ')}</td>
              <td className="border px-4 py-2">
                {doctor.availableTimes.map((time, index) => (
                  <div key={index}>{time}</div>
                ))}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(doctor)}
                  className="bg-green-500  rounded text-white px-2 py-1 mr-2 mb-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="bg-red-500 rounded text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDoctors;
