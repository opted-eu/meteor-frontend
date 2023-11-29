import React, {useContext, useEffect, useState} from 'react';
import '@material/web/textfield/filled-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/text-button.js';
import '@material/web/switch/switch.js';
import {UserContext} from "./UserContext";
import {useNavigate, Link} from "react-router-dom";
import DetailHeader from "../components/DetailHeader";
import {ProfileContext} from "./ProfileContext";
import getLoggedIn from "./getLoggedIn"

const UpdateProfile = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [displayName, setDisplayName] = useState();
    const [affiliation, setAffiliation] = useState();
    const [orcid, setOrcid] = useState();
    const [preferenceEmails, setPreferenceEmails] = useState();
    const [error, setError] = useState(null);

    async function updateUser(update) {
        return fetch(process.env.REACT_APP_API + 'user/profile/update', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(data => data.json())

    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, navigate)
        return fetch(process.env.REACT_APP_API + 'user/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data._account_status === 'active'){
                    setProfile(data)
                    setDisplayName(data.display_name)
                    setAffiliation(data.affiliation)
                    setOrcid(data.orcid)
                    setPreferenceEmails(data.preference_emails)
                } else {
                    navigate("/logout")
                }
            });
    }

    useEffect(() => {
        getData()
    }, [token])

    const handleSubmitUpdateProfile = async e => {
        e.preventDefault();
        let data_json = {}
        let details_json = {}
        details_json["display_name"] = displayName
        details_json["affiliation"] = affiliation
        details_json["orcid"] = orcid
        details_json["preference_emails"] = preferenceEmails
        data_json["data"] = details_json
        //console.log(data_json)

        const ret = await updateUser(data_json);
        //console.log(ret)
        if (ret.status === 200) {
            setError(null)
            navigate(
                '/profile?msg=' + ret.message()
            )
        } else {
            setError(ret.message)
        }

    }

    const updateSwitch = (e) => {
        //console.log(e)
        if (e.target.selected === true){
            setPreferenceEmails(null)
        } else {
            setPreferenceEmails(true)
        }

    }

    const initialSwitch = () => {
        if (preferenceEmails){
            return true
        } else {
            return null
        }
    }

    //console.log(preferenceEmails)

    return (
        <>
            <div>
                {profile &&
                    <form onSubmit={handleSubmitUpdateProfile}>
                        <div className="divTable">
                            <h3>Update Profile</h3>

                            <div className="profile">
                                <md-filled-text-field
                                    value={profile.display_name}
                                    label="Display Name"
                                    type="text"
                                    onBlur={e => setDisplayName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="profile">
                                <md-filled-text-field
                                    value={profile.affiliation}
                                    label="Affiliation"
                                    type="text"
                                    onBlur={e => setAffiliation(e.target.value)}
                                />
                            </div>

                            <div className="profile">
                                <md-filled-text-field
                                    value={profile.orcid}
                                    label="ORCID"
                                    type="text"
                                    onBlur={e => setOrcid(e.target.value)}
                                />
                            </div>

                            <div className="profile">
                                    <md-switch
                                        selected={initialSwitch()}
                                        onClick={e => updateSwitch(e)}
                                    />
                                    &nbsp;Send me notification emails
                            </div>

                            {error &&
                                <div className="profile error">{error}</div>
                            }

                        </div>

                        <div style={{"marginBottom":20}}>
                            <md-filled-button style={{marginRight:"10px"}} type="submit">Update</md-filled-button>
                        </div>
                    </form>
                }

                {/* Raw Data */}
                <div className="divTable">
                    <DetailHeader
                        t="Raw Data"
                        m={JSON.stringify(profile, null, 4)}
                        p="true"
                    />
                </div>

                {/* Login Data */}
                <div className="divTable">
                    <DetailHeader
                        t="Login Data"
                        m={JSON.stringify(loggedIn, null, 4)}
                        p="true"
                    />
                </div>

            </div>
        </>
    )

};

export default UpdateProfile;
