import React, { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import '@material/web/textfield/filled-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';


async function registerUser(credentials) {
    return fetch(process.env.REACT_APP_API + 'user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())

}

const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirmPassword] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const reg = await registerUser({
            email,
            password,
            confirm_password
        });
        console.log(reg)

        if (reg.status === 200) {
            navigate('/login?msg=' + reg.message)
        } else {
            setError(reg.message)
        }
    }

    return (
        <div>
            <h2>Register</h2>
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

                <div className="infobox">

                    <h1>Data Privacy (summary)</h1>

                    <p>This platform respects the General Data Protection Regulation (GDPR, in German: Datenschutzgrundverordnung, DSGVO).</p>

                    <p>We save your email address and IP address locally on this server (hosted in the EU). Your data is not shared with third parties and retained until you decide to delete your account. Your email address is used for technical purposes (e.g. login) and to contact you for administrative purposes. We reserve the right to process your IP address for creating anonymous usage statistics.</p>

                    <p><strong>By creating an account you agree that we store your email address and IP address.</strong></p>

                    <h2>Conditions of Use</h2>

                    <p><strong>By creating an account you confirm that you have read and acknowledged the <Link to="/privacy">Privacy Policy and the Conditions of Use</Link> statements.</strong></p>

                </div>

                <div className="login-register">
                    <md-filled-button type="submit">Create Account</md-filled-button> <md-text-button type="button" onClick={() => navigate('login')}>Already Have an Account? Sign in</md-text-button>
                </div>

            </form>
        </div>
    )

};

export default Register;
