// import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignUp from './Pages/SignUp/SignUp';
// import Login from './Pages/Login/Login';
// import Home from './Pages/Home/Home';
// import Dummy from './Pages/Home/Dummy';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/' element={<Home />} />
//         <Route path='/dummy' element={<Dummy />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Dummy from './Pages/Home/Dummy';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart/Cart';
import ContactUs from './Pages/ContactUs/ContactUs';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/dummy' element={<Dummy />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
