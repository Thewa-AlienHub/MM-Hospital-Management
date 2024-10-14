import React, { useState } from "react";
import ScanQR_04 from "../../pages/IT22603418_Pages/ScanQR_04";
import LabTest_04 from "../../pages/IT22603418_Pages/LabTest_04";
import Medications_04 from "../../pages/IT22603418_Pages/Medications_04";
import { Button } from "flowbite-react";

const Dashboard_04 = () => {
  const [activeTab, setActiveTab] = useState("scanQR");
  const [scannedData, setScannedData] = useState(null); // Maintain scanned data state

  const handleScanQRButtonClick = () => setActiveTab("scanQR");
  const handleLabTestButtonClick = () => setActiveTab("labTest");
  const handleMedicationsClick = () => setActiveTab("medications");

  return (
    <div className="mx-auto p-3 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full sm:w-auto flex flex-row space-x-2 bg-blue-950 p-2 rounded-full">
            <Button
              gradientDuoTone={
                activeTab === "scanQR" ? "bg-white text-blue-950" : "text-white"
              }
              className={`w-96 items-center focus:outline-none text-lg rounded-3xl ${
                activeTab === "scanQR" ? "bg-white text-blue-950" : "text-white"
              }`}
              onClick={handleScanQRButtonClick}
            >
              Scan QR
            </Button>
            {/* <Button
              gradientDuoTone={
                activeTab === "labTest"
                  ? "bg-white text-blue-950"
                  : "text-white"
              }
              className={`w-96 items-center focus:outline-none text-lg rounded-3xl ${
                activeTab === "labTest"
                  ? "bg-white text-blue-950"
                  : "text-white"
              }`}
              onClick={handleLabTestButtonClick}
            >
              Lab Tests
            </Button>
            <Button
              gradientDuoTone={
                activeTab === "medications"
                  ? "bg-white text-blue-950"
                  : "text-white"
              }
              className={`w-96 items-center focus:outline-none text-lg rounded-3xl ${
                activeTab === "medications"
                  ? "bg-white text-blue-950"
                  : "text-white"
              }`}
              onClick={handleMedicationsClick}
            >
              Medications
            </Button> */}
          </div>
        </div>
        <div>
          {activeTab === "scanQR" && (
            <ScanQR_04 className="pb-5" setScannedData={setScannedData} />
          )}
          {activeTab === "labTest" && (
            <LabTest_04 className="pb-5" scannedData={scannedData} />
          )}
          {activeTab === "medications" && (
            <Medications_04 className="pb-5" scannedData={scannedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_04;
