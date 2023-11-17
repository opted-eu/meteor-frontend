import {Link} from "react-router-dom";
import React from "react";

const Nav = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">

            <li className="nav-item">
                 <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                   aria-expanded="false">Resources</a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/guides">Guides</Link></li>
                    <li><Link className="dropdown-item" to="/link-collection">Link Collection</Link></li>
                    <li><Link className="dropdown-item" to="/teaching-materials">Teaching Material</Link></li>
                    <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>

        </ul>
    )
}

export default Nav;