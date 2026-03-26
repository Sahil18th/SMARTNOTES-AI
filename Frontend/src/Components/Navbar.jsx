import {Link} from 'react-router-dom'
import API from '../Api.js'
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleClick = async(e) =>
  {
    e.preventDefault();
    try {
      const res = await API.get('/logout');
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      alert("Logout failed ❌" + error.response?.data?.message);
    }
  }

  return (
    <div className='flex justify-between my-4 mx-10 gap-20 text-lg text-[#fff]'>
      <div className='items-center flex'>
        SmartNotes AI
      </div>
      <div className='flex gap-20'>
      <Link to='/home' className='px-3 py-1 rounded hover:bg-white/20 transition items-center flex'>Home</Link>
      <Link to='/library' className='px-3 py-1 rounded hover:bg-white/20 transition items-center flex'>My Library</Link>
      <Link to='/contact' className='px-3 py-1 rounded hover:bg-white/20 transition items-center flex'>Contact Us</Link>
      </div>
      <div>
        <button className='bg-red-500 p-2 rounded-md cursor-pointer hover:bg-red-700' onClick={handleClick}>Logout</button>
      </div>
      
    </div>
    
  )
}

export default Navbar
