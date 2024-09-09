import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from '../../contexts/AppContext';

const CreateCourseForm = () => {
    const [course, setCourse] = useState({
        startDate: "",
        endDate: "",
        name: "",
        description: "",
        attendanceMethod: "",
        price: 0
    });

    const handleInput = (event: any) => {
        setCourse({...course, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(course);

        axios.post("http://localhost:8080/api/v1/course", course)
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));      
    };

    return (
        <div className="h-screen bg-red-500">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                    {/* Navbar */}
                </div>
                <div className="col-span-6 mt-40">
                    <div className="bg-white border border-4 rounded-lg shadow relative">
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Create a Course
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            Course Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={handleInput}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="Java"
                                            required
                                        ></input>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="startDate"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            onChange={handleInput}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required
                                        ></input>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="endDate"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            onChange={handleInput}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required
                                        ></input>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="attendanceMethod"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            Attendance Method
                                        </label>
                                        <select
                                            name="attendanceMethod"
                                            id="attendanceMethod"
                                            onChange={handleInput}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            required
                                        >
                                            <option value="">Select Method</option>
                                            <option value="ONLINE">Online</option>
                                            <option value="IN_PERSON">In Person</option>
                                            <option value="HYBRID">Hybrid</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="price"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            onChange={handleInput}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                            placeholder="$2300"
                                            required
                                        ></input>
                                    </div>
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="description"
                                            className="text-sm font-medium text-gray-900 block mb-2"
                                        >
                                            Course Details
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            onChange={handleInput}
                                            rows={3}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                            placeholder="Details"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-200 rounded-b">
                                    <div className="flex justify-end">
                                        <button
                                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            type="submit"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    {/* Sidebar */}
                </div>
            </div>
        </div>
    );
};

export default CreateCourseForm;