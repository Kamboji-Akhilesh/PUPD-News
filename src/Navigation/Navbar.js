import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Nav() {

    return (
        <div className="navbar">
            <div className="logo">PUPD-YUJ</div>
            <ul className="nav-links">
                <Link to="/news">News</Link>
                <Link to="/profile">Profile</Link>
            </ul>
        </div>
    );

}