import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`username: ${email}, password: ${password}`);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="mb-2 block">
                <label htmlFor="email">Your email</label>
            </div>
            <input id="email" type="email" placeholder="name@email.com" required onChange={handleEmailChange}/>
            
            <div className="mb-2 block">
                <label htmlFor="password">Password</label>
            </div>
            <input id="password" type="password" required onChange={handlePasswordChange}/>

            <button type="submit">Sign In</button>

        </form>
    )
}