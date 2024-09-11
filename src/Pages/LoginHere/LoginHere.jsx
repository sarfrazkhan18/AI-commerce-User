// import React from 'react'
// import Login from '../Login/Login'
// import Navbar from '../../Components/Navbar/Navbar'
// import { useNavigate } from 'react-router-dom'

// const LoginHere = () => {
//     const navigate = useNavigate()
//     return (
//         <div>
//             <Navbar />
//             <div className=' grid grid-cols-3 h-screen'>
//                 <div className=' grid col-span-2 bg-white'>
//                     <Login />
//                 </div>
//                 <div className='grid col-span-1 bg-[#bc2b43] h-screen place-items-center'>
//                     <div className='flex flex-col items-center text-center'>
//                         <h1 className=' text-2xl text-white font-bold'> New Here ?</h1>

//                         <h1 className=' text-xm text-white '> Sign up here and discover the unlimited designs</h1>
//                         <button type="submit" className=" py-2 px-3 bg-white text-black font-semibold rounded-md mt-4 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             onClick={() => navigate('/signup')}
//                         >Sign Up</button>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default LoginHere


import React from 'react';
import Login from '../Login/Login';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const LoginHere = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-1 md:grid-cols-3 h-screen'>
                {/* Content for Login Section */}
                <div className='grid col-span-1 md:col-span-2 bg-white'>
                    <Login />
                </div>
                {/* Content for Sign Up Section */}
                <div className='grid col-span-1 bg-[#bc2b43] max-sm:py-12 h-full md:h-screen place-items-center'>
                    <div className='flex flex-col items-center text-center p-4 md:p-0'>
                        <h1 className='text-xl md:text-2xl text-white font-bold'>New Here?</h1>
                        <h1 className='text-sm md:text-base text-white mt-2'>
                            Sign up here and discover the unlimited designs
                        </h1>
                        <button
                            type='submit'
                            className='py-2 px-3 bg-white text-black font-semibold rounded-md mt-4 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginHere;
