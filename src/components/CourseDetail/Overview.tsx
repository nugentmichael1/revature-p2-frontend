import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Course {
    id: number
    name: string;
    description: string;
}

const Overview: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>(); 
    const [course, setCourse] = useState<Course | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/course/${courseId}`);
                setCourse(response.data);
            } catch (err) {
                setError('Course does not exist');
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">{course?.name}</h1>
            <p>{course?.description}</p>
        </div>
    );
};

export default Overview;