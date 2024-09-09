import { FaUserCircle } from 'react-icons/fa';
import CourseCard from './CourseCard';
import { useEffect, useState } from 'react';
import { Course } from '../../types/course';
import axios from 'axios';

const MiddleSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses() {
    const response = await axios.get<Course[]>(
      `${import.meta.env.VITE_API_URL}/course`,
    );

    if (response.data) {
      setCourses(response.data);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className='col-span-3 flex flex-col items-center justify-start gap-8'>
      <div className='flex w-full items-center justify-between gap-4 rounded-lg p-4 shadow-2xl'>
        <FaUserCircle size={40} color='orange' />
        <input
          placeholder='Search...'
          className='w-full rounded-lg bg-slate-100 px-4 py-2 focus:outline-none'
        />
      </div>
      {courses.map(c => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
};

export default MiddleSection;
