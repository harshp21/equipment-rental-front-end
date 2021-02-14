import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/user-context/user-context';

function ForgotPassword() {

    const [emailId, setEmailId] = useState('');

    const userContext = useContext(UserContext);

    const onSubmitHandler = () => {
        userContext.retrievePassword(emailId);
    }
    return (
        <div className="form-container">
            <div className="form">
                <div className="form__title">Forgot password</div>
                <div className="form__subtitle">Enter email and retrieve password</div>
                <div className="form__label">
                    Email Id
                </div>
                <div className="form__input">
                    <input type="email" value={emailId} onChange={(e) => setEmailId(e.currentTarget.value)} />
                </div>

                <div className="form__submit-btn" onClick={onSubmitHandler}>Submit</div>
                <div className="form__footer">
                    Remember password ? <Link to='/sign-in' className="link">
                        Sign in</Link>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword
