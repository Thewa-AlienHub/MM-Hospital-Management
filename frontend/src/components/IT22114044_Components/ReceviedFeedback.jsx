import { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

const ReceivedFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [averageRatings, setAverageRatings] = useState([]); // Define averageRatings as a state variable

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('/api/Feedbacks/GiveFeedback', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent for verification
          },
        });
        console.log('Feedbacks:', res.data); // Log data to inspect the response
        setFeedbacks(res.data);
        calculateAverageRatings(res.data); // Call average rating calculation after data is fetched
      } catch (err) {
        setError('Could not fetch feedbacks');
        console.error(err);
      }
    };

    const calculateAverageRatings = (data) => {
      const ratingsMap = {};

      data.forEach((feedback) => {
        if (!ratingsMap[feedback.doctor]) {
          ratingsMap[feedback.doctor] = {
            totalRating: 0,
            count: 0,
          };
        }
        ratingsMap[feedback.doctor].totalRating += feedback.rating;
        ratingsMap[feedback.doctor].count += 1;
      });

      const averages = Object.keys(ratingsMap).map((doctor) => ({
        doctor,
        averageRating: ratingsMap[doctor].totalRating / ratingsMap[doctor].count,
      }));

      setAverageRatings(averages); // Store the calculated average ratings
    };

    fetchFeedbacks(); // Fetch feedback when the component mounts
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY (or locale-specific format)
  };

  const updateFeedbackStatus = async (feedbackId, status) => {
    console.log("Feedback ID to update:", feedbackId); // Log feedback ID
    console.log("Status to update:", status); // Log status to update

    try {
      await axios.patch(`/api/Feedbacks/GiveFeedback/${feedbackId}/updateStatus`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure token is passed
        },
      });
      
      // Update local state for UI reflection
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, status } : feedback
        )
      );
      console.log(`Feedback ${feedbackId} updated to status: ${status}`);
    } catch (err) {
      console.error('Error updating feedback status:', err);
      setError('Could not update feedback status');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-10 underline">Patients Satisfaction</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!feedbacks.length && !error && <div>Loading feedbacks...</div>}

      {/* Display average ratings */}
      {averageRatings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {averageRatings.map(({ doctor, averageRating }) => (
            <div key={doctor} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-2">{doctor}</h2>
              <div className="flex items-center mb-2">
                <StarRatingComponent
                  name="doctorRating"
                  starCount={5}
                  value={averageRating}
                  editing={false} // Disable editing, it's just for display
                />
              </div>
              <p className="text-gray-500">Rating: {averageRating.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display feedbacks in a table */}
      <table className="table-auto w-full text-left border-collapse border border-gray-200 mt-10" style={{width:'130%',marginLeft:'-15%'}}>
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Doctor Name</th>
            <th className="border px-4 py-2">Date of receipt of service</th>
            <th style={{width:'40%'}} className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Patient Email</th>
            <th style={{width:'22%'}} className="border px-4 py-2">Action</th> {/* New Action Column */}
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className="border px-4 py-2">{feedback.doctor}</td>
              <td className="border px-4 py-2 text-center">{formatDate(feedback.date)}</td>
              <td className="border px-4 py-2">{feedback.feedback}</td>
              <td className="border px-4 py-2">{feedback.email}</td>
              <td className="border px-4 py-2">
  {/* Conditionally render buttons based on feedback status */}
  {feedback.status !== 'Thank You' && feedback.status !== 'Get Action Quickly' ? (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2 mb-1"
        onClick={() => updateFeedbackStatus(feedback._id, 'Thank You')}
      >
        Thank You
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        onClick={() => updateFeedbackStatus(feedback._id, 'Get Action Quickly')}
      >
        Get Action Quickly
      </button>
    </>
  ) : (
    <span className="text-gray-500">{feedback.status}</span> // Display current status instead of buttons
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedFeedback;
