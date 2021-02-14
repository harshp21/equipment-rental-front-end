import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/user-context/user-context';
import './login.css';

function Login() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        userContext.logInUser(emailId, password);

    }
    return (
        <div className="form-container">
            <div className="form">
                <div className="form__title">Sign in</div>
                <div className="form__subtitle">Already have an account?</div>
                <div className="form__label">
                    Email Id
                </div>
                <div className="form__input">
                    <input type="email" value={emailId} onChange={(e) => { setEmailId(e.currentTarget.value) }} />
                </div>
                <div className="form__label">
                    Password
                </div>
                <div className="form__input">
                    <input type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} />
                </div>
                <div className="forgot-password-link"><Link to="/forgot-password" className="link">Forgot password?</Link> </div>
                <div className="form__submit-btn" onClick={onSubmitHandler}>Sign in</div>
                <div className="form__footer">
                    Not a member yet? <Link to='/sign-up' className="link">
                        Sign up now!</Link>
                </div>
            </div>

        </div>
    )
}

export default Login
