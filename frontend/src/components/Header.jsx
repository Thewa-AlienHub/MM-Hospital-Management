import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useEffect, useState } from "react";
import MM from '/logonew.png'

const Header = () => {
   const path = useLocation().pathname;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useSelector((state) => state.user);
   const { theme } = useSelector((state) => state.theme);
   const [searchTerm, setSearchTerm] = useState('');

   const handleSignout = async () => {
       try {
           const res = await fetch('/api/user/signout', {
               method: 'POST',
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

   const handleSubmit = (e) => {
       e.preventDefault();
       const urlParams = new URLSearchParams(window.location.search);
       urlParams.set('searchTerm', searchTerm);
       const searchQuery = urlParams.toString();
       navigate(`/searchApartments?${searchQuery}`);
   };

   useEffect(() => {
       const urlParams = new URLSearchParams(window.location.search);
       const searchTermFromUrl = urlParams.get('searchTerm');
       if (searchTermFromUrl) {
           setSearchTerm(searchTermFromUrl);
       }
   }, [location.search]);


  return (
    <Navbar className="border-b-1 sticky top-0 bg-blue-800 shadow-md z-20 rounded-[20px] mt-4 mx-10">
      <Link to='/' className="self-center">
         <img src={MM} alt="logo" width='80' />
      </Link>
      <form onSubmit={handleSubmit}>
         <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline rounded-2xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
         <AiOutlineSearch/>
      </Button>
      <div  className="flex gap-2 md:order-2">
         <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
         </Button>
         {
            currentUser ? (
               <Dropdown
               arrowIcon={false} inline
               label={<Avatar img={currentUser.profilePicture} alt="user" rounded/>}>
                  <Dropdown.Header>
                     <span className="block text-sm">@{currentUser.username}</span>
                     <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to='/dashboard?tab=profile'>
                     <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
               </Dropdown>
            ) : (
               <div className="flex flex-row">
                   <Link to='/sign-in'>
                  <Button gradientDuoTone='purpleToBlue' outline>
                     Sign In
                  </Button>
               </Link>
               

               </div>
              
            )
         }
         <Navbar.Toggle className="text-sm"/>
      </div>
         <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
               <Link to='/' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200 ">Home</Link>
            </Navbar.Link>
            {
               currentUser && (
                  <>
                     <Navbar.Link active={path === '/service-User:serviceID'} as={'div'}>
                        <Link to='/service-User:serviceID' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200">Services</Link>
                     </Navbar.Link>
                     
                  </>
               )
            }
            
            {
               currentUser && (
                  <>
                  <Navbar.Link active={path === '/booking'} as={'div'}>
                      <Link to='/booking' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200">Doctor Booking</Link>
               </Navbar.Link>
                  
                     
                  </>
               )
            }
            
            <Navbar.Link active={path === '/about'} as={'div'}>
               <Link to='/about' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200">About</Link>
            </Navbar.Link>
            {/* <Navbar.Link active={path === '/projects'} as={'div'}>
               <Link to='/projects' className="hover:text-orange-500 active:text-orange-600 hover:underline">Projects</Link>
            </Navbar.Link> */}
            <Navbar.Link active={path === '/team'} as={'div'}>
               <Link to='/team' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200">Our Team</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/contact'} as={'div'}>
               <Link to='/contact' className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200">Contact Us</Link>
            </Navbar.Link>
            

                        <Navbar.Collapse>
               {currentUser && currentUser.isLabAsistant ? (
                   // If the user is a lab assistant, show these links
                   <>

                       <Navbar.Link active={path === '/'} as={'div'}>
                           <Link
                               to="/"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Home
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/'} as={'div'}>
                           <Link
                               to="/lab-asist-dashboard"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Lab Dashboard
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/lab-reports'} as={'div'}>
                           <Link
                               to="/report-find"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Lab Reports
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/lab-reports'} as={'div'}>
                           <Link
                               to="/report-find"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Scan QR
                           </Link>
                       </Navbar.Link>
                   </>
               ) : (
                   // If the user is not a lab assistant, show regular links
                   <>
                       <Navbar.Link active={path === '/'} as={'div'}>
                           <Link
                               to="/"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Home
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/service-User:serviceID'} as={'div'}>
                           <Link
                               to="/service-User:serviceID"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Services
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/about'} as={'div'}>
                           <Link
                               to="/about"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               About
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/team'} as={'div'}>
                           <Link
                               to="/team"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Our Team
                           </Link>
                       </Navbar.Link>
                       <Navbar.Link active={path === '/contact'} as={'div'}>
                           <Link
                               to="/contact"
                               className="hover:text-blue-300 active:text-blue-600 hover:underline text-blue-200"
                           >
                               Contact Us
                           </Link>
                       </Navbar.Link>
                   </>
               )}
           </Navbar.Collapse>
       </Navbar>
   );
};

export default Header;

