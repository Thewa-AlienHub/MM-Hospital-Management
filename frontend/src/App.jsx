import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop_02 from "./components/ScrollToTop_02";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

import Medications_04 from "./pages/IT22603418_Pages/Medications_04";
import LabTest_04 from "./pages/IT22603418_Pages/LabTest_04";
import Dashboard_04 from "./components/IT22603418_Components/Dashboard_04";

import GetReport from "./pages/IT22084668_Pages/GetReport"
import LabAsistantDashboard from "./pages/IT22084668_Pages/LabAsistantDashboard";
import ReportFind from "./pages/IT22084668_Pages/ReportFind"
import BookingHistory_03 from './pages/IT22602978_Pages/BookingHistory_03';




function App() {
  return (
    <>
      <Router>
        <ScrollToTop_02 />
        <Header />

        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<BookingHistory_03/>} />
            <Route path="/sign-in" element={<SignIn />} />
            
            <Route path="/sign-up" element={<SignUp />} />
           
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lab-asist-dashboard" element={<LabAsistantDashboard />} />
              <Route path="/get-report/:id" element={<GetReport />} />
              <Route path="/report-find" element={<ReportFind />} />
        </Route>
      
           {/* Thewan */}
           

            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/medications/:patientId"
              element={<Medications_04 />}
            />
            <Route path="/lab-tests/:patientId" element={<LabTest_04 />} />
            <Route path="/scanQR_04" element={<Dashboard_04 />} />
          </Routes>
        </div>

        <Footer />
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
