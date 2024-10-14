import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCode1 from "qrcode.react"; // for generating QR codes

const BookingHistory_03 = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const navigate = useNavigate();

  // Assuming your Redux store has the user details
  const currentUser = useSelector((state) => state.user?.currentUser);

  useEffect(() => {
    if (currentUser?._id) {
      // Fetch all bookings and pending bookings from the backend
      fetchAllBookings(currentUser._id);
      fetchPendingBookings(currentUser._id);
    }
  }, [currentUser]);

  const fetchAllBookings = async (userId) => {
    try {
      const response = await fetch(`/api/PatientBooking/Appointments/${userId}`);
      const data = await response.json();

      if (response.ok && data.data) {
        setAllBookings(data.data);
      } else {
        console.error("Error fetching all bookings:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching all bookings:", error);
    }
  };

  const fetchPendingBookings = async (userId) => {
    try {
      const response = await fetch(`/api/PatientBooking/PendingAppointments/${userId}`);
      const data = await response.json();

      if (response.ok && data.data) {
        console.log(data.data);
        setPendingBookings(data.data);
      } else {
        console.error("Error fetching pending bookings:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
    }
  };

  const handleAddBooking = () => {
    navigate('/dashboard?tab=CreatePatientsBooking'); // Adjust this path based on your routing
  };

  return (
    <div className="p-4 md:p-10 lg:p-20 bg-blue-100 m-3 md:m-5 rounded-3xl">
    {/* Booking History Header */}
    <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 underline">Booking History</h1>
      <div className="mb-4">
        <button
          onClick={handleAddBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="material-icons mr-2">add_circle</span>
          Add Appointment
        </button>
      </div>
    </div>
  
    {/* All Bookings Section */}
    <div className="mb-8">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">All Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full p-8 rounded-3xl">
          <thead>
            <tr>
              <th className="p-2 md:p-4 rounded bg-blue-300">Booking ID</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Booking Date & Time</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Doctor Name</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.length > 0 ? (
              allBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base font-semibold">{booking.bookingId}</td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">
                    {new Date(booking.updatedAt).toLocaleDateString()}{' '}
                    {new Date(booking.updatedAt).toLocaleTimeString()}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">{booking.doctorName}</td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-sm md:text-base">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  
    {/* Pending Bookings Section */}
    <div>
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">Ongoing Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-2 md:p-4 rounded bg-blue-300">Booking ID</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Booking Date & Time</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Doctor Name</th>
              <th className="p-2 md:p-4 rounded bg-blue-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base font-semibold">{booking.bookingId}</td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">
                    {new Date(booking.updatedAt).toLocaleDateString()}{' '}
                    {new Date(booking.updatedAt).toLocaleTimeString()}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">{booking.doctorName}</td>
                  <td className="p-2 border-b border-gray-300 text-sm md:text-base">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-sm md:text-base">
                  No pending bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  

  );
};

export default BookingHistory_03;
