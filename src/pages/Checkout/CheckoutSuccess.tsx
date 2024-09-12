import React, { useEffect } from 'react';
import checkmark from '../../assets/checkmark.png';
import { useAppContext } from '../../contexts/AppContext';
import axios from 'axios';

const CheckoutSuccess: React.FC = () => {
  const { state } = useAppContext();

  // TODO: this is a workaround; it should either be handled on backend or the courseId should be passed as a query/url param NOT stored
  useEffect(() => {
    const courseIdStr = localStorage.getItem('revlearn-courseId');
    const courseId = courseIdStr ? parseInt(courseIdStr, 10) : null;
  
    if (courseId && state.user) {
      const enrollStudentInCourse = async () => {
        try {
          await axios.patch(`${import.meta.env.VITE_API_URL}/course/student/add`, {
            courseId: courseId,
            studentId: state.user?.id,
          }, {
            headers: {
              Authorization: state.user?.token,
            },
          });
        } catch (e) {
          console.error('Error enrolling student: ', e);
        } finally {
          localStorage.removeItem('revlearn-courseId');
        }
      };
      enrollStudentInCourse();
    }
  }, []);

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
