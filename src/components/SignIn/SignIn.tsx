import { useState } from "react";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`username: ${email}, password: ${password}`);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                    Sign In
                </h3>
            </div>

            <div className="p-6 space-y-6">
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <div className="col-span-1">
                        <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2">Username</label>
                        <input id="username" type="text" placeholder="Enter username..." required onChange={handleEmailChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Password</label>
                        <input id="password" type="password" required onChange={handlePasswordChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"/>
                    </div>

                    <div className="col-span-1">
                        <button type="submit" className="text-white bg-secondary-500 hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Sign In</button>
                    </div>
                </form>
            </div>
        </>
    )
}