import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Dummy from './Pages/Home/Dummy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<SignUp />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/dummy' element={<Dummy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
