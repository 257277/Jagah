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
import Hotel from "../pages/hotel"
import Booking from "../pages/booking"
import Property from '../pages/property'
import AddProperty from "../pages/addProperty"
import SeeSelfproperty from '../pages/SeeSelfproperty'
export default function AllRoutes() {
    return (
        <div>
      <Routes>
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/nav" element={<Navbar/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/property" element={<Property/>}/>
        <Route path="/Addproperty" element={<AddProperty/>}/>
        <Route path="/seeSelfProperty" element={<SeeSelfproperty/>}/>
      </Routes>
        </div>
    )
}