import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

const CreateCourseForm = () => {
  const [course, setCourse] = useState({
    startDate: '',
    endDate: '',
    name: '',
    description: '',
    attendanceMethod: '',
    price: 0,
  });
  const {
    state: { user },
  } = useAppContext();

  const nav = useNavigate();

  const handleInput = (event: any) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const headers = {
      headers: {
        Authorization: user?.token,
      },
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/course`, course, headers)
      .then(() => nav('/dashboard'))
      .catch((error: any) => console.error(error));
  };

  return (
    <div className='h-screen bg-slate-50'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3'>{/* Navbar */}</div>
        <div className='col-span-6 mt-40'>
          <div className='relative rounded-lg border border-4 bg-white shadow'>
            <div className='flex items-start justify-between rounded-t border-b p-5'>
              <h3 className='text-xl font-semibold text-gray-900'>
                Create a Course
              </h3>
            </div>
            <div className='space-y-6 p-6'>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='name'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      Course Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      onChange={handleInput}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      placeholder='Java'
                      required
                    ></input>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='startDate'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      Start Date
                    </label>
                    <input
                      type='date'
                      name='startDate'
                      id='startDate'
                      onChange={handleInput}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      required
                    ></input>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='endDate'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      End Date
                    </label>
                    <input
                      type='date'
                      name='endDate'
                      id='endDate'
                      onChange={handleInput}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      required
                    ></input>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='attendanceMethod'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      Attendance Method
                    </label>
                    <select
                      name='attendanceMethod'
                      id='attendanceMethod'
                      onChange={handleInput}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      required
                    >
                      <option value=''>Select Method</option>
                      <option value='ONLINE'>Online</option>
                      <option value='IN_PERSON'>In Person</option>
                      <option value='HYBRID'>Hybrid</option>
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='price'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      Price
                    </label>
                    <input
                      type='number'
                      name='price'
                      id='price'
                      onChange={handleInput}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      placeholder='$2300'
                      required
                    ></input>
                  </div>
                  <div className='col-span-full'>
                    <label
                      htmlFor='description'
                      className='mb-2 block text-sm font-medium text-gray-900'
                    >
                      Course Details
                    </label>
                    <textarea
                      name='description'
                      id='description'
                      onChange={handleInput}
                      rows={3}
                      className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                      placeholder='Details'
                    ></textarea>
                  </div>
                </div>
                <div className='rounded-b border-t border-gray-200 p-6'>
                  <div className='flex justify-end'>
                    <button
                      className='rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200'
                      type='submit'
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='col-span-3'>{/* Sidebar */}</div>
      </div>
    </div>
  );
};

export default CreateCourseForm;
