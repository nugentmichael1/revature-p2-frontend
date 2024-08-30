import { useState } from "react";
import Register from "../../components/Register/Register";
import SignIn from "../../components/SignIn/SignIn";

type SignInRegisterProps = {
    reg?: boolean;
}

export default function SignInRegister({ reg }: SignInRegisterProps) {
    const [register, setRegister] = useState(reg || false);

    return (
        <div className="bg-white border border-4 rounded-lg shadow relative m-10 max-w-lg mx-auto">
            {register ?
            <div>
                <Register />
                <div className="flex justify-center mt-4">
                    <p className="text-center mb-2">Already have an account?
                        <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> Sign In</span>
                    </p>
                </div>
            </div> 
            : 
            <div>
                <SignIn />
                <div className="flex justify-center mt-4">
                    <p className="text-center mb-2">Don't have an account? 
                        <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> Sign Up</span>
                    </p>
                </div>
            </div>
            }
        </div>
    )
}