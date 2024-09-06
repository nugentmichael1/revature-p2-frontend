import React, { useState } from 'react';
import Overview from './Overview';
import Students from './Students';
import DiscussionBoard from '../Discussions/DiscussionBoard';
import CheckoutButton from '../Checkout/CheckoutButton';

const CourseNavBar: React.FC = () => {
    const [active, setActive] = useState("Overview");
    const [isEnrolled, setIsEnrolled] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center bg-gray-200 p-4">
                <div className="flex space-x-4">
                    <nav>
                        <button onClick={() => setActive("Overview")} className="px-4 py-2 bg-blue-500 text-white rounded">Overview</button>
                        <button onClick={() => setActive("Discussion")} className="px-4 py-2 bg-red-500 text-white rounded">Discussion</button>
                        <button onClick={() => setActive("Students")} className="px-4 py-2 bg-green-500 text-white rounded">Students</button>
                        {!isEnrolled && <CheckoutButton />}
                    </nav>
                </div>
            </div>
            <div className="flex justify-between items-center bg-gray-200 p-4">                               
                {active === "Overview" && <Overview />}
                {/* TODO: pass actual courseId as prop */}
                {active === "Discussion" && <DiscussionBoard courseId={1}/>}
                {active === "Students" && <Students />}                  
            </div>
        </div>
    );
};

export default CourseNavBar;