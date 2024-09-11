import React, { useEffect, useState } from 'react';
import CourseNavBar from '../../components/CourseDetail/CourseNavBar';
import javaCourseImage from '../../assets/javacourse.png';
import CourseModule from '../../components/CourseModule/CourseModule';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
// import { Course } from '../../types/course';
import { Module } from '../../types/module';
import axios from 'axios';

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  // const [course, setCourse] = useState<Course>();
  const [modules, setModules] = useState<Module[]>([]);

  const {
    state: { user },
  } = useAppContext();

  async function getModulesByCourseId() {
    const response = await axios.get<Module[]>(
      `${import.meta.env.VITE_API_URL}/course/${courseId}/modules`,
      { headers: { Authorization: user?.token } },
    );

    if (response.data) {
      setModules(response.data);
    }
  }

  // async function getCourseById() {
  //   const response = await axios.get<Course>(
  //     `${import.meta.env.VITE_API_URL}/course/${courseId}`,
  //     { headers: { Authorization: user?.token } },
  //   );

  //   console.log(response.data);
  //   if (response.data) {
  //     setCourse(response.data);
  //   }
  // }

  useEffect(() => {
    // getCourseById();
    getModulesByCourseId();
  }, []);

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='mx-auto grid max-w-7xl grid-cols-3 py-12'>
        <div className='col-span-2'>
          <img src={javaCourseImage} alt='Java Course' className='w-full' />
          <CourseNavBar />
        </div>
        <div>
          {modules
            ?.slice()
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map(m => <CourseModule module={m} key={m.id} />)}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
