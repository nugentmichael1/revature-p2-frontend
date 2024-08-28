import { useState } from "react";
import Register from "../../components/Register/Register";
import SignIn from "../../components/SignIn/SignIn";

type SignInRegisterProps = {
    reg?: boolean;
}

export default function SignInRegister({ reg }: SignInRegisterProps) {
    const [register, setRegister] = useState(reg || false);

    return (
        <>
            {register ?
            <div>
                <Register />
                <p>Already have an account? Sign in 
                    <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> here.</span>
                </p>
            </div> 
            : 
            <div>
                <SignIn />
                <p>Don't have an account? Register 
                    <span className="text-secondary-500 cursor-pointer" onClick={() => setRegister(!register)}> here.</span>
                </p>
            </div>
            }
        </>
    )
}