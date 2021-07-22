import React from 'react';
import logo from '../../logo.png';
import "./header.css";

const Header = () => {

    return (
        <div className='header'>
            <img src={logo} alt="Jello" srcset="" href="/home" />


            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage-inverntory">Manage Inverntory</a>
            </nav>
        </div>
    );
};

export default Header;
