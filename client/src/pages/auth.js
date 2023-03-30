import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
}


/* CREATING THE COMPONENTS HERE AS THEY ONLY RELATE TO THE AUTH PAGE */
const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies([ "access_token" ]);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login/login", {
                username,
                password
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID); // store user ID in local storage once logged in
            navigate("/")

        } catch (err) {
            alert("Please ensure you have a valid email address @gmail.com")
            console.error(err);
        }
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
        />
    )
}

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/login/register", {
                username,
                password
            });
            alert("Registration Completed. Please Login")
        } catch (err) {
            alert("Please ensure you have a valid email address @gmail.com")
            console.error(err)
        }
    };

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    );
};


/* FORM COMPONENT */
const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">{label}</button>
            </form>
        </div>
    )
}