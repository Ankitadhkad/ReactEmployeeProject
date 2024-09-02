import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Link to external CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">List Employee</Link>
            <Link to="/crud" className="nav-link">Add Employee</Link>
        </nav>
    );
};

export default Navbar;
