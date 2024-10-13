import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdOutlineHomeWork } from "react-icons/md";
import {
  HiArrowSmRight,
  HiDocument,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiShoppingBag,
  HiUser,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GrResources } from "react-icons/gr";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdAddHomeWork } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { BsPersonPlusFill } from "react-icons/bs";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import { MdAnnouncement } from "react-icons/md";
import { CiGrid31 } from "react-icons/ci";
import { FaCar } from "react-icons/fa";



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
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={
                currentUser.isAdmin
                  ? "Admin"
                  : currentUser.isDoctor
                  ? "Doctor"
                  : "User"
              }
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isDoctor && (
            <>
              <Link to="/dashboard?tab=Dashboard_04">
                <Sidebar.Item
                  active={tab === "Dashboard_04"}
                  icon={IoChatbubbleEllipses}
                  as="div"
                >
                  Dashboard
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
