async function getLoggedIn(token, setLoggedIn, navigate) {

    return fetch(process.env.REACT_APP_API + 'user/is_logged_in', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json())
        .then(data => {
            //console.log(data)
            if (data.status === 200){
                setLoggedIn(data);
            } else {
                navigate("/logout")
            }
        });

}

export default getLoggedIn;
