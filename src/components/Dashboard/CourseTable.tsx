import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import CourseProgressBar from '../CourseProgressBar/CourseProgressBar';

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
  const [studentProgress, setStudentProgress] = useState<{
    [key: number]: number;
  }>({});
  const {
    state: { user },
  } = useAppContext();
  const nav = useNavigate();
  const [courses, setCourses] = React.useState<Course[]>([]);
  // console.log('Role:', role, 'ID:', id);

  const getStudentProgress = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/progress/user/${user?.id}`,
      );
      const progressMap = res.data
        ? res.data.reduce((acc: { [key: number]: number }, item: any) => {
            acc[item.course.id] = item.completedProgress;
            return acc;
          }, {})
        : {};
      setStudentProgress(progressMap);
    } catch (e: any) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          role !== 'STUDENT'
            ? `${import.meta.env.VITE_API_URL}/user/${id}/taughtCourses`
            : `${import.meta.env.VITE_API_URL}/user/${id}/enrolledCourses`,
        );
        setCourses(response.data);
        // console.log('Courses:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
    getStudentProgress();
  }, []);

  return (
    <div className='rounded-lg bg-white p-6 shadow-lg'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-gray-800 text-orange-500'>
          {role === 'EDUCATOR' ? 'Courses Taught' : 'Courses Enrolled'}
        </h2>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            placeholder='Search'
            className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <select className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500'>
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
        </div>
      </div>
      <table className='bg-gray-80 min-w-full rounded-lg'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              Name
            </th>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              Description
            </th>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              Attendance Method
            </th>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              Start Date
            </th>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              End Date
            </th>
            <th className='px-4 py-3 text-left font-medium text-orange-500'>
              Module
            </th>
            {role === 'STUDENT' ? (
              <th className='px-4 py-3 text-left font-medium text-orange-500'>
                Progress
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => {
            const startDate = new Date(course.startDate);
            return (
              <tr
                key={index}
                className='border-b border-gray-200 hover:bg-gray-50'
              >
                <td className='px-4 py-3'>{course.name}</td>
                <td className='px-4 py-3'>{course.description}</td>
                <td className='px-4 py-3'>{course.attendanceMethod}</td>
                <td className='px-4 py-3'>
                  {startDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className='px-4 py-3'>
                  {new Date(course.endDate).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className='px-4 py-3'>
                  <button
                    onClick={() => {
                      if (role !== 'STUDENT') {
                        nav(`/dashboard/courses/${course.id}`);
                      } else {
                        nav(`/course/${course.id}`);
                      }
                    }}
                    className='rounded bg-orange-500 px-3 py-2 text-white transition hover:bg-blue-500'
                  >
                    View Course
                  </button>
                </td>
                {role === 'STUDENT' ? (
                  <td className='px-4 py-3'>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        startDate >= new Date() ? 'bg-green-500' : ''
                      } text-white`}
                    >
                      {startDate >= new Date() ? (
                        'Upcoming'
                      ) : (
                        <CourseProgressBar
                          progress={{
                            completedProgress: studentProgress[course.id]
                              ? studentProgress[course.id]
                              : 0,
                          }}
                        />
                      )}
                    </span>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
