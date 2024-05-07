async function refreshUser(token) {
    return fetch(process.env.REACT_APP_API + 'user/login/refresh', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token?.refresh_token
        }
    })
        .then(data => data.json())
}

async function getLoggedIn(token, setLoggedIn, setToken, navigate) {

    // check access_token expiry
    let d = new Date()
    let at = new Date(token?.access_token_valid_until + '+00:00')
    if (at > d) {
        return fetch(process.env.REACT_APP_API + 'user/is_logged_in', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            },
        }).then(response => response.json())
            .then(async data => {
                if (data.status === 200) {
                    setLoggedIn(data);
                } else {
                    setLoggedIn(null);
                    if (navigate) {
                        navigate("/logout")
                    }
                }
            });
    } else {

        // check refresh_token expiry
        let rt = new Date(token?.refreh_token_valid_until + '+00:00')
        if (rt > d) {
            const refreshed_token = await refreshUser(token);
            if (refreshed_token?.status === 200) {

                // recreate token dictionary
                refreshed_token['refreh_token_valid_until'] = token.refreh_token_valid_until
                refreshed_token['refresh_token'] = token.refresh_token

                // update local storage
                localStorage.setItem('token', JSON.stringify(refreshed_token));

                // reset token
                setToken(refreshed_token)

                // re-login user
                return fetch(process.env.REACT_APP_API + 'user/is_logged_in', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + refreshed_token.access_token
                    },
                }).then(response => response.json())
                    .then(async data => {
                        if (data.status === 200) {
                            setLoggedIn(data);
                        } else {
                            setLoggedIn(null);
                            if (navigate) {
                                navigate("/logout")
                            }
                        }
                    })
            } else {
                setLoggedIn(null);
                if (navigate) {
                    navigate("/logout")
                }
            }
        } else {
            setLoggedIn(null);
            if (navigate) {
                navigate("/logout")
            }
        }
    }

}

export default getLoggedIn;
