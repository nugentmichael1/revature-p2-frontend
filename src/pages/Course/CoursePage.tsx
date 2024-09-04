import React from 'react';
import CourseNavBar from '../../components/CourseDetail/CourseNavBar';
import javaCourseImage from '../../assets/javacourse.png';

const CoursePage: React.FC = () => {
    return (
        <div className="h-screen bg-blue-200">
            <div className="grid grid-cols-12">
                <div className="col-span-3"></div>
                <div className="col-span-6 mt-12">
                    <img src={javaCourseImage} alt="Java Course" className="w-full" />
                    <CourseNavBar />
                </div>
                <div className="col-span-3"></div>
            </div>
        </div>
    );
};

export default CoursePage;