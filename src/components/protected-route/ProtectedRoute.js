import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/user-context/user-context';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const [renderRoutes, setRenderRoutes] = useState(false);
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.isUserLoggedIn()
            .then(res => setRenderRoutes(true))
            .catch(err => setRenderRoutes(true));
    }, [])
    return (
        <>{renderRoutes && <Route {...rest} render={

            (props) => {
                if (userContext.userState.isLoggedIn) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: "/sign-in",
                        state: { next: props.location.pathname }
                    }} />
                }
            }
        } />}

        </>
    )
}

export default ProtectedRoute
