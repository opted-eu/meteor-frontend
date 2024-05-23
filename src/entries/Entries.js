import {useNavigate, Link, useSearchParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";
import getProfile from "../user/getProfile";
import {ProfileContext} from "../user/ProfileContext";
import {PrimaryTab} from "@material/web/tabs/primary-tab";
import {Tabs} from "@material/web/tabs/tabs";

const Entries = () => {

    const navigate = useNavigate();
    const [token, setToken] = useContext(UserContext);
    const [count, setCount] = useState('Loading')
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState();
    const [profile, setProfile] = useContext(ProfileContext);
    const [showTab, setShowTab] = useState('1');
    const [entriesPending, setEntriesPending] = useState([]);
    const [entriesAccepted, setEntriesAccepted] = useState([]);
    const [entriesRejected, setEntriesRejected] = useState([]);

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
                setCount(data?.length)
                createEntryArrays(data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoaded(true)
            });
    }

    useEffect(() => {
        getData()
    }, [token])

    if (loggedIn && profile.uid && !loaded){
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

    const createEntryArrays = (data) => {

        try {
            let ep = data.filter(function (ep) {
                return ep.entry_review_status === 'pending';
            });
            setEntriesPending(ep)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }


        try {
            let ea = data.filter(function (ea) {
                return ea.entry_review_status === 'accepted';
            });
            setEntriesAccepted(ea)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }

        try {
            let er = data.filter(function (er) {
                return er.entry_review_status === 'rejected';
            });
            setEntriesRejected(er)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
        }

    }

    return (
        <>
            <h1>My Entries</h1>

            <p align="center"><strong>{ count }</strong> record{ count === 1 ? "" : "s"} in total</p>

            <md-tabs>
                <md-primary-tab
                    onClick={() => goTabs('1')}>
                    Pending
                </md-primary-tab>
                <md-primary-tab
                    onClick={() => goTabs('2')}>
                    Accepted
                </md-primary-tab>
                <md-primary-tab
                    onClick={() => goTabs('3')}>
                    Rejected
                </md-primary-tab>
            </md-tabs>

            {loaded && loggedIn && (
                <>
                    {showTab === '1' && (
                        <div role="tabpanel" id="panel-one" aria-labelledby="tab-one" className='tab_panel'>

                            {entriesPending?.map(item => (
                                <>
                                    <div className="infobox" key={item.uid}>
                                        <div style={{float: 'right'}}>
                                            <md-filled-button type="button"
                                                              onClick={() => navigate('/detail/' + item._unique_name)}>View
                                            </md-filled-button>
                                            &nbsp;&nbsp;
                                            <md-filled-button type="button"
                                                              onClick={() => navigate('/edit/' + item.uid)}>Edit
                                            </md-filled-button>
                                        </div>
                                        <h4><Link to={getQuery(item._unique_name)}>{item.name}</Link>
                                        </h4>
                                        <p><strong>{getDgraph(item)}</strong></p>
                                        <p>
                                            {item.entry_review_status}<br/>
                                            {retDate(item._date_created)}
                                        </p>
                                    </div>

                                </>
                            ))}

                        </div>
                    )}
                    {showTab === '2' && (
                        <div role="tabpanel" id="panel-two" aria-labelledby="tab-two" className='tab_panel'>

                            {entriesAccepted?.map(item => (
                                <>
                                    <div className="infobox" key={item.uid}>
                                        <div style={{float: 'right'}}>
                                            <md-filled-button type="button"
                                                              onClick={() => navigate('/detail/' + item._unique_name)}>View
                                            </md-filled-button>
                                            &nbsp;&nbsp;
                                            <md-filled-button type="button"
                                                              onClick={() => navigate('/edit/' + item.uid)}>Edit
                                            </md-filled-button>
                                        </div>
                                        <h4><Link to={getQuery(item._unique_name)}>{item.name}</Link>
                                        </h4>
                                        <p><strong>{getDgraph(item)}</strong></p>
                                        <p>
                                            {item.entry_review_status}<br/>
                                            {retDate(item._date_created)}
                                        </p>
                                    </div>

                                </>
                            ))}

                        </div>
                    )}
                    {showTab === '3' && (
                        <div role="tabpanel" id="panel-three" aria-labelledby="tab-three" className='tab_panel'>

                            {entriesRejected?.map(item => (
                                <>
                                    <div className="infobox" key={item.uid}>
                                        <div style={{float: 'right'}}>
                                            <md-filled-button type="button"
                                                              onClick={() => navigate('/rejected/' + item.uid)}>View
                                            </md-filled-button>
                                        </div>
                                        <h4><Link to={getQuery(item._unique_name)}>{item.name}</Link>
                                        </h4>
                                        <p><strong>{getDgraph(item)}</strong></p>
                                        <p>
                                            {item.entry_review_status}<br/>
                                            {retDate(item._date_created)}
                                        </p>
                                    </div>

                                </>
                            ))}

                        </div>
                    )}

                </>
            )}
        </>
    )

};

export default Entries;
