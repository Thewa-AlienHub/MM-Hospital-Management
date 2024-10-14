import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiArrowSmRight,
  HiUser,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { VscFeedback } from "react-icons/vsc";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FcFeedback } from "react-icons/fc";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsSendArrowDown } from "react-icons/bs";



const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  return (
    <Sidebar className="w-full md:w-56 shadow-md">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isPropertyAdmin && (
            <>
              <Link to="/dashboard?tab=propertyAdminDash">
                <Sidebar.Item
                  active={tab === "propertyAdminDash"}
                  icon={HiChartPie}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={
                currentUser.isAdmin
                  ? "Admin"
                  : currentUser.isStaff
                  ? "Staff"
                  : "User"
              }
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=adddoctors">
                <Sidebar.Item
                  active={tab == "adddoctors"}
                  icon={IoPersonAddSharp}
                  as="div"
                >
                  Add Doctors
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=alldoctors">
                <Sidebar.Item
                  active={tab == "alldoctors"}
                  icon={FaUserDoctor}
                  as="div"
                >
                  All Doctors
                </Sidebar.Item>
              </Link>
         
              <Link to="/dashboard?tab=peakTime">
                <Sidebar.Item
                  active={tab == "peakTime"}
                  icon={IoAnalyticsSharp}
                  as="div"
                >
                  Identify Peak Time
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=receivedFeedback">
                <Sidebar.Item
                  active={tab == "receivedFeedback"}
                  icon={VscFeedback}
                  as="div"
                >
                  Received Feedback
                </Sidebar.Item>
              </Link>
              
            </>
          )}
          {currentUser && (
          <>
           <Link to="/giveFeedback">
            <Sidebar.Item  icon={FcFeedback} as="div">
            Feedback
            </Sidebar.Item>
          </Link>

          </>
           )} 
      
          {!currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=myFeedback">
                <Sidebar.Item
                  active={tab === "myFeedback"}
                  icon={BsSendArrowDown}
                  as="div"
                >
                  My Feedback
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
