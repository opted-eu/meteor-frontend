import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirmPassword] = useState();
    const [error, setError] = useState(null);

    async function resetPwd(credentials) {
        return fetch(process.env.REACT_APP_API + 'user/password/reset/' + token?.access_token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const ret = await resetPwd({
            password,
            confirm_password
        });
        //console.log(ret)
        if (ret.status === 200) {
            setError(null)
            navigate(
                '/login?msg=' + ret.message
            )
        } else {
            setError(ret.message)
        }
    }

    return(

        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>

                <div className="login-register">
                    <md-filled-text-field
                        label="Password"
                        type="password"
                        onBlur={e => setPassword(e.target.value)}
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
                    <md-filled-button type="submit">Reset Password</md-filled-button>
                </div>

            </form>
        </div>

    )

}

export default ResetPassword;
