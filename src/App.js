import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import ContactUs from './Pages/ContactUs/ContactUs';
import LoginHere from './Pages/LoginHere/LoginHere';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginHere />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
