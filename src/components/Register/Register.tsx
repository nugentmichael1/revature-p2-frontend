import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`username: ${email}, password: ${password1}`);
    };

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
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="mb-2 block">
                <label htmlFor="email">Your email</label>
            </div>
            <input id="email" type="email" placeholder="name@email.com" required onChange={handleEmailChange}/>
            
            <div className="mb-2 block">
                <label htmlFor="password1">Password</label>
            </div>
            <input id="password1" type="password" required onChange={handlePassword1Change}/>
            
            <div className="mb-2 block">
                <label htmlFor="password2">Confirm Password</label>
            </div>
            <input id="password2" type="password" required onChange={handlePassword2Change}/>

            <button type="submit">Register</button>

        </form>
    )
}