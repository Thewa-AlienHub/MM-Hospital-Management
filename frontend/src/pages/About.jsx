import aboutUS from '/aboutUS.jpg'

const About = () => {
  return (
    <div className="p-3 bg-blue-100 dark:bg-slate-700 min-h-screen border border-teal-500 rounded-3xl  m-5">
          <h1 className='text-3xl text-center mt-6 font-extrabold underline '>About MasterMind Hospital</h1>
          <h1 className='text-center my-2 text-2xl font-semibold'>At Master Mind , we turn care into precision, creating spaces where excellence thrives.</h1>
          <div className="flex flex-col sm:flex-row p-3  justify-center items-center rounded-tl-3xl rounded-br-3xl">
            <div className="flex justify-center flex-col flex-1 mx-10 bg-blue-200 py-6 px-6 rounded-xl">
              <h2 className="text-3xl font-semibold">We provide great services </h2>
              <p className="text-gray-500 my-10  text-justify font-semibold">
              Welcome to Master Mind , where compassionate care meets medical excellence. Our dedicated team of healthcare professionals is committed to providing personalized, cutting-edge treatments in a warm and healing environment. With state-of-the-art facilities and a patient-centered approach, we prioritize your well-being, ensuring the highest standards of safety and comfort. At [Hospital Name], your health is our mission.</p>
            </div>
            <div className="flex-1 p-7">
              <img src={aboutUS} alt="" className='rounded-md'/>
            </div>
          </div>
      </div>
  )
}

export default About