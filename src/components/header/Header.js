import React, { useEffect, useRef } from 'react';
import './header.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context/user-context';
import { ProductContext } from '../../context/product-context/product-context';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Header() {

    const userContext = useContext(UserContext);
    const productContext = useContext(ProductContext);

    const userContextRef = useRef(userContext);
    const productContextRef = useRef(productContext);
    const history = useHistory(null);

    useEffect(() => {
        productContextRef.current.fetchCartProducts();
        userContextRef.current.isUserLoggedIn();
    }, [])

    useEffect(() => {
        productContextRef.current.fetchCartProducts();
    }, [userContext.userState.isLoggedIn])

    const handleSignOut = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        userContextRef.current.loginOutUser();
                        productContextRef.current.clearCart();
                    },
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    const handleSignIn = () => {
        history.push('/sign-in');
    }

    return (
        <div className="header">
            <div className="header__logo">
                Rental Products
            </div>
            <div className="header__nav">
                <div className="header__nav_nav-items">
                    <Link to="/home">
                        Home
                    </Link>
                </div>
                <div className="header__nav_nav-items">
                    <Link to="/products">
                        Products
                    </Link>
                </div>
                <div className="header__nav_nav-items">
                    <Link to="/orders">
                        Orders
                    </Link>
                </div>
                <div className="header__nav_nav-items">
                    <Link to="/contact-us">
                        Contact
                    </Link>
                </div>
                <div className="header__nav_nav-items">
                    <Link to='/cart'>
                        <IconButton>
                            <Badge badgeContent={productContext.productState.cart.cartProducts.length} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
                <div className="header__nav_nav-items">
                    {userContext.userState.isLoggedIn ?
                        <div className="nav-items" onClick={handleSignOut}>Sign out </div> :
                        <div className="nav-items" onClick={handleSignIn}>Sign in </div>}

                </div>
            </div>
        </div>
    )
}

export default Header
