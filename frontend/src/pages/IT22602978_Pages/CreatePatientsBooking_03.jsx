import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux for current user info

const CreatePatientBooking = () => {
  const [patientName, setPatientName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [PatientProfileid, setPatientProfileid] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingNumber, setBookingNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Assuming currentUser is stored in Redux state
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch patient profile data when component mounts
    if (currentUser?._id) {
      fetchPatientProfile(currentUser._id);
    }

    // Fetch list of doctors
    fetchDoctors();
  }, [currentUser]);

  const fetchPatientProfile = async (userId) => {
    try {
      const response = await fetch(`/api/PatientProfile/get/${userId}`);
      const profile = await response.json();
      console.log(profile);
      setPatientProfileid(profile._id);
      setPatientName(profile.FirstName +" "+ profile.LastName);
      console.log(profile);
      
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/PatientBooking/Doctors");
      const doctorList = await response.json();
      setDoctors(doctorList.data);
      
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDoctorSelection = async (doctorId) => {
    setSelectedDoctor(doctorId);
    console.log(doctorId);
    try {
      // Fetch available dates for the selected doctor
      const response = await fetch(`/api/PatientBooking/availableDates/${doctorId}`);
      const dates = await response.json();
      console.log(dates.data);
      setAvailableDates(dates.data);
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const handleDateSelection = async (date) => {
    setSelectedDate(date);
    try {
      // Fetch available times for the selected date
      const response = await fetch(`/api/PatientBooking/availableTimes/${selectedDoctor}/${date}`);
      const times = await response.json();
      console.log(times);
      setAvailableTimes(times.availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime ||!PatientProfileid) {
      setErrorMessage("Please fill all fields!");
      return;
    }

    const newBooking = {
      patientName,
      PatientProfileId: PatientProfileid,
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      userId: currentUser._id,
    };

    try {
      const response = await fetch("/api/PatientBooking/bookAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      const result = await response.json();
      if (response.ok) {
        setBookingNumber(result.data.bookingNumber);
        setSuccessMessage("Booking successful!");
        setShowModal(true);
      } else {
        setErrorMessage(result.message || "Error booking appointment");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/booking");
  };

  return (
    <div className="max-w-4xl mx-auto  ">
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-left text-gray-500">
            Hi {patientName} ,</h2>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700" >
            Let's book an appointment!
          </h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Doctor
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => handleDoctorSelection(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.doctorName}
                  </option>
                ))}
              </select>
            </div>

            {availableDates.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Available Dates
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => handleDateSelection(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a Date</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {availableTimes.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Available Times
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a Time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedTime && (
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Submit Booking
                </button>
              </div>
            )}
          </form>

          {successMessage && (
            <div className="mt-4 bg-green-100 text-green-600 p-4 rounded">
              <p>{successMessage}</p>
              <p>Booking Number: {bookingNumber}</p>
            </div>
          )}

          {/* Modal for Booking Number */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
              <div className="bg-white p-6 rounded shadow-md m-10">
                <h2 className="text-4xl font-bold mb-4 text-center">Booking Successful!</h2>
                <p className="text-2xl text-center">Your booking number </p>
                   <p className="text-center text-7xl font-extrabold">{bookingNumber}</p>
                   <div className="flex justify-center m-4"> 
                   <button
                      onClick={closeModal}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-center w-52 text-xl"
                    >
                      Done
                    </button>
                   </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePatientBooking;
