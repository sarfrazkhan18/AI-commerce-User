import React, { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';


const Address = "Ankersgade 12C, 1, 8000 Aarhus"
const PhoneNo = "+45 71 99 77 07"
const Email = "mail@sleeknote.com"

const ContactUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className="bg-beige-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-green-600 text-sm mb-2">How can we help you?</h2>
                    <h1 className="text-3xl font-bold mb-4">Contact us</h1>
                    <p className="text-gray-700 mb-8">
                        We're here to help and answer any questions you might have. We look forward to hearing from you!
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <MapPin />
                            <span className="text-gray-700 ml-4">{Address}</span>
                        </div>
                        <div className="flex items-center">
                            <Phone />
                            <span className="text-gray-700 ml-4 hover:underline">{PhoneNo}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail />
                            <span className="text-gray-700 ml-4">{Email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
