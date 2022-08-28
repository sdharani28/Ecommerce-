import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import '../Stylesheets/authentication.css';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {
        try {

            if(email === '' || password === '' || confirmPassword === ''){
                alert(`Please fill all the fields`);
                return;
            }

            if(password !== confirmPassword){
                alert(`Password doesn't match!`);
                return;
            }

            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                const user = userCredential.user;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({type: 'USER_AUTHENTICATE', payload: JSON.parse(JSON.stringify(user))});
                navigate('/');
            }
        } catch (error) {
            alert(`registration failed \n ${error?.['message']}`);
            const errorCode = error?.['code'];
            const errorMessage = error?.['message'];
            console.error(`Error in user registration :: ${error}`);
        }
    }

    return (
        <div className="register-container">
            <div className="row align-items-center justify-content-center login" >
                <div className="col-md-4">
                    <div className="register-form" >
                        <h2>Register</h2>
                        <hr />
                        <input type="email" className="form-control" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" className="form-control" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <input type="password" className="form-control" placeholder="confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                        <button className="my-3" onClick={register}>Register</button>

                        <hr />
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

