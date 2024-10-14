import React, { useState } from 'react';
import { Label, Button, TextInput, Checkbox, Alert } from 'flowbite-react';

const DoctorAdd = () => {
  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const timesOptions = [' 9:00 AM - 12:00 PM', ' 1:00 PM - 4:00 PM', ' 5:00 PM - 8:00 PM'];
  const daysOptions = [' Monday', ' Tuesday', ' Wednesday', ' Thursday', ' Friday'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorID) {
      return setErrMsg("Please enter Doctor ID.");
    } else if (!doctorName) {
      return setErrMsg("Please enter Doctor Name.");
    } else if (!email) {
      return setErrMsg("Please enter a valid email.");
    } else if (availableTimes.length === 0) {
      return setErrMsg("Please select available times.");
    } else if (availableDays.length === 0) {
      return setErrMsg("Please select available days.");
    }

    setErrMsg("");
    setLoading(true);

    const formData = { doctorID, doctorName, email, availableTimes, availableDays };

    try {
      const res = await fetch('/api/Doctors/Doctors', {
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
        setSuccessMsg("Doctor details have been submitted successfully!");
      }
    } catch (error) {
      setErrMsg("Error submitting doctor details. Please try again later.");
    } finally {
      setLoading(false);
    }

    setDoctorID("");
    setDoctorName("");
    setEmail("");
    setAvailableTimes([]);
    setAvailableDays([]);
  };

  const handleTimeSelection = (e) => {
    const time = e.target.value;
    setAvailableTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleDaySelection = (e) => {
    const day = e.target.value;
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center font-extrabold underline text-blue-950 dark:text-slate-300 mb-8">Add Doctor</h1>

      <div className="bg-white-400 p-10 rounded-lg border border-teal-500 rounded-tl-3xl rounded-br-3xl shadow-lg max-w-2xl w-full" style={{ width: '123%', marginLeft: '-11%' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div>
            <Label value="Doctor ID" className="text-sm uppercase tracking-wide" />
            <TextInput
              type="text"
              value={doctorID}
              onChange={(e) => setDoctorID(e.target.value)}
              required
              className="w-full"
              placeholder="Enter Doctor ID"
            />
          </div>

          <div>
            <Label value="Doctor Name" className="text-sm uppercase tracking-wide" />
            <TextInput
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
              className="w-full"
              placeholder="Enter Doctor Name"
            />
          </div>

          <div>
            <Label value="Email" className="text-sm uppercase tracking-wide" />
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              placeholder="Enter Doctor Email"
            />
          </div>

          <div>
            <Label value="Available Times" className="text-sm uppercase tracking-wide" />
            <div className="grid grid-cols-3 gap-4">
              {timesOptions.map((time) => (
                <div key={time}>
                  <Checkbox
                    value={time}
                    onChange={handleTimeSelection}
                    checked={availableTimes.includes(time)}
                  />
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label value="Available Days" className="text-sm uppercase tracking-wide" />
            <div className="grid grid-cols-3 gap-4">
              {daysOptions.map((day) => (
                <div key={day}>
                  <Checkbox
                    value={day}
                    onChange={handleDaySelection}
                    checked={availableDays.includes(day)}
                  />
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" gradientDuoTone="purpleToBlue" className="uppercase">
            {loading ? "Submitting..." : "Register Doctor"}
          </Button>

          {errMsg && <Alert color="failure" className="mt-4">{errMsg}</Alert>}
          {successMsg && <Alert color="success" className="mt-4">{successMsg}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default DoctorAdd;
