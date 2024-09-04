import React from 'react';
import CourseNavBar from '../../components/CourseDetail/CourseNavBar';
import javaCourseImage from '../../assets/javacourse.png';
import CourseModule from '../../components/CourseModule/CourseModule';

const CoursePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-blue-200'>
      <div className='mx-auto grid max-w-7xl grid-cols-3 py-12'>
        <div className='col-span-2'>
          <img src={javaCourseImage} alt='Java Course' className='w-full' />
          <CourseNavBar />
        </div>
        <div>
          <CourseModule />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
