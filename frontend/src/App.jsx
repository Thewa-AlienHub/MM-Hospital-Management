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
import SignInQR from "./pages/IT22602978_Pages/SignInQR_03";
import GiveFeedback from "./components/IT22114044_Components/GiveFeedback";




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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-in-QR"element={<SignInQR/>}/>
            <Route path="/sign-up" element={<SignUp />} />
           
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      
           
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path='/create_04' element={<RequestLeave_04/>}/>
              <Route path='/delete_04' element={<RequestDetails_04/>}/> */}
           

           <Route path="/giveFeedback" element={<GiveFeedback />} />
            
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
