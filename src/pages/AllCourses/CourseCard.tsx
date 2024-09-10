import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import javaScriptLogo from '../../assets/JavaScript-logo.png';
import { Course } from '../../types/course';

type Props = {
  course: Course;
};

const CourseCard = ({ course }: Props) => {
  const nav = useNavigate();

  function convertDate(input: string) {
    const date = new Date(input);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <div
      className='flex w-full items-center gap-4 rounded-lg p-4 shadow-2xl hover:cursor-pointer hover:-translate-y-1'
      onClick={() => {
        nav(`/course/${course.id}`);
      }}
    >
      <img src={javaScriptLogo} alt='javascript' className='w-40' />
      <div className='flex h-full grow flex-col justify-between pb-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-bold text-primary-500'>
                {course.name}
              </h3>
              <p className='text-sm'>{course.description}</p>
            </div>
            <p className='w-32 text-right text-xl font-bold'>
              {course.price} $
            </p>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <FaUserCircle size={40} color='orange' />
            <div>
              {course.educators?.map(e => 
                <p className="text-sm">{e.firstName} {e.lastName}</p>
            )}
              {/* <p className='text-xs text-slate-400'>
                Last updated: a minute ago
              </p> */}
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 text-sm'>
            {course.startDate && <p>Start: {convertDate(course.startDate)}</p>}
            {course.endDate && <p>End: {convertDate(course.endDate)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
