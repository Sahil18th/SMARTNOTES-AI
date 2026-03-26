
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Login from '../Pages/Login'
import { Route, Routes } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <div className='min-h-screen bg-gradient-to-br from-gray-950 to-blue-800  overflow-y-hidden'>
        {/* <Login/> */}
        <Navbar/>
        {/* <div className="w-[100%] h-[1px] mx-auto mb-4 bg-gradient-to-r from-transparent via-white to-transparent"></div> */}
        <main className='flex-1 flex items-center justify-center'>
{/* {children} */}
<Outlet/>
        </main>
          
      </div>
    </div>
  )
}

export default Layout
