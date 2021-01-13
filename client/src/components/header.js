import React from 'react'

export default function Header() {
    return (
        <nav>
            <div className="logo">Distri</div>
            <ul>
                <li>Home</li>
                <li>Our Products</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>    

            <div className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
                <i className="fa fa-shopping-basket"></i>
            </div>
        </nav>
    )
}
