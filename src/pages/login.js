import React from "react";
import './login.css';
import axios from 'axios';
import { useState } from "react";
import { DOMAIN } from "../domain";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userdetails, setUserdetails] = useState([]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`${DOMAIN}login`, {
            params: {
                username: username,
                password: password
            }
        })
            .then((response) => {
                const details = response.data.userdetails;
                if (Array.isArray(details)) {
                    setUserdetails(details);
                } else if (details !== null && typeof details === 'object') {
                    setUserdetails([details]);
                } else {
                    setUserdetails([]);
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }

    return (
        <div className="login">
            {Object.keys(userdetails).length === 0 ? (
                <form className="login__form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div className="login__details">
                    <table>
                        <tr>
                            <th>UserID</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                        {Array.isArray(userdetails) && userdetails.map((user) => (
                            <tr key={user.userid}>
                                <td>{user.userid}</td>
                                <td>{user.password_hash}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
}

export default Login;
