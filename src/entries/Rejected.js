import {useNavigate, Link, useSearchParams, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";
import getProfile from "../user/getProfile";
import {ProfileContext} from "../user/ProfileContext";
import DetailField from "../components/DetailField";
import DetailHeader from "../components/DetailHeader";

const Rejected = () => {

    let { uid } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useContext(UserContext);
    const [item, setItem] = useState()
    const [loggedIn, setLoggedIn] = useState();
    const [profile, setProfile] = useContext(ProfileContext);

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
        getProfile(setProfile)
    }

    const fetchItemData = () => {
        // fetch types
        fetch(process.env.REACT_APP_API + "view/rejected/" + uid, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItem(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getData()
        fetchItemData()
    }, [])

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

    return (
        <>
            <h1>{item?.name}</h1>

            <div className="divTable">
                <h3>General Information</h3>
                <DetailField
                    d={item?.uid}
                    s="UID"
                />
                <DetailField
                    d={retDate(item?._date_created)}
                    s="Creation Date"
                />
                <DetailField
                    d={item?._added_by.display_name}
                    s="Creation By"
                />
                <DetailField
                    d={item?.entry_review_status}
                    s="Status"
                />
                <DetailField
                    d={item?._reviewed_by.display_name}
                    s="Reviewed By"
                />
            </div>

            {/* Raw Data */}
            {process.env.NODE_ENV === "development" && item &&
                <div className="divTable">
                    <DetailHeader
                        t="Raw Data"
                        m={JSON.stringify(item, null, 4)}
                        p="true"
                    />
                </div>
            }
        </>
    )

};

export default Rejected;
