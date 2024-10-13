import React, { useState, useEffect, useRef } from "react";
import { Button } from "flowbite-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import QrImage from "./QRCodeScanning.gif";
import { useSelector } from "react-redux";

const ScanQR_04 = ({ setScannedData }) => {
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedDataState] = useState(null);
  const [scannedId, setScannedId] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const handleScan = async (decodedText) => {
    if (decodedText) {
      console.log("QR Code scanned:", decodedText);
      stopScanning();
      await fetchPatientData(decodedText);
      setIsScanning(false);
    }
  };

  const handleError = (error) => {
    console.error("QR Code scanning error:", error);
  };

  const fetchPatientData = async (scannedId) => {
    try {
      const response = await fetch(`/api/patient/${scannedId}`);
      if (!response.ok) throw new Error("Failed to fetch patient details");
      const data = await response.json();
      setScannedDataState(data);
      setScannedData(data);
      setScannedId(scannedId);
      await fetchPatientHistory(scannedId);
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setError("Could not retrieve patient details. Please try again.");
    }
  };

  const fetchPatientHistory = async (patientId) => {
    setLoadingHistory(true);
    try {
      const response = await fetch(`/api/patient-history/${patientId}`);
      if (!response.ok) throw new Error("Failed to fetch patient history");
      const historyData = await response.json();

      const sortedHistory = historyData.sort(
        (a, b) => new Date(b.historyAddedDate) - new Date(a.historyAddedDate)
      );

      setPatientHistory(sortedHistory);
    } catch (err) {
      console.error("Error fetching patient history:", err);
      setError("No Patient history found.");
    } finally {
      setLoadingHistory(false);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScannedDataState(null);
    setScannedId(null);
    setPatientHistory([]);

    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.clear().then(() => {
        console.log("Previous QR Code scanner instance cleared.");
        initializeScanner();
      });
    } else {
      initializeScanner();
    }
  };

  const initializeScanner = () => {
    html5QrCodeRef.current = new Html5QrcodeScanner(
      qrCodeRegionId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    html5QrCodeRef.current.render(handleScan, handleError);
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
    console.log("Patient history updated:", patientHistory);
  }, [patientHistory]);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }

    if (isScanning && !html5QrCodeRef.current) {
      initializeScanner();
    }

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .clear()
          .then(() => console.log("QR Code scanner stopped on cleanup."))
          .catch((err) => {
            console.error("Error during cleanup:", err);
          });
      }
    };
  }, [isScanning, currentUser]);

  const handleNavigateToMedications = () => {
    const patientId = scannedId;
    if (loading || !currentUser || !currentUser._id || !patientId) {
      console.error("Error navigating to medications.");
      return;
    }

    navigate(`/medications/${patientId}`, {
      state: {
        patientId,
        doctorId: currentUser._id,
      },
    });
  };

  const renderSection = (title, data) => (
    <div className="mb-2 bg-blue-100 rounded-3xl pt-2 px-3">
      <h4 className="text-md font-bold">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td className="py-2 font-semibold">{key}</td>
                <td className="py-2 pl-4">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-md max-w-lg mx-auto p-3 w-full">
      <h2 className="text-xl font-bold mb-4 text-center">
        Scan Patient QR Code
      </h2>

      {!isScanning ? (
        <>
          <div className="flex justify-center mb-4">
            <img src={QrImage} alt="Camera" className="w-60 h-60" />
          </div>
          <p className="text-gray-600 mb-4 text-center">
            Please scan the patient's QR code to retrieve their medical details.
          </p>
          <Button
            onClick={startScanning}
            className="w-full bg-blue-950 rounded-full"
          >
            Scan QR Code
          </Button>
        </>
      ) : (
        <>
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

      {scannedData && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Patient Details</h3>
          {scannedData.basicInfo &&
            renderSection("Basic Information", scannedData.basicInfo)}
          {scannedData.providedDetails &&
            renderSection("Provided Details", scannedData.providedDetails)}
          <Button
            onClick={handleNavigateToMedications}
            className="mt-4 w-full bg-green-500 rounded-full"
          >
            Add Medical Condition Details
          </Button>
        </div>
      )}

      {patientHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Patient Medical History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody>
                {patientHistory.map((historyItem) => (
                  <tr key={historyItem._id}>
                    <td colSpan={2} className="py-2">
                      <div className="bg-orange-100 border rounded-3xl p-4 mb-1">
                        <div className="font-bold">Doctor Name:</div>
                        <div className="mb-2">{historyItem.doctorName}</div>
                        <div className="font-bold">Consulted Date:</div>
                        <div className="mb-2">
                          {historyItem.historyAddedDate}
                        </div>
                        <div className="font-bold">Illness:</div>
                        <div className="mb-2">{historyItem.disease}</div>
                        <div className="font-bold">Medications:</div>
                        <div className="mb-1">
                          <ul>
                            {historyItem.medications.map((med, index) => (
                              <li key={index}>
                                {med.name} - {med.dosage} ({med.frequency})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default ScanQR_04;
