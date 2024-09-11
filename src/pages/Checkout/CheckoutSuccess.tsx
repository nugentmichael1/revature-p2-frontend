import React from 'react';
import checkmark from '../../assets/checkmark.png';

const CheckoutSuccess: React.FC = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col items-center bg-gray-50'>
        <h1 className='mb-8 mt-20 flex items-center text-4xl font-bold'>
          <img src={checkmark} alt='success' className='mr-2 h-12 w-12'></img>
          Transaction Successful!
        </h1>
        <p className='mb-20 text-lg'>Thank you for supporting RevLearn!</p>
      </div>
    </>
  );
};

export default CheckoutSuccess;
