// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LoginSignup from '../pages/login-signup.jsx';

// export default function AllRoutes() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/login" element={<LoginSignup/>} />
//       </Routes>
//     </div>
//   );
// }

import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginSignup from '../pages/login-signup'
import Home from "../pages/home"
import Navbar from "../pages/navbar"
import Footer from "../pages/footer"
export default function AllRoutes() {
    return (
        <div>
      <Routes>
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/nav" element={<Navbar/>}/>
        <Route path="/footer" element={<Footer/>}/>
      </Routes>
        </div>
    )
}