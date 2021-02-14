import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/user-context/user-context';
import { useState, useContext } from 'react';

function SignUp() {

    const [userCredentials, setUserCredentials] = useState({ emailId: '', password: '', confirmPassword: '', username: '' })
    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        userContext.signUpUser(userCredentials);
    }

    return (
        <div className="form-container">
            <div className="form">
                <div className="form__title">Sign up</div>
                <div className="form__subtitle">Create new user account?</div>
                <div className="form__label">
                    Username
                </div>
                <div className="form__input">
                    <input type="text" value={userCredentials.username} onChange={(e) => setUserCredentials({ ...userCredentials, username: e.currentTarget.value })} />
                </div>
                <div className="form__label">
                    Email Id
                </div>
                <div className="form__input">
                    <input type="email" value={userCredentials.emailId} onChange={(e) => setUserCredentials({ ...userCredentials, emailId: e.currentTarget.value })} />
                </div>
                <div className="form__label">
                    Password
                </div>
                <div className="form__input">
                    <input type="password" value={userCredentials.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.currentTarget.value })} />
                </div>
                <div className="form__label">
                    Confirm password
                </div>
                <div className="form__input">
                    <input type="password" value={userCredentials.confirmPassword} onChange={(e) => setUserCredentials({ ...userCredentials, confirmPassword: e.currentTarget.value })} />
                </div>
                <div className="form__submit-btn" onClick={onSubmitHandler}>Sign up</div>
                <div className="form__footer">
                    Already have an account? <Link to='/sign-in' className="link">
                        Sign in</Link>
                </div>
            </div>

        </div>
    )
}

export default SignUp
