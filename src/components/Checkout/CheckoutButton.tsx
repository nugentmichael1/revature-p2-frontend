import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

type CheckoutButtonProps = {
  courseId: number;
};

export default function CheckoutButton({ courseId }: CheckoutButtonProps) {
  const url = import.meta.env.VITE_API_URL;
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    id: 1,
    name: 'Java Course',
    description: 'Java Full Stack Course',
    price: 29900,
    quantity: 1,
  });
  const [text, setText] = useState('Enroll in Course Now');

  const getCourseData = async () => {
    if (state.user) {
      try {
        const response = await axios.get(`${url}/course/${courseId}`);
        if (response.headers['content-type'].includes('application/json')) {
          if (response.data) {
            const data = response.data;
            setCourseData({
              id: 1,
              name: data.name,
              description: data.description,
              price: data.price * 100,
              quantity: 1,
            });
          }
        } else {
          throw Error('Unexpected response type');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }
  };

  const handleCheckout = async () => {
    if (!state.user) {
      console.error('User not logged in.');
      navigate('/login');
      return;
    }

    try {
      setText('Processing...');
      const response = await axios.post(
        `${url}/transaction/checkout`,
        courseData,
      );
      if (response.data && response.data.url) {
        localStorage.setItem('revlearn-courseId', courseId.toString());
        window.location.href = response.data.url;
      } else {
        console.log('Enrollment processed, but no url to payment provided.');
      }
    } catch (error) {
      console.error('Error processing enrollment:', error);
      setText("Couldn't complete your enrollment. Try again later.");
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <button
      onClick={handleCheckout}
      className='w-fit rounded-md bg-primary-500 px-8 py-2 text-slate-100'
    >
      {text}
    </button>
  );
}
