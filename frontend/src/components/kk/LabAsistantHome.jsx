import { useNavigate } from 'react-router-dom';

const LabAsistantHome = () => {

    const navigate = useNavigate();

  const handleScanQRClick = () => {
        const id = "123"; 
    navigate(`/get-report/${id}`);
  };

    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-10 bg-gray-100">
        {/* Main message */}
        <h1 className="text-3xl font-semibold text-gray-800">
          Waiting for next patient...
        </h1>
  
        {/* Scan QR Touchable Card */}
        <div
        onClick={handleScanQRClick}
        className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-24 px-4 rounded-xl shadow-lg transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center cursor-pointer">
          <button className="text-6xl">
            Scan QR
          </button>
        </div>
  
        {/* Other Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
            All Records
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
            Button 2
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
            Button 3
          </button>
        </div>
      </div>
    );
  };
  
  export default LabAsistantHome;
  