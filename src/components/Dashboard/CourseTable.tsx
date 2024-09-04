import React from 'react';
import axios from 'axios';

interface Course {
  name: string;
  instructor: string;
  phone: string;
  email: string;
  grade: string;
  status: string;
}

interface CourseTableProps {
  role: string | undefined;
  
}

const CourseTable: React.FC<CourseTableProps> = ({ role }) => {
  const [courses, setCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/user/1`);
        setCourses(response.data);
        console.log('Courses:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{role === 'EDUCATOR' ? 'Courses Taught' : 'Courses Enrolled'}</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md p-2 mr-4"
          />
          <select className="border border-gray-300 rounded-md p-2">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Course</th>
            <th className="py-2">Instructor</th>
            <th className="py-2">Phone Number</th>
            <th className="py-2">Email</th>
            <th className="py-2">Grade</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{course.name}</td>
              <td className="py-2">{course.instructor}</td>
              <td className="py-2">{course.phone}</td>
              <td className="py-2">{course.email}</td>
              <td className="py-2">{course.grade}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    course.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {course.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
