import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {UserContext} from "../user/UserContext";
import {ProfileContext} from "../user/ProfileContext";

const Nav = () => {

    //const { token, setToken } = useToken();
    const [token, setToken] = useContext(UserContext);
    const [profile, setProfile] = useContext(ProfileContext);
    let role = null

    if (profile) {
        role = profile.role
    }
    //console.log(role)

    const apiURL = () => {
        return process.env.REACT_APP_API + '/swagger'
    }

    return (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {!token &&
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </>
            }
            {token &&
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add">Add Entry</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                    aria-expanded="false">Tasks</a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/Profile/entries">My Entries</Link></li>
                            {role == 10 &&
                                <>
                                    <li><Link className="dropdown-item" to="/profile/entries/review">Review Entries</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/users">Change user Permissions</Link></li>
                                </>
                            }
                            <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                        </ul>
                    </li>
                </>
            }

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                   aria-expanded="false">Resources</a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/guides">Guides</Link></li>
                    {/* <li><Link className="dropdown-item" to="/link-collection">Link Collection</Link></li> */}
                    {/* <li><Link className="dropdown-item" to="/teaching-materials">Teaching Material</Link></li> */}
                    <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                </ul>
            </li>
            <li className="nav-item">
                <a className="nav-link" target="_blank" href={apiURL()}>API</a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>



        </ul>
    )
}

export default Nav;