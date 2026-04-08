import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./Firebase";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => alert(error.message));
    };

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="login__logo">
                    <StorefrontIcon className="login__logoImage" fontSize="large" />
                    <h2 className="login__logoTitle">eShop</h2>
                </div>
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="login__signInButton" onClick={signIn}>Sign In</button>
                </form>
                <p>By signing in, you agree to our Terms of Use and Privacy Notice.</p>
                <button className="login__registerButton" onClick={register}>Create your eShop Account</button>
            </div>
        </div>
    );
}

export default Login;
