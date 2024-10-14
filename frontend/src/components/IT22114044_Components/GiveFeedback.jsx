import React, { useState, useEffect } from 'react';
import { Label, Textarea, Button, Select, Alert } from 'flowbite-react';
import { Rating } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillCalendarFill } from 'react-icons/bs';
import axios from 'axios'; // For making API requests
import { useSelector } from 'react-redux'; // To get logged-in user's email

const GiveFeedback = () => {
  const [doctor, setDoctor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(new Date());
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  // Get the logged-in user's email from Redux state or localStorage
  const { email } = useSelector((state) => state.user.currentUser) || {}; // Assuming you store the user in Redux

  // Fetch doctors from the backend
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
        setErrMsg('Could not fetch doctors');
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (doctor === "") {
      return setErrMsg("Please select a doctor.");
    } else if (!date) {
      return setErrMsg("Please select a date.");
    } else if (feedback === "") {
      return setErrMsg("Feedback is required.");
    } else if (rating === 0) {
      return setErrMsg("Please give a rating.");
    }

    // Clear previous error message and start loading
    setErrMsg("");
    setLoading(true);

    // Include the user's email in formData
    const formData = { doctor, date, feedback, rating, email };

    try {
      const res = await fetch('/api/Feedbacks/GiveFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        setErrMsg(data.message);
      } else {
        setSuccessMsg("Your feedback has been submitted successfully!");
      }
    } catch (error) {
      setErrMsg("Error submitting feedback. Please try again later.");
    } finally {
      setLoading(false);
    }

    // Reset fields
    setDoctor("");
    setFeedback("");
    setRating(0);
    setDate(new Date());
  };

  return (
    <div className='min-h-screen flex flex-col items-center' style={{ background: 'linear-gradient(135deg, #f0f4f8, #d1e0e5)' }}>
      <h1 className='text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300 mb-8'>Share Your Experience</h1>
      
      <div className="bg-white-400 p-10 rounded-lg border border-teal-500 rounded-tl-3xl rounded-br-3xl m-5 shadow-lg max-w-2xl w-full mt-10">
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
          
          <div>
            <Label value="Select Doctor" className='text-sm uppercase tracking-wide' />
            <Select onChange={(e) => setDoctor(e.target.value)} value={doctor} required className='w-full'>
              <option value="" disabled>Select a doctor</option>
              {/* Dynamically populate doctors from the fetched data */}
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.doctorName}>
                  {doc.doctorName}
                </option>
              ))}
            </Select>
          </div>

          <div className="relative">
            <Label value="Date of receipt of service" className='text-sm uppercase tracking-wide' /><br></br>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy/MM/dd"
                className='w-full text-input rounded-lg border border-gray-300 p-2 pl-10' // Increased left padding for the icon
            />
            <span className="absolute inset-y-5 left-4 flex items-center mt-6">
                <BsFillCalendarFill className="text-gray-400" />
            </span>
          </div>

          <div>
            <Label value="Your Feedback" className='text-sm uppercase tracking-wide' />
            <Textarea 
              placeholder="Please provide your feedback..." 
              rows='4' 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className='w-full'
            />
          </div>

          <div>
            <Label value="Rating" className='text-sm uppercase tracking-wide' />
            <Rating>
                {[1, 2, 3, 4, 5].map((star) => (
                <Rating.Star 
                    key={star} 
                    filled={star <= rating} 
                    onClick={() => setRating(star)} 
                    className={`cursor-pointer large-star`} 
                />
                ))}
            </Rating>
          </div>

          <Button type="submit" gradientDuoTone='purpleToBlue' className="uppercase">
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>

          {errMsg && <Alert color="failure" className="mt-4">{errMsg}</Alert>}
          {successMsg && <Alert color="success" className="mt-4">{successMsg}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default GiveFeedback;
