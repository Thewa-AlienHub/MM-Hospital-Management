import React, { useState, useEffect, useRef } from "react";
import { Button } from "flowbite-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import QrImage from "./QRCodeScanning.gif"; // Keep your QR code GIF for instructions

const ScanQR_04 = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);

  const handleScan = (decodedText) => {
    if (decodedText) {
      console.log("QR Code scanned:", decodedText);
      stopScanning();
      // Simulating fetching patient data based on scanned QR code
      const fetchedData = {
        name: "John Doe",
        age: 35,
        medicalHistory: "Diabetes, Hypertension",
        previousPrescriptions: ["Metformin", "Lisinopril"],
      };
      setScannedData(fetchedData);
    }
  };

  const handleError = (err) => {
    console.error("QR Code scanning error:", err);
    setError("An error occurred while scanning the QR code.");
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScannedData(null);
  };

  const stopScanning = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        .clear()
        .then(() => {
          console.log("QR Code scanning stopped.");
        })
        .catch((err) => {
          console.error("Error stopping the scanner:", err);
        });
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (isScanning && !html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5QrcodeScanner(
        qrCodeRegionId,
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // QR code scanning box size
          aspectRatio: 1.0, // The aspect ratio for the QR scanning region
        },
        false // Verbose logging (set to false to disable)
      );

      // Set up the success and error handlers
      html5QrCodeRef.current.render(handleScan, handleError);
    }

    return () => {
      // Cleanup the QR code scanner when the component is unmounted
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .clear()
          .then(() => console.log("QR Code scanner stopped on cleanup."))
          .catch((err) => {
            console.error("Error during cleanup:", err);
          });
      }
    };
  }, [isScanning]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Scan Patient QR Code
      </h2>

      {/* Conditional Rendering of QR Code GIF or QR Reader */}
      {!isScanning ? (
        <>
          {/* QR Code GIF */}
          <div className="flex justify-center mb-4">
            <img
              src={QrImage}
              alt="Camera"
              className="w-60 h-60" // Adjust size as needed
            />
          </div>

          {/* Instructional Text */}
          <p className="text-gray-600 mb-4 text-center">
            Please scan the patient's QR code to retrieve their medical details.
            Make sure the QR code is clear and within the scanning area.
          </p>

          {/* Scan QR Button */}
          <Button
            onClick={startScanning}
            className="w-full bg-blue-950 rounded-full"
          >
            Scan QR Code
          </Button>
        </>
      ) : (
        <>
          {/* QR Code Reader */}
          <div id={qrCodeRegionId} className="lg:w-60 ml-auto mr-auto w-44" />
          <p className="text-gray-600 mb-4 text-center">
            {isScanning ? "Scanning for QR code..." : "Scanning stopped."}
          </p>
          <Button
            onClick={stopScanning}
            className="mt-4 w-full bg-red-500 rounded-full"
          >
            Stop Scanning
          </Button>
        </>
      )}

      {/* Display Scanned Data */}
      {scannedData && (
        <div className="mt-4">
          <h3 className="font-semibold">Patient Details:</h3>
          <p>Name: {scannedData.name}</p>
          <p>Age: {scannedData.age}</p>
          <p>Medical History: {scannedData.medicalHistory}</p>
          <h4 className="mt-2">Previous Prescriptions:</h4>
          <ul className="list-disc ml-4">
            {scannedData.previousPrescriptions.map((prescription, index) => (
              <li key={index}>{prescription}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ScanQR_04;
