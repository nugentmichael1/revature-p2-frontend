import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

interface Course {
    id: number;
}

interface Student {
    firstName: string;
    lastName: string;
}

const Students: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>(); 
    const [students, setStudents] = useState<Student[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const {
        state: { user },
    } = useAppContext();

    useEffect(() => {
        const fetchStudents = async () => {

            try {
                
                console.log('Token:', user?.token);

                const headers = {
                    headers: {
                        Authorization: user?.token 
                    },
                };

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/course/${courseId}/students`, headers);
                setStudents(response.data);
            } catch (err) {
                setError('No Students Enrolled in Course');
            }
        };

        if (courseId && user?.token) {
            fetchStudents();
        }
    }, [courseId, user?.token]); 

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Students</h1>
            {students.length > 0 ? (
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            {student.firstName} {student.lastName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No students enrolled in this course.</p>
            )}
        </div>
    );
};

export default Students;