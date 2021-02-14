import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/user-context/user-context';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        userContext.resetPassword(password, confirmPassword);
    }
    return (
        <div className="form-container">
            <div className="form">
                <div className="form__title">Reset password</div>
                <div className="form__subtitle">Enter new password </div>

                <div className="form__label">
                    Password
                </div>
                <div className="form__input">
                    <input type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                </div>

                <div className="form__label">
                    confirm password
                </div>
                <div className="form__input">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                </div>
                <div className="form__submit-btn" onClick={onSubmitHandler}>Reset password</div>
                <div className="form__footer">
                    Not a member yet? <Link to='/sign-up' className="link">
                        Sign up now!</Link>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword
