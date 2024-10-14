import { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Alert,Button, Checkbox, Label, TextInput, } from "flowbite-react"

const AddPaymentProfile_03 = () => {
  
  
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName : '',LastName : '',emergencyContactNumber : '',emergencyContactName : '',medications : 'No',preConditions : 'No',allergies : 'No',bloodGroup : '',email: '',contactNumber : '',gender : '',dob : ''
  })
  const { FirstName,LastName,emergencyContactNumber,emergencyContactName,medications,preConditions,allergies,bloodGroup,email,contactNumber,gender,dob } = formData;
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value.trim()
    }));
  };

  const validateFormData = () => {
    // Clear previous error messages
    setErrorMessage('');

    // Validation for First Name
    if (!formData.FirstName || formData.FirstName.trim().length === 0) {
        return setErrorMessage('First Name is required.');
    }
    
    // Validation for Last Name
    if (!formData.LastName || formData.LastName.trim().length === 0) {
        return setErrorMessage('Last Name is required.');
    }
    
    // Validation for Date of Birth
    if (!formData.dob) {
        return setErrorMessage('Date of Birth is required.');
    }

    // Validation for Gender
    if (!formData.gender) {
        return setErrorMessage('Gender must be selected.');
    }

    // Contact number validation
    if (!formData.contactNumber || formData.contactNumber.length !== 10 || isNaN(formData.contactNumber)) {
        return setErrorMessage('Contact number must be a 10-digit number.');
    }

    // Email validation
    if (!formData.email) {
        return setErrorMessage('Email is required.');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        return setErrorMessage('Email format is invalid.');
    }

    // Blood Group validation
    if (!formData.bloodGroup) {
        return setErrorMessage('Blood Group must be selected.');
    }

    // Allergies validation (optional)
    if (formData.allergies && formData.allergies.trim().length === 0) {
        return setErrorMessage('Please provide valid allergies or leave it blank.');
    }

    // Pre-existing Conditions validation (optional)
    if (formData.preConditions && formData.preConditions.trim().length === 0) {
        return setErrorMessage('Please provide valid pre-existing conditions or leave it blank.');
    }

    // Current Medications validation (optional)
    if (formData.medications && formData.medications.trim().length === 0) {
        return setErrorMessage('Please provide valid current medications or leave it blank.');
    }

    // Emergency Contact Name validation
    if (!formData.emergencyContactName || formData.emergencyContactName.trim().length === 0) {
        return setErrorMessage('Emergency Contact Name is required.');
    }

    // Emergency Contact Number validation
    if (!formData.emergencyContactNumber || formData.emergencyContactNumber.length !== 10 || isNaN(formData.emergencyContactNumber)) {
        return setErrorMessage('Emergency Contact Number must be a 10-digit number.');
    }

    // If all validations pass, return true (or proceed with form submission)
    return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateFormData()) {
    return; // Stop if validation fails
  }

  try {
    setLoading(true);
    setErrorMessage(null);
    
    // Create the patient profile
    const res = await fetch('/api/PatientProfile/CreatePatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OwnerId: `${currentUser._id}`,
        ...formData,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success === false) {
      setErrorMessage(data.message);
      return;
    }

    if (res.status === 201) {
      // Patient profile created, now update the user's isPatient field
      const updateRes = await fetch(`/api/user/updatePatient/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPatient: true,
        }),
      });

      const updateData = await updateRes.json();

      if (updateRes.ok) {
        navigate('/dashboard?tab=patientprofile');
        toast.success("Patient Profile Created and User updated successfully");
      } else {
        setErrorMessage(updateData.message || "Failed to update user.");
      }
    }
  } catch (error) {
    setErrorMessage(error.message);
    setLoading(false);
  }
};




  return (
    <div className="container mx-auto w-[80%] md:w-[40%] h-screen overflow-auto p-5 hide-scrollbar">
  <div className="flex-col h-screen mt-20 justify-center">
    <h1 className="flex justify-center text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
      Create Patient's Profile
    </h1>
    <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
      <form className="flex flex-col gap-4 w-full justify-center" onSubmit={handleSubmit}>
        
        {/* Personal Information */}
        <div>
          <Label value="First Name" />
          <TextInput type="text" placeholder="Enter the First Name..." id="FirstName" value={FirstName} onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })} />
        </div>
        <div>
          <Label value="Last Name" />
          <TextInput type="text" placeholder="Enter the Last Name..." id="LastName" value={LastName} onChange={(e) => setFormData({ ...formData, LastName: e.target.value })} />
        </div>
        <div>
          <Label value="Date of Birth" />
          <TextInput type="date" id="dob" value={dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
        </div>
        <div>
          <Label value="Gender" />
          <select id="gender" value={gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="border rounded-md p-2 ml-10">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label value="Contact Number" />
          <TextInput
            type="tel"
            id="contactNumber"
            placeholder="Enter Contact Number..."
            value={contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            pattern="[0-9]{10}" // Adjust the pattern according to the required number format
            maxLength={10} // Assuming the number is 10 digits
            className="border rounded-md p-2"
            required
          />
          
        </div>
        <div>
          <Label value="Email Address" />
          <TextInput type="email" placeholder="Enter Email Address..." id="email" value={email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        
        {/* Medical Information */}
        <div>
              <Label value="Blood Group" />
              <select id="bloodGroup" value={bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} className="border rounded-md p-2 ml-5">
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
        <div>
          <Label value="Allergies" />
          <TextInput type="text" placeholder="Enter Any Allergies..." id="allergies" value={allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} />
        </div>
        <div>
          <Label value="Pre-existing Conditions" />
          <TextInput type="text" placeholder="Enter Pre-existing Medical Conditions..." id="preConditions" value={preConditions} onChange={(e) => setFormData({ ...formData, preConditions: e.target.value })} />
        </div>
        <div>
          <Label value="Current Medications" />
          <TextInput type="text" placeholder="Enter Current Medications..." id="medications" value={medications} onChange={(e) => setFormData({ ...formData, medications: e.target.value })} />
        </div>

        {/* Emergency Contact */}
        <div>
            <Label value="Emergency Contact Name" />
            <TextInput
              type="text"
              id="emergencyContactName"
              placeholder="Enter Emergency Contact Name..."
              value={emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
              pattern="[A-Za-z\s]+" // Restricts to alphabetic characters and spaces
              className="border rounded-md p-2"
              required
            />
            
          </div>
        <div>
          <Label value="Emergency Contact Number" />
          <TextInput type="tel" placeholder="Enter Emergency Contact Number..." id="emergencyContactNumber" value={emergencyContactNumber} onChange={(e) => setFormData({ ...formData, emergencyContactNumber: e.target.value })} />
        </div>
        
        {/* Submit Button */}
        <Button type="submit" gradientDuoTone='purpleToBlue' disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
      
      {/* Error Alert */}
      {errorMessage && (
        <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">
          {errorMessage}
        </Alert>
      )}
    </div>
  </div>
</div>

  );
};

export default AddPaymentProfile_03;
