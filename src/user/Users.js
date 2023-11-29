import React, {useContext, useEffect, useState} from 'react';
import '@material/web/textfield/filled-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import {UserContext} from "./UserContext";
import {useNavigate, Link, useSearchParams} from "react-router-dom";
import {ProfileContext} from "./ProfileContext";
import getProfile from "./getProfile"
import getLoggedIn from "./getLoggedIn"

const Users = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [searchParams] = useSearchParams();
    let message = null
    const [userData, setUserData] = useState([]);

    for (let param of searchParams) {
        if (param[0] === 'msg') {
            message = param[1]
        }
    }

    const fetchItemData = () => {
        fetch(process.env.REACT_APP_API + "admin/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.status){
                navigate('/profile?msg=' + data.message)
            } else {
                setUserData(data);
                //console.log(data)
            }

        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, navigate)
        getProfile(token, setProfile, navigate)
    }

    useEffect(() => {
        getData()
        fetchItemData()
    }, [token])

    const retDateTime = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear() + " " + (dt.getHours()).toString().padStart(2, '0') + ":" + (dt.getMinutes()).toString().padStart(2, '0') + ":" + (dt.getSeconds()).toString().padStart(2, '0')
        return dt
    }

    const getUserLink = (uid) => {
        return '/admin/users/' + uid
    }

    return (
        <>
            <div>
                {profile &&
                    <>
                        <h3>Users</h3>

                        {message &&
                            <div className="message">{message}</div>
                        }

                        <div className="divTable">
                            <div className="divTableRow">
                                <div className="divTableHead">Joined Date</div>
                                <div className="divTableHead">Email</div>
                                <div className="divTableHead">UID</div>
                                <div className="divTableHead">Display Name</div>
                                <div className="divTableHead">User Level</div>
                            </div>

                            {userData.map(item => (
                                <div className="divTableRow" key={item.uid}>
                                    <div className="divTableCell">{retDateTime(item._date_joined)}</div>
                                    <div className="divTableCell">{item.email}</div>
                                    <div className="divTableCell"><Link to={getUserLink(item.uid)}>{item.uid}</Link></div>
                                    <div className="divTableCell">{item.display_name}</div>
                                    <div className="divTableCell">{item.role}</div>
                                </div>
                            ))}
                        </div>
                    </>
                }

            </div>
        </>
    )

};

export default Users;
