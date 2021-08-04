import React, { useContext } from 'react';
import logo from '../../logo.png';
import "./header.css";
import { Link } from "react-router-dom";
import { UserContext } from "./../../App";
import { handleGoogleSignOut } from '../Login/LoginManager.js';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const isLoggedIn = loggedInUser.loginSuccess;
    console.log(loggedInUser)

    const signOut = () => {
        handleGoogleSignOut()
            .then((res) => {
                setLoggedInUser(res)
            })
    }
    return (
        <div className='header'>
            <Link to="/"><img src={logo} alt="Jello" srcset="" /></Link>


            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage-inverntory">Manage Inverntory</Link>
                {isLoggedIn === true ?
                    <>
                        <Link style={{color: 'green'}}>Hello {loggedInUser.displayName||loggedInUser.name}</Link>
                        <Link style={{color: 'red'}}onClick={signOut}>Logout</Link>
                    </>
                    : <Link to="login">Sign Up</Link>}
            </nav>
        </div>
    );
};

export default Header;
