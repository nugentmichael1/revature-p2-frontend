import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  name: string;
  description: string;
  attendanceMethod: string;
  startDate: Date;
  endDate: Date;
}

interface CourseTableProps {
  role: string | undefined;
  id: number | undefined;
}

const CourseTable: React.FC<CourseTableProps> = ({ role, id }) => {
  const nav = useNavigate();
  const [courses, setCourses] = React.useState<Course[]>([]);
  console.log('Role:', role, 'ID:', id);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          role !== 'STUDENT'
            ? `http://localhost:8080/api/v1/user/${id}/taughtCourses`
            : `http://localhost:8080/api/v1/user/${id}/enrolledCourses`,
        );
        setCourses(response.data);
        console.log('Courses:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className='rounded-lg bg-white p-4 shadow'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>
          {role === 'EDUCATOR' ? 'Courses Taught' : 'Courses Enrolled'}
        </h2>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Search'
            className='mr-4 rounded-md border border-gray-300 p-2'
          />
          <select className='rounded-md border border-gray-300 p-2'>
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
        </div>
      </div>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2'>Name</th>
            <th className='py-2'>Description</th>
            <th className='py-'>Attendance Method</th>
            <th className='py-2'>StartDate</th>
            <th className='py-2'>EndDate</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => {
            const startDate = new Date(course.startDate);
            return (
              <tr key={index} className='text-center'>
                <td className='py-2'>{course.name}</td>
                <td className='py-2'>{course.description}</td>
                <td className='py-2'>{course.attendanceMethod}</td>
                <td className='py-2'>
                  {startDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className='py-2'>
                  {new Date(course.endDate).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className='py-2'>
                  <button
                    onClick={() => nav(`/dashboard/courses/${course.id}`)}
                    className='rounded bg-purple-600 px-2 py-1 text-white'
                  >
                    View Module
                  </button>
                </td>
                <td className='py-2'>
                  <span
                    className={`rounded-full px-2 py-1 text-white ${
                      startDate >= new Date() ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {startDate >= new Date() ? 'Upcoming' : 'Ongoing'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
