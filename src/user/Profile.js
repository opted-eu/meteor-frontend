import React, {useContext, useEffect, useState} from 'react';
import '@material/web/textfield/filled-text-field.js'
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import {UserContext} from "./UserContext";
import {useNavigate, Link, useSearchParams} from "react-router-dom";
import DetailField from "../components/DetailField";
import DetailHeader from "../components/DetailHeader";
import {ProfileContext} from "./ProfileContext";
import getProfile from "./getProfile"
import getLoggedIn from "./getLoggedIn"
import DetailExtLink from "../components/DetailExtLink";
import '@material/web/dialog/dialog.js';

const Profile = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [searchParams] = useSearchParams();
    let message = null

    for (let param of searchParams) {
        if (param[0] === 'msg') {
            message = param[1]
        }
    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, navigate)
        getProfile(token, setProfile, navigate)
    }

    useEffect(() => {
        getData()
    }, [token])

    async function deleteAccount() {
        return fetch(process.env.REACT_APP_API + 'user/profile/delete', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(data => data.json())

    }

    let b = document.getElementById('dialog')
    let c = document.getElementById('cancelButton')
    let d = document.getElementById('deleteButton')

    if (c && d) {
        d.addEventListener('click', async () => {
            console.log('delete')
            // delete account
            const ret = await deleteAccount();
            console.log(ret)
            navigate(
                '/logout'
            )
        });

        c.addEventListener('click', async () => {
            await b.close();
            console.log('cancel')
        });
    }
    const showDialog = () => {
        b.open = true
        console.log(d)
    }


    return (
        <>
            <div>
                {profile &&
                    <>
                        {message &&
                            <div className="message">{message}</div>
                        }
                        <div className="divTable">
                            <div className="divTableRow">
                                <div className="divTableHead"><h3>User Profile:</h3></div>
                                <div className="divTableCell">
                                    We store as little personal data as possible. Only your user name is visible to other users. Your email address is stored for administrative purposes only and not visible for other users. However, feel free to add more information about yourself. <Link to='/privacy'>More information on data storage and security can be found here</Link>.
                                </div>
                            </div>

                            <div>&nbsp;</div>

                            <DetailField
                                d={profile.email}
                                s="Email"
                                t="text"
                            />

                            <DetailField
                                d={profile._date_joined}
                                s="Date joined"
                                t="year"
                            />

                            <DetailField
                                d={profile.display_name}
                                s="Display Name"
                                t="text"
                            />

                            <DetailField
                                d={profile.role}
                                s="User Role"
                                t="role"
                            />

                            <DetailField
                                d={profile.affiliation}
                                s="Affiliation"
                                t="text"
                            />

                            <DetailExtLink
                                d={profile.orcid}
                                s="ORCID"
                                u="https://orcid.org/"
                            />

                            <DetailField
                                d=""
                                s="Affiliation"
                                t="text"
                            />

                            <DetailField
                                d={profile.preference_emails}
                                s="Email Notifications"
                                t="boolean"
                            />

                        </div>

                        <div style={{"marginBottom":20}}>
                            <md-filled-button style={{marginRight:"10px"}} type="button" onClick={() => navigate('/profile/update')}>Update Profile</md-filled-button>
                            <md-text-button style={{marginRight:"10px"}} type="button" onClick={() => navigate('/profile/password/change')}>Change Password</md-text-button>
                            <md-text-button style={{marginRight:"10px"}} type="button" onClick={() => showDialog()}>Delete Account</md-text-button>
                        </div>

                        <md-dialog id='dialog'>
                            <div slot="headline">Are you sure? This cannot be undone!</div>
                            <form id="form" slot="content" method="dialog">
                                If you delete your account, the changes will take effect immediately. The data you entered will be retained, but all your personal information (e.g. email address) will be deleted from our database.
                            </form>
                            <div slot="actions">
                                <md-text-button
                                    id="deleteButton"
                                    form="form"
                                    value="delete">
                                    Delete Account
                                </md-text-button>
                                <md-filled-button
                                    id="cancelButton"
                                    form="form"
                                    value="cancel"
                                    autofocus>
                                    Cancel
                                </md-filled-button>
                            </div>
                        </md-dialog>
                    </>
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

export default Profile;
