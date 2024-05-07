async function loginProfile(token, setProfile) {

    return fetch(process.env.REACT_APP_API + 'user/profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token?.access_token
        },
    }).then(response => response.json())
        .then(data => {
            //console.log(data)
            if (data._account_status === 'active'){
                setProfile(data)
            } else {
                setProfile(null)
            }
        });
}

export default loginProfile;
