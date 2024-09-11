import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import Students from './Students';
import DiscussionBoard from '../Discussions/DiscussionBoard';
import CheckoutButton from '../Checkout/CheckoutButton';
import { useAppContext } from '../../contexts/AppContext';

const CourseNavBar: React.FC = () => {
    const [active, setActive] = useState("Overview");
    const [isEnrolled] = useState(false);
    const { courseId } = useParams();

    const {
        state: { user }, 
    } = useAppContext();

    return (
        <div>
            <div className="flex justify-between items-center bg-gray-200 p-4">
                <div className="flex space-x-4">
                    <nav>
                        <button onClick={() => setActive("Overview")} className="px-4 py-2 bg-blue-500 text-white rounded">Overview</button>
                        {user && ( 
                        <button onClick={() => setActive("Discussion")} className="px-4 py-2 bg-red-500 text-white rounded">Discussion</button>
                        )}
                        {user && (
                        <button onClick={() => setActive("Students")} className="px-4 py-2 bg-green-500 text-white rounded">Students</button>
                        )}

                        {!isEnrolled && courseId && <CheckoutButton courseId={Number(courseId)}/>}
                    </nav>
                </div>
            </div>
            <div className="flex justify-between items-center bg-gray-200 p-4">                               
                {active === "Overview" && <Overview />}
                {active === "Discussion" && courseId && <DiscussionBoard courseId={Number(courseId)}/>}
                {active === "Students" && <Students />}                  
            </div>
        </div>
    );
};

export default CourseNavBar;