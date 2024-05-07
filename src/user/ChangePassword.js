import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';
import {UserContext} from "./UserContext";
import getLoggedIn from "./getLoggedIn";
import getProfile from "./getProfile";
import {ProfileContext} from "./ProfileContext";

const ChangePassword = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const [profile, setProfile] = useContext(ProfileContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [old_pw, setOldPassword] = useState();
    const [new_pw, setNewPassword] = useState();
    const [confirm_new, setConfirmPassword] = useState();

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
        getProfile(setProfile)
    }

    useEffect(() => {
        getData()
    }, [])

    async function resetPwd(credentials) {
        console.log(credentials)
        return fetch(process.env.REACT_APP_API + 'user/password/change', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const ret = await resetPwd({
            old_pw,
            new_pw,
            confirm_new
        });
        console.log(ret)
        if (ret.status === 200) {
            setError(null)
            navigate(
                '/profile?msg=' + ret.message
            )
        } else {
            setError(ret.message)
        }
    }

    return(

        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>

                <div className="login-register">
                    <md-filled-text-field
                        label="Old Password"
                        type="password"
                        onBlur={e => setOldPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="login-register">
                    <md-filled-text-field
                        label="New Password"
                        type="password"
                        onBlur={e => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="login-register">
                    <md-filled-text-field
                        label="Confirm Password"
                        type="password"
                        onBlur={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error &&
                    <div className="login-register error">{error}</div>
                }

                <div className="login-register">
                    <md-filled-button type="submit">Change Password</md-filled-button>
                </div>

            </form>
        </div>

    )

}

export default ChangePassword;
