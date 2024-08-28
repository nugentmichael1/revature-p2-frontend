import React from "react";

const CreateCourseForm = () => {
    return (
<div> 
    <div className="bg-white border border-4 rounded-lg shadow relative m-10">

        <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
                Create a Course
            </h3>
        </div>
        
        <div className="p-6 space-y-6">
            <form action="#">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="course-name" className="text-sm font-medium text-gray-900 block mb-2">Course Name</label>
                        <input type="text" name="course-name" id="course-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Java" required></input>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="program" className="text-sm font-medium text-gray-900 block mb-2">Program</label>
                        <input type="text" name="program" id="program" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Full-Stack" required></input>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="educator" className="text-sm font-medium text-gray-900 block mb-2">Educator</label>
                        <input type="text" name="educator" id="educator" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="William Terry" required></input>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                        <input type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required></input>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="course-details" className="text-sm font-medium text-gray-900 block mb-2">Course Details</label>
                        <textarea id="course-details" rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                    </div>
                    <div className="col-span-full">
                    <label htmlFor="students" className="text-sm font-medium text-gray-900 block mb-2">Select Students</label>
                    <select name="students" id="students" multiple className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                        <option value="">Diego Beauperthuy</option>
                        <option value="">Ralph uwu</option>
                        <option value="">alalala</option>
                        <option value="">sasasasasasa</option>
                        <option value="">urvjslfj sjkflsj</option>
                        <option value="">kjfsghdkfjghskf</option>
                    </select>
                    </div>
                </div>
            </form>
        </div>
        <div className="p-6 border-t border-gray-200 rounded-b">
            <div className="flex justify-end">
                <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Create</button>
            </div>
        </div>
    </div>
    <div className="grid-span-3"></div>
</div>

    );
};

export default CreateCourseForm;