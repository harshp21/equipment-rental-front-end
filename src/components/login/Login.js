import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

import { UserContext } from '../../context/user-context/user-context';
import './login.css';

function Login(props) {

    const [user, setUser] = useState({ emailId: '', password: '' });
    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        if (!validator.isEmail(user.emailId)) {
            toast.error('Enter a valid email Id');
        } else if (user.password.length < 6) {
            toast.error('Password length should be atleast 6');
        } else {
            loginUser();
        }
    }

    const loginUser = () => {
        const { location: { state } } = props;
        if (state && state.next) {
            userContext.logInUser(user, state.next);
        } else {
            userContext.logInUser(user);
        }
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
                    <input type="email" value={user.emailId} onChange={(e) => setUser({ ...user, emailId: e.target.value })} />
                </div>
                <div className="form__label">
                    Password
                </div>
                <div className="form__input">
                    <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
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
