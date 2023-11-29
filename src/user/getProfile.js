async function getProfile(token, setProfile, navigate) {

    return fetch(process.env.REACT_APP_API + 'user/profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    }).then(response => response.json())
        .then(data => {
            //console.log(data)
            if (data._account_status === 'active'){
                setProfile(data)
                /*
                let data_dict = {}
                data_dict["role"] = data.role
                setProfile(data_dict)
                */
            } else {
                navigate("/logout")
            }
        });

}

export default getProfile;
