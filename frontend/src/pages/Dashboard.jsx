import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import ReceivedFeedback from "../components/IT22114044_Components/ReceviedFeedback";
import PeakTimeAnalysis from "../components/IT22114044_Components/PeakTimeAnalysis";
import DoctorAdd from "../components/IT22114044_Components/DoctorAdd";
import AllDoctors from "../components/IT22114044_Components/AllDoctors";
import MyFeedback from "../components/IT22114044_Components/My Feedback";


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

      {/* admin side feedback */}

      {tab === "receivedFeedback" && <ReceivedFeedback />}
      {tab === "peakTime" && <PeakTimeAnalysis />}
      {tab === "adddoctors" && <DoctorAdd />}
      {tab === "alldoctors" && <AllDoctors />}
      {tab === "myFeedback" && <MyFeedback />}



    </div>
  );
};

export default Dashboard;
