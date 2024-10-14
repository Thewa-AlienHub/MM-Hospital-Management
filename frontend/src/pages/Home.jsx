import { Cursor, useTypewriter } from 'react-simple-typewriter'
import bannerImg from '/bannerImg.jpg'
import MMSite from '/MMSite.jpg'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'



const Home = () => {
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [text] = useTypewriter({
    words: ["Healing hearts, one patient at a time. ...", "Where hope meets healing. ...", "Compassionate care that makes a difference. ...", "Inspiring wellness, one post at a time..."],
    loop: true,
    typeSpeed: 60,
    deleteSpeed: 40,
    delaySpeed: 2000,
  })

  

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    // const res = await fetch(`/api/apartmentListing/getListings?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
       setShowMore(false);
    }
    setListings([...listings, ...data]);
  }

  return (
    <div>
      {/* banner section */}
      <img src={bannerImg} alt="" className='object-cover relative opacity-55 dark:opacity-40 h-screen w-full rounded-3xl mt-5 mx-5'/>
      <div className='flex justify-center'>
        <div className="flex flex-col gap-6 p-28 px-3 max-w-full mx-auto absolute top-20 md:top-28 ">
        {/* <h1 className='text-slate-700 dark:text-teal-500 font-bold text-3xl lg:text-6xl text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>Cleansy Facility Management Services .</h1> */}
        {/* <img src={Cleansy_Full} alt="" className='h-auto' /> */}
        {/* <h3 className="text-orange-500 font-bold text-3xl text-center font-mono [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">"Nothing Is Impossible"</h3> */}
        <h1 className='text-center text-slate-700 text-3xl lg:text-9xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_80%)] homeText'>MASTER MIND HOSPITAL MANAGEMENT</h1>
        <h2 className='text-center text-red-600 text-3xl lg:text-4xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] homeText'>Dedicated to providing exceptional care.</h2>
        <h3 className='text-xl md:text-3xl font-bold text-center [text-shadow:_5_30px_0_rgb(50_50_10_/_100%)] text-slate-100 homeText'>We Create <span className='text-blue-300 font-mono [text-shadow:_0_40px_0_rgb(0_0_0_/_100%)] homeText'>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff0000"
          /></h3>
          <div className='flex justify-center'>
          <Button className='w-[650px] rounded-2xl bg-gradient-to-r from-black to-blue-500'>
            <a href="#listing" className='transition duration-200 ease-in-out'>
              Get Started
            </a>
          </Button>
          </div>
      </div>
      </div>
      
      {/* card section */}
      <div className="p-3 bg-blue-100 dark:bg-slate-700 rounded-3xl mt-5 mx-5">
          <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center rounded-2xl">
            <div className="flex justify-center flex-col flex-1">
              <h2 className="text-2xl">Want To Get More Details About Cleansy</h2>
              <p className="text-gray-500 my-2">Checkout Our WebSite</p>
              <Button gradientDuoTone='cyanToBlue' className='rounded-xl '>
                <a href="https://#/" target='_blank' rel='noopener noreferrer'>MasterMind</a>
              </Button>
            </div>
            <div className="flex-1 p-7">
              <img src={MMSite} alt="" className='rounded-md opacity-80'/>
            </div>
          </div>
      </div>
      {/* listing section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10' id='listing'>
        <div>
          <h2 className='text-2xl font-semibold text-slate-600'>Book Your Doctor</h2>
          <Link className='text-sm text-blue-800 hover:underline' to={'/searchApartments'}>Show more listing</Link>
        </div>
        <div className="p-7 flex flex-wrap gap-4">
          {listings && listings.length > 0 && (
            listings.map((listing) => (
              <ApartmentListingCard_02 key={listing._id} listing={listing} />
            ))
          )}
          {showMore && (
            <button onClick={onShowMoreClick} className='text-teal-500 hover:underline p-7 text-center w-full'>Show More</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home