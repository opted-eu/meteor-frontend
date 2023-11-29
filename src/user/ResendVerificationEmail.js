import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';

async function resendVer(credentials) {
    return fetch(process.env.REACT_APP_API + 'user/register/resend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}

const ResendVerificationEmail = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const ret = await resendVer({
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
            <h2>Resend Verification Email</h2>
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
                    <md-filled-button type="submit">Resend Verification Email</md-filled-button>
                    {error &&
                        <md-text-button style={{marginLeft:"10px"}} type="button" onClick={() => navigate('/password/reset')}>Forgot Password?</md-text-button>
                    }
                </div>

            </form>
        </div>

    )

}

export default ResendVerificationEmail;
