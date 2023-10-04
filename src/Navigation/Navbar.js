import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Nav() {

    return (
        <div className="navbar">
            <div className="logo">PUPD-YUJ</div>
            <ul className="nav-links">
                <Link to="/general">All</Link>
                <Link to="/business">Business</Link>
                <Link to="/entertainment">Entertainment</Link>
                <Link to="/health">Health</Link>
                <Link to="/science">Science</Link>
                <Link to="/sports">Sports</Link>
                <Link to="/profile">Profile</Link>
            </ul>
        </div>
    );

}