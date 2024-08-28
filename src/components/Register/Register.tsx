import { useState } from "react";
import PasswordStrengthMeter from "../PasswordStrengthMeter/PasswordStrengthMeter";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password1 != password2) {
            console.log('passwords do not match');
        } else {
            console.log(`username: ${username}, password: ${password1}`);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.target.value);
    };

    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.target.value);
    };

    return (
    <>
        <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
                Sign Up
            </h3>
        </div>

        <div className="p-6 space-y-6">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Username</label>
                    <input id="username" type="text" placeholder="Enter username..." required onChange={handleUsernameChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                </div>

                <div className="col-span-1">
                    <label htmlFor="password1" className="text-sm font-medium text-gray-900 block mb-2">Password</label>
                    <input id="password1" type="password" required onChange={handlePassword1Change} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                    <PasswordStrengthMeter password={password1} />
                </div>

                <div className="col-span-1">
                    <label htmlFor="password2" className="text-sm font-medium text-gray-900 block mb-2">Confirm Password</label>
                    <input id="password2" type="password" required onChange={handlePassword2Change} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                </div>

                <div className="col-span-1">
                    <button type="submit" className="text-white bg-secondary-500 hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Sign Up</button>
                </div>
            </form>
        </div>
    </>
    )
}