import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import Dashboard_04 from "../components/IT22603418_Components/Dashboard_04";
import AddPatientProfile_03 from './IT22602978_Pages/AddPatientProfile_03';
import Patientprofile_03 from './IT22602978_Pages/PatientProfile_03';
import CreatePatientBooking from "./IT22602978_Pages/CreatePatientsBooking_03";


const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* payments */}
      {tab === "payments" && <DashPayments_03 />}

      {/* ScanQR */}
      {tab === "Dashboard_04" && <Dashboard_04 />}


       {/* add patients */}
       {tab === "addpatients" && <AddPatientProfile_03 />}

       {/* Patient Profile */}
       {tab === "patientprofile" && <Patientprofile_03 />}

       {/* Patient Booking */}
       {tab === "CreatePatientsBooking" && <CreatePatientBooking />}
      




    </div>
  );
};

export default Dashboard;
