import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
           <h1 className='text-8xl  text-[#fff] text-center mt-13'>Read Smarter.<br/> Not Longer.<br/> Understand Faster.</h1>
           <p className='text-2xl text-[#fff] text-center mt-15'>SmartNotes AI instantly converts long content into clear, structured summaries — helping you learn faster and stay productive.</p>

           <Link to='/Summarize'>
           <button className="mt-15 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-700 hover:text-[#fff] cursor-pointer transition-all ease-in ">
            🚀 Start Summarizing for free
           </button>
           </Link>
    </div>
  )
}

export default Home
