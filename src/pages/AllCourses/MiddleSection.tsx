import { FaUserCircle } from 'react-icons/fa';
import CourseCard from './CourseCard';

const MiddleSection = () => {
  return (
    <div className='col-span-3 flex flex-col items-center justify-start gap-8'>
      <div className='flex w-full items-center justify-between gap-4 rounded-lg p-4 shadow-2xl'>
        <FaUserCircle size={40} color='orange' />
        <input
          placeholder='Search...'
          className='w-full rounded-lg bg-slate-100 px-4 py-2 focus:outline-none'
        />
      </div>
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
};

export default MiddleSection;
