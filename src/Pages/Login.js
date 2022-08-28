import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import '../Stylesheets/authentication.css';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if(email === '' || password === ''){
            alert(`Please fill all the fields`);
            return;
        }
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                const user = userCredential.user;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({type: 'USER_AUTHENTICATE', payload: JSON.parse(JSON.stringify(user))});
                navigate('/');
            }
        } catch (error) {
            alert(`login failed \n ${error?.['message']}`);
            const errorCode = error?.['code'];
            const errorMessage = error?.['message'];
            console.error(`Error in user login :: ${error}`);
        }
    }

    return (
        <div className="register-container">
            <div className="row align-items-center justify-content-center login" >
                <div className="col-md-4">
                    <div className="register-form" >
                        <h2>Login</h2>
                        <hr />
                        <input type="email" className="form-control" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" className="form-control" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />

                        <button className="my-3" onClick={login}>Login</button>
                        <hr />
                        <Link to="/register">New user</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

