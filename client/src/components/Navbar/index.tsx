import './styles.css';
import React from 'react';
import {ReactComponent as Logo} from './logo.svg';
import Link from 'react-dom';

function Navbar(){
    return (
        <nav className="main-navbar">
            <Logo />
            <Link className="logo-text" to="/">DS Delivery</Link>
        </nav>
    );
}
export default Navbar;