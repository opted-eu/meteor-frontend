import {useNavigate, Link, useSearchParams} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";
import getProfile from "../user/getProfile";
import {ProfileContext} from "../user/ProfileContext";
import {PrimaryTab} from "@material/web/tabs/primary-tab";
import {Tabs} from "@material/web/tabs/tabs";

const AddCheck = () => {

    const navigate = useNavigate();
    const [token, setToken] = useContext(UserContext);
    const [count, setCount] = useState('Loading')
    const [entries, setEntries] = useState()
    const [loggedIn, setLoggedIn] = useState();
    const [profile, setProfile] = useContext(ProfileContext);
    const [showTab, setShowTab] = useState();

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
        getProfile(setProfile)
    }

    const fetchItemData = () => {
        // fetch types
        fetch(process.env.REACT_APP_API + "user/" + profile.uid + "/entries", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.length > 0) {
                    setCount(data.length)
                    setEntries(data);
                } else {
                    setCount(0)
                    setEntries(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    if (profile.uid && !entries){
        //console.log(profile)
        fetchItemData()
    }

    const getQuery = (un) => {
        return '/detail/' + un
    }

    const retDate = (d) => {
        if (d){
            let dt = new Date(d)
            return dt.getFullYear() + "-" + (dt.getMonth() + 1).toString().padStart(2, '0') + "-" + (dt.getDate()).toString().padStart(2, '0')
        }
        return ''
    }

    const getDgraph = (d) => {
        let dg = d["dgraph.type"]
        if (dg) {
            let ret = ''
            for (var t of dg) {
                if (t !== 'Entry') {
                    ret += t
                }
            }
            return ret;
        }
        return null;
    }

    let goTabs = (t) => {
        setShowTab(t)
    }

    return (
        <>
            {entries && (
                <>
                    {entries.length > 0 && loggedIn && (
                        <>
                            <h1>My Entries</h1>

                            <md-tabs>
                                <md-primary-tab
                                    onClick={() => goTabs('1')}>
                                    Pending
                                </md-primary-tab>
                                <md-primary-tab
                                    onClick={() => goTabs('2')}>
                                    Accepted</md-primary-tab>
                                <md-primary-tab
                                    onClick={() => goTabs('3')}>
                                    Rejected
                                </md-primary-tab>
                            </md-tabs>

                            {showTab === '1' && (
                                <div role="tabpanel" id="panel-one" aria-labelledby="tab-one">Pending</div>
                            )}
                            {showTab === '2' && (
                                <div role="tabpanel" id="panel-two" aria-labelledby="tab-two">Accepted</div>
                            )}
                            {showTab === '3' && (
                                <div role="tabpanel" id="panel-three" aria-labelledby="tab-three">Rejected</div>
                            )}

                            <p align="center"><strong>{ count }</strong> record{ count === 1 ? "" : "s"}</p>

                            {entries.map(item => (
                                <div className="infobox" key={item.uid}>
                                    <div style={{float:'right'}}>
                                        <md-filled-button type="button" onClick={() => navigate('/detail/' + item._unique_name)}>View</md-filled-button>&nbsp;&nbsp;
                                        <md-filled-button type="button" onClick={() => navigate('/edit/' + item.uid)}>Edit</md-filled-button>
                                    </div>
                                    <h4><Link to={getQuery(item._unique_name)}>{item.name}</Link></h4>
                                    <p><strong>{getDgraph(item)}</strong></p>
                                    <p>
                                        {item.entry_review_status}<br />
                                        {retDate(item._date_created)}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </>
    )

};

export default AddCheck;
