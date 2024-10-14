import { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component'; // Assuming you fixed star rating lib
import axios from 'axios';
import { useSelector } from 'react-redux'; // To get the logged-in user's email

const MyFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  // Get the current logged-in user's email from Redux state or localStorage
  const { email } = useSelector((state) => state.user.currentUser) || {}; // Assuming you store the user in Redux
  console.log("Logged-in user email:", email);
  // const email = JSON.parse(localStorage.getItem('user'))?.email; // If you're storing user in localStorage

  const fetchFeedbacks = async () => {
    try {
        // Corrected API URL
        const res = await axios.get(`/api/Feedbacks/GiveFeedback/byEmail?email=${email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent for verification
            },
        });

        // Log to check if data is being fetched
        console.log('Feedback response data:', res.data);

        // Store fetched feedbacks in state
        setFeedbacks(res.data);

        // Calculate average ratings (if applicable)
        calculateAverageRatings(res.data); 
    } catch (err) {
        console.error(err); // Log error for debugging
    }
};

// Use useEffect to fetch feedback data on component mount
    useEffect(() => {
        if (email) {
        fetchFeedbacks();
        }
    }, [email]); // Fetch when email is available

    const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-10 underline">My Feedbacks</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!feedbacks.length && !error && <div>Loading feedbacks...</div>}

      {/* Display feedbacks in a table */}
      <table className="table-auto w-full text-left border-collapse border border-gray-200 mt-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Date of receipt of service</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Response</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className="border px-4 py-2">{feedback.doctor}</td>
              <td className="border px-4 py-2 text-center">{formatDate(feedback.date)}</td>
              <td className="border px-4 py-2">{feedback.feedback}</td>
              <td className="border px-4 py-2">{feedback.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFeedback;
