import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../context/user-context/user-context';
import { toast } from 'react-toastify';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const userContext = useContext(UserContext);
    useEffect(() => {
        const isUserLoggedIn = async () => {
            await userContext.isUserLoggedIn();
            if (!userContext.userState.isLoggedIn) {
                toast.info('You need to login');
            }
        }
        isUserLoggedIn();
    }, [])
    return (
        <Route {...rest} render={

            (props) => {
                if (userContext.userState.isLoggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/sign-in" />
                }
            }
        } />
    )
}

export default ProtectedRoute
