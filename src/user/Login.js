import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useSearchParams, Link} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js'
import '@material/web/button/text-button.js';


async function loginUser(credentials) {
    return fetch(process.env.REACT_APP_API + 'user/login/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}

export default function Login({ setToken }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState();
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    let login_page = (window.location.href).indexOf('login') >= 0;
    let message = null

    for (let param of searchParams) {
        if (param[0] === 'msg'){
            message = param[1]
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        //console.log(token)
        if (token.status === 200) {
            setToken(token);
            setError(null)
            navigate(
                '/profile')
        } else {
            setError(token.message)
        }
    }

    return(

        <div>
            <h2>Log In</h2>
            {message &&
                <div className="message">{message}</div>
            }
            <form onSubmit={handleSubmit}>

                <div className="login-register">
                    <md-filled-text-field
                        label="Email"
                        type="email"
                        onBlur={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="login-register">
                    <md-filled-text-field
                        label="Password"
                        type="password"
                        onBlur={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="login-register">
                    <md-checkbox
                        touch-target="wrapper"
                        onBlur={e => setRememberMe(e.target.value)}
                    />
                    <span style={{position: "relative",
                        top: "10px"}}>Remember Me</span>
                </div>

                {error &&
                    <>
                        <div className="login-register error">
                            {error}
                            <br/>
                            Have you verified your email?<br/>
                            <md-filled-button type="button" onClick={() => navigate('/register/resend')}>Resend Verification Email?</md-filled-button>
                        </div>
                    </>
                }

                <div className="login-register">
                    <md-filled-button type="submit" style={{marginRight:"10px", marginBottom:"10px"}}>Login</md-filled-button>
                    <md-text-button type="button" onClick={() => navigate('/password/reset')}>Forgot Password?</md-text-button>
                    {login_page &&
                        <md-text-button style={{marginLeft: "10px"}} type="button"
                                        onClick={() => navigate('/register')}>Need an account? Sign Up</md-text-button>
                    }
                </div>

            </form>
        </div>

    )

}

Login.propTypes = {

    setToken: PropTypes.func.isRequired

};