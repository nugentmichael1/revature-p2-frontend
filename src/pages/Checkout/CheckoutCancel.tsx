import React, { useEffect } from 'react';



const CheckoutCancel: React.FC = () => {
    useEffect(() => {
        localStorage.removeItem('revlearn-courseId');
    },[]);

    return (
        <>

        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <h1 className="text-4xl font-bold mb-4 mt-20">Checkout Failed</h1>
            <p className="text-lg mb-2">We're sorry, but your checkout process has failed.</p>
            <p className="text-lg mb-20">Please try again later or contact customer support for assistance.</p>
        </div>

        </>
    );
};

export default CheckoutCancel;
