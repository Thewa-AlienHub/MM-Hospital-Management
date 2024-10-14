import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({})
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [loading, setLoading] = useState(false)
  const {loading, error: errorMessage} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
  console.log(data.isLabAsistant);
  
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        if (data.isLabAsistant) {
          navigate('/lab-asist-dashboard');
        } else {
          navigate('/');
        }
        toast.success('User logged in successfully');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  
  
  return (
    <div className="min-h-screen mt-20">
      <h1 className='text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300'>Login to your account</h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 md:gap-20">
        {/* left side */}
        <div className="flex-1">
          <img src="Login.png" alt="signIn" width={550} className="mx-auto" />
          <p className="text-sm font-semibold capitalize mb-5">Step into the heart of your home. Sign in to Cleansy and let the simplicity begin. Your apartment, your rules, effortlessly managed. Ready to dive in?</p>
          <Link to='/' className="self-center">
            <img src="logonew.png" alt="logo" width='150' />
          </Link>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="name@gmail.com" id="email" onChange={handleChange} />
            </div>
            <div className="relative">
              <Label value="Your Password"/>
              <TextInput type={showPassword ? "text" : "password"} placeholder="*************" id="password" onChange={handleChange} />
              {showPassword ? (<BsFillEyeSlashFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>) : (<BsFillEyeFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>)}
            </div>
            <Button type="submit"  className="uppercase bg-blue-600" disabled={loading}>
              {loading ? <><Spinner size='sm'/><span className="pl-3">Loading...</span></> : 'Sign In'}
            </Button>
            <div className='flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className="text-blue-700 font-semibold">Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-7 py-3 bg-gradient-to-r from-red-100 via-red-300 to-red-400 shadow-shadowOne text-center text-red-600 text-base tracking-wide animate-bounce">{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn