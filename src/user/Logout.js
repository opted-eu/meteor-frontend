import {useContext, useEffect} from 'react';
import {UserContext} from "./UserContext";
import {useNavigate} from "react-router-dom";

async function logoutUser(token) {
    return fetch(process.env.REACT_APP_API + 'user/logout', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
        .then(
            data => data.json()
        )
}

export default function Logout() {

    const navigate = useNavigate();
    const [token, setToken] = useContext(UserContext);

    useEffect(() => {
        let l = logoutUser(token)
        console.log(l)
        localStorage.clear();
        setToken(null)
        navigate("/?logout=true", { replace: true })
    }, [])

}