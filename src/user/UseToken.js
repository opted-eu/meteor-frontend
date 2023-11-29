import { useState } from 'react';

export default function UseToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        try {
            const userToken = JSON.parse(tokenString);
            return userToken?.access_token
        }
        catch {
            return null
        }

    };

    const [token, setToken] = useState(getToken());

    //console.log('usetoken=' + token)

    const saveToken = userToken => {
        if (userToken) {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.access_token);
        } else {
            setToken(null)
        }
    };

    return {
        setToken: saveToken,
        token
    }
}