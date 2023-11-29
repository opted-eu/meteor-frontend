import React, {useContext, useEffect, useState} from 'react';
import '@material/web/textfield/filled-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/text-button.js';
import '@material/web/switch/switch.js';
import {UserContext} from "./UserContext";
import {useNavigate, Link, useParams} from "react-router-dom";
import DetailHeader from "../components/DetailHeader";
import {ProfileContext} from "./ProfileContext";
import getLoggedIn from "./getLoggedIn"
import getProfile from "./getProfile";
import SearchSelectBox from "../forms/SearchSelectBox";

const UpdateUser = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [role, setRole] = useState();
    const [error, setError] = useState(null);
    const { uid } = useParams();

    async function updateUser() {
        return fetch(process.env.REACT_APP_API + 'admin/users/' + uid + '?role=' + role, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(data => data.json())

    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, navigate)
        getProfile(token, setProfile, navigate)
    }

    useEffect(() => {
        getData()
    }, [token])

    const handleSubmitUpdateUser = async e => {
        e.preventDefault();

        const ret = await updateUser();
        //console.log(ret)
        if (ret.status === 200) {
            setError(null)
            navigate(
                '/admin/users?msg=' + ret.message
            )
        } else {
            setError(ret.message)
        }

    }

    let options = [
        {value: "10", label: "Admin"},
        {value: "0", label: "Anon"},
        {value: "1", label: "Contributor"},
        {value: "2", label: "Reviewer"}
        ]


    const handleChangeOption = (selectedOption) => {
        //console.log('Option')
        //console.log(selectedOption)
        setRole(selectedOption.value)
    };

    return (
        <>
            <div>
                {profile &&
                    <form onSubmit={handleSubmitUpdateUser}>
                        <div className="divTable">
                            <h3>Update User {uid}</h3>

                            <div className='profile'>
                                <h4>Role</h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeOption}
                                    searchOptions={options}
                                    multi={false}
                                />
                            </div>

                            {error &&
                                <div className="profile error">{error}</div>
                            }

                        </div>

                        <div style={{"marginBottom":20}}>
                            <md-filled-button style={{marginRight:"10px"}} type="submit">Update Role</md-filled-button>
                        </div>
                    </form>
                }

            </div>
        </>
    )

};

export default UpdateUser;
