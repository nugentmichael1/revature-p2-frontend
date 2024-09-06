import React from 'react';
import axios from 'axios';
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from 'react-router-dom';


const CheckoutButton: React.FC = () => {

    const url = import.meta.env.VITE_API_URL;
    const { state } = useAppContext();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!state.user) {
            console.error('User not logged in.');
            navigate('/login');
            return;
        }

        // TODO: Implement actual course data
        const data = {
            id: state.user.id,
            name: "Java Course",
            description: "Java Full Stack Course",
            price: 29900,
            quantity: 1
        };

        try {
            const response = await axios.post(`${url}/transaction/checkout`, data);
            if (response.data && response.data.url) {
                window.location.href = response.data.url;
            } else {
                console.log('Enrollment processed, but no url to payment provided.');
            }
        } catch (error) {
            console.error('Error processing enrollment:', error);
        }
    };

    return (
        <button onClick={handleCheckout} className="w-fit rounded-md bg-primary-500 px-8 py-2 text-slate-100">
            Enroll in Course Now
        </button>
    );
};

export default CheckoutButton;
