import React from 'react';


const CheckoutSuccess: React.FC = () => {


    return (
        <>

        <div className="flex flex-col items-center justify-center h-screen bg-green-500">
            <h1 className="text-4xl font-bold text-white mb-4">Transaction Successful!</h1>
            <p className="text-lg text-white">Thank you for supporting RevLearn.</p>
        </div>

        </>
    );
};

export default CheckoutSuccess;