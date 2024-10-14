import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import QRCode1 from "qrcode.react"; // for generating QR codes
import jsPDF from "jspdf"; // for generating PDF
import html2canvas from "html2canvas";

const PatientProfile_03 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [patientProfile, setPatientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfRef = useRef();
  const qrRef = useRef(); // Reference to the QR Code

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      setError("No user is currently logged in");
      setLoading(false);
      return;
    }

    const fetchPatientProfile = async () => {
      try {
        const res = await fetch(`/api/PatientProfile/get/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setPatientProfile(data);
        } else {
          setError(data.message || "Failed to fetch patient profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, [currentUser]);

  const downloadPatientReport = async () => {
    if (!pdfRef.current) return;
  
    try {
      // Capture the content of pdfRef
      const canvas = await html2canvas(pdfRef.current, {
        useCORS: true,
        scale: 1, // Increase scale for better quality
        logging: true, // Enable logging for better debugging
      });
  
      // Generate image data from the captured canvas
      const imgData = canvas.toDataURL("image/jpeg");
  
      // Log the image data to verify it's properly generated
      console.log("Captured image data: ", imgData);
  
      const pdf = new jsPDF();
      const imgWidth = 190; // Desired width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height; // Height of the PDF page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      let heightLeft = imgHeight;
      let position = 0;
  
      // Add the captured content image to the PDF
      pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Add more pages if necessary for the content
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Save the generated PDF
      pdf.save(`${patientProfile.FirstName}'s_Hospitail ID.pdf`);
    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };
  

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
  <div>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">Patient Profile Details</h2>
    {patientProfile ? (
      <div className="bg-blue-100 shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Personal Details */}
          <div className="m-2 sm:m-3">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Personal Details</h2>
            <div className="text-left p-4 sm:p-5 bg-blue-200 rounded-2xl">
              <p><strong>First Name:</strong> {patientProfile.FirstName}</p>
              <p><strong>Last Name:</strong> {patientProfile.LastName}</p>
              <p><strong>Contact Number:</strong> {patientProfile.contactNumber}</p>
              <p><strong>Email:</strong> {patientProfile.email}</p>
              <p><strong>Gender:</strong> {patientProfile.gender}</p>
              <p><strong>Date of Birth:</strong> {new Date(patientProfile.dob).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Emergency Details */}
          <div className="m-2 sm:m-3">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Emergency</h2>
            <div className="text-left p-4 sm:p-5 bg-blue-200 rounded-2xl">
              <p><strong>Contact Person:</strong> {patientProfile.emergencyContactName}</p>
              <p><strong>Contact Number:</strong> {patientProfile.emergencyContactNumber}</p>
            </div>
          </div>
        </div>

        {/* Health Related Details */}
        <div className="m-2 sm:m-3">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Health Related</h2>
          <div className="text-left p-4 sm:p-5 bg-blue-200 rounded-2xl">
            <p><strong>Medications:</strong> {patientProfile.medications}</p>
            <p><strong>Pre-existing Conditions:</strong> {patientProfile.preConditions}</p>
            <p><strong>Allergies:</strong> {patientProfile.allergies}</p>
            <p><strong>Blood Group:</strong> {patientProfile.bloodGroup}</p>
          </div>
        </div>

        {/* Hidden Section for PDF Capture */}
        <div
          ref={pdfRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            opacity: 100, // Keeps it rendered but invisible to the user
          }}
        >
          <div className="m-10 rounded-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">MM Group Hospital</h2>
            <h2 className="text-lg sm:text-xl font-bold text-center mb-4">Patient ID</h2>
            <div className="text-left p-5 bg-blue-200 rounded-2xl">
              <p><strong>First Name:</strong> {patientProfile.FirstName}</p>
              <p><strong>Last Name:</strong> {patientProfile.LastName}</p>
              <p><strong>Contact Number:</strong> {patientProfile.contactNumber}</p>
              <p><strong>Email:</strong> {patientProfile.email}</p>
              <p><strong>Gender:</strong> {patientProfile.gender}</p>
              <p><strong>Date of Birth:</strong> {new Date(patientProfile.dob).toLocaleDateString()}</p>
              <p><strong>Contact Person:</strong> {patientProfile.emergencyContactName}</p>
              <p><strong>Contact Number:</strong> {patientProfile.emergencyContactNumber}</p>
              <p><strong>Blood Group:</strong> {patientProfile.bloodGroup}</p>
            </div>
          </div>
          <div ref={qrRef} className="flex flex-col items-center">
            <QRCode1
              id="qrCodeCanvas"
              value={patientProfile._id}
              size={128}
              level={"H"}
              includeMargin={true}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center text-red-600">
        No patient profile found for the current user. Please create the Patient Profile.
      </div>
    )}
  </div>

  {/* Button to Download Patient Report */}
  <div className="flex justify-center items-center mt-6">
    <button
      onClick={downloadPatientReport}
      className="flex items-center bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
    >
      <span className="material-icons mr-2">file_download</span>
      Download Patient Hospital ID
    </button>
  </div>
</div>

  );
};

export default PatientProfile_03;
