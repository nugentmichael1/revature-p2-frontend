import { useEffect, useState } from "react";
import Register from "../../components/Register/Register";
import SignIn from "../../components/SignIn/SignIn";
import { useLocation } from'react-router-dom';


export default function SignInRegister() {
    const [register, setRegister] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        if (currentPath === '/login'){
            setRegister(false);
        } else {
            setRegister(true);
        }
    }, [location])

    return (
        <div className="bg-white border border-4 rounded-lg shadow relative m-10 max-w-lg mx-auto">
            {register ?
            <div>
                <Register />
                <div className="flex justify-center mt-4">
                    <p className="text-center mb-2">Already have an account?
                        <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> <u>Sign In</u></span>
                    </p>
                </div>
            </div> 
            : 
            <div>
                <SignIn />
                <div className="flex justify-center mt-4">
                    <p className="text-center mb-2">Don't have an account? 
                        <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> <u>Sign Up</u></span>
                    </p>
                </div>
            </div>
            }
        </div>
    )
}