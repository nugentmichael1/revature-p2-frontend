import React from 'react';


const CheckoutSuccess: React.FC = () => {


    return (
        <>

        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <h1 className="mt-20 mb-8 text-4xl font-bold flex items-center">
                <img src="/src/assets/checkmark.png" alt="success" className="w-12 h-12 mr-2"></img> 
                Transaction Successful!
            </h1>
            <p className="text-lg mb-20">Thank you for supporting RevLearn!</p>
        </div>

        </>
    );
};

export default CheckoutSuccess;