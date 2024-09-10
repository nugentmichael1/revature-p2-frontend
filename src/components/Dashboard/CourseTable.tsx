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
  const [studentProgress, setStudentProgress] = useState<{ [key: number]: number }>({});
  const { state: { user } } = useAppContext();
  const nav = useNavigate();
  const [courses, setCourses] = React.useState<Course[]>([]);
  console.log('Role:', role, 'ID:', id);

  const getStudentProgress = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/progress/user/${user?.id}`);
      const progressMap = res.data ? res.data.reduce((acc: { [key: number]: number }, item: any) => {
        acc[item.course.id] = item.completedProgress;
        return acc;
      }, {}) : {};
      setStudentProgress(progressMap);
    } catch (e: any) {
      console.log(e);
    }
  }


  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(role === 'EDUCATOR' ? `${import.meta.env.VITE_API_URL}/user/${id}/taughtCourses`
          : `${import.meta.env.VITE_API_URL}/user/${id}/enrolledCourses`);
        setCourses(response.data);
        console.log('Courses:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    

    fetchCourses();
    getStudentProgress();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        {role === 'EDUCATOR' ? 'Courses Taught' : 'Courses Enrolled'}
      </h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none">
          <option>Sort by: Newest</option>
          <option>Sort by: Oldest</option>
        </select>
      </div>
    </div>
    <table className="min-w-full bg-gray-80 rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Description</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Attendance Method</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Start Date</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">End Date</th>
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Module</th>
          {role === "STUDENT" ?
          <th className="py-3 px-4 text-left text-gray-600 font-medium">Progress</th>
          :
          <></>
          }
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => {
          const startDate = new Date(course.startDate);
          return (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{course.name}</td>
              <td className="py-3 px-4">{course.description}</td>
              <td className="py-3 px-4">{course.attendanceMethod}</td>
              <td className="py-3 px-4">
                {startDate.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </td>
              <td className="py-3 px-4">
                {new Date(course.endDate).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => nav(`/module/${course.id}`)}
                  className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  View Module
                </button>
              </td>
              {role === "STUDENT" ? 
              <td className="py-3 px-4">
                <span
                  className={
                    `px-3 py-1 rounded-full text-sm font-medium ${
                    startDate >= new Date() ? 'bg-green-500' : ''
                  } text-white`
                }
                >
                  {startDate >= new Date() ? 'Upcoming' : 
                  <CourseProgressBar progress={{ completedProgress: studentProgress[course.id] ? studentProgress[course.id] : 0 }}/>
                  }
                </span>
              </td>
            :
            <></> 
            }
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  
  );
};

export default CourseTable;
