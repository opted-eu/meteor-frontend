import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../user/UserContext";
import {useNavigate, Link, useSearchParams} from "react-router-dom";
import {ProfileContext} from "../user/ProfileContext";
import getProfile from "../user/getProfile"
import getLoggedIn from "../user/getLoggedIn"
import DetailHeader from "../components/DetailHeader";
import SearchForm from "../forms/SearchForm";
import ReviewFilterForm from "./ReviewFilterForm";

const Review = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);

    var query = ''
    for (let param of searchParams) {
        query += '&' + param[0] + '=' + param[1]
    }
    //remove first '&'
    if (query) {
        query = query.slice(1)
        query = '?' + query
    }

    let message = null

    for (let param of searchParams) {
        if (param[0] === 'msg') {
            message = param[1]
        }
    }

    const fetchItemData = () => {
        fetch(process.env.REACT_APP_API + "review" + query, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
        getProfile(setProfile)
    }

    useEffect(() => {
        getData()
        fetchItemData()
    }, [token])

    const retDateTime = (d) => {
        let dt = new Date(d['_added_by|timestamp'])
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear() + " " + (dt.getHours()).toString().padStart(2, '0') + ":" + (dt.getMinutes()).toString().padStart(2, '0') + ":" + (dt.getSeconds()).toString().padStart(2, '0')
        return dt
    }

    const retDate = (d) => {
        let dt = new Date(d['_added_by|timestamp'])
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        return dt
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

    let displayCountries = (item) => {
        let ret = ''
        if (item.country) {
            ret += item.country?.name
        }
        if (item.countries){
            for (var c of item.countries){
                ret += c.name + ' '
            }
        }
        return ret
    }

    /*
     {
        "_added_by": {
            "_added_by|timestamp": "2022-11-14T13:33:40.944471+00:00",
            "display_name": "Celina Dinhopl",
            "uid": "0x4e57"
        },
        "_unique_name": "organization_kstadigitalemediengmbhcokg",
        "dgraph.type": [
            "Organization"
        ],
        "entry_review_status": "pending",
        "name": "KStA Digitale Medien GmbH & Co. KG",
        "uid": "0x3f84e"
    },
     */
    return (
        <>
            <div>
                {profile &&
                    <>
                        <h3>Review</h3>

                        {message &&
                            <div className="message">{message}</div>
                        }

                        {<ReviewFilterForm
                            searchParams={searchParams}
                        />}

                        <div className="divTable">
                            <div className="divTableRow">
                                <div className="divTableHead">Name</div>
                                <div className="divTableHead">Type</div>
                                <div className="divTableHead">Country</div>
                                <div className="divTableHead">Added</div>
                                <div className="divTableHead">User </div>
                                <div className="divTableHead"></div>
                            </div>
                            {items.length > 0 && (
                                <>
                                    {items.map(item => (
                                        <div className="divTableRow" key={item.uid}>
                                            <div className="divTableCell">{item.name}</div>
                                            <div className="divTableCell">{getDgraph(item)}</div>
                                            <div className="divTableCell">
                                                {item.country?.name}
                                                {item.countries?.map(c => (
                                                    <>
                                                        {c.name}<br />
                                                    </>
                                                    ))}
                                            </div>
                                            <div className="divTableCell">{retDate(item._added_by)}</div>
                                            <div className="divTableCell">{item._added_by.display_name}</div>
                                            <div className="divTableCell"><md-filled-button type="button"
                                                                                            onClick={() => navigate('/detail/' + item._unique_name)}>Review
                                            </md-filled-button></div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                }

            </div>

            {/* Raw Data */}
            {process.env.NODE_ENV === "development" && items && 1 === 2 &&
                <div className="divTable">
                    <DetailHeader
                        t="Raw Data"
                        m={JSON.stringify(items, null, 4)}
                        p="true"
                    />
                </div>
            }

        </>
    )

};

export default Review;
