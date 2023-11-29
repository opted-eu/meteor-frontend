import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';

async function reqPwdReset(credentials) {
    return fetch(process.env.REACT_APP_API + 'user/password/reset_request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}

const RequestPasswordReset = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const ret = await reqPwdReset({
            email
        });
        //console.log(token)
        if (ret.status === 401) {
            setError(ret.message)
        } else {
            setError(null)
            navigate(
                '/login?msg=' + ret.message
            )
        }
    }

    return(

        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>

                <div className="login-register">
                    <md-filled-text-field
                        label="Email"
                        type="email"
                        onBlur={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                {error &&
                    <div className="login-register error">{error}</div>
                }

                <div className="login-register">
                    <md-filled-button type="submit">Request Password Reset</md-filled-button>
                </div>

            </form>
        </div>

    )

}

export default RequestPasswordReset;
