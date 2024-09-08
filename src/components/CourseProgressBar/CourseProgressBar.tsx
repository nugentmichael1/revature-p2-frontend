import React from 'react';

interface CourseProgressBarProps {
  progress: number;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default CourseProgressBar;