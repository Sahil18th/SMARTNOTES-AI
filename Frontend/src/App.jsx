import React from 'react'
import Home from './Components/Home'
import Library from './Components/Library'
import Contact from './Components/Contact'
import Layout from './Layout/Layout'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Main from './Components/Summarize'
import Login from './Pages/Login'
import Summarize from './Components/Summarize'
import ProtectedRoute from './Components/protectedRoutes'


function App() {
  return (
    <div>
      {/* <Layout>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/library' element={<Library/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/main' element={<Main/>}></Route>
      </Routes>
      </Layout> */}

     <Routes>

      {/* Login page without layout */}
      <Route path='/' element={<Login/>} />

      {/* Pages with layout */}
      <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path='/home' element={<Home/>} />
        <Route path='/summarize' element={<Summarize/>} />
        <Route path='/library' element={<Library/>} />
        <Route path='/contact' element={<Contact/>} />
      </Route>

    </Routes>
    </div>
  )
}

export default App



