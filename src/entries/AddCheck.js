import {useNavigate, Link, useSearchParams} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";

const AddCheck = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [token, setToken] = useContext(UserContext);
    const [duplicates, setDuplicates] = useState("");
    const [count, setCount] = useState('Loading')
    const [loggedIn, setLoggedIn] = useState();

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
    }

    //get querystring
    let entity = ''
    let entryName = ''

    for (let param of searchParams) {
        if (param[0] == 'name'){
            entryName = param[1]
        } else {
            if (param[0] == 'dgraph_type'){
                entity = param[1]
            }
        }
    }

    const fetchItemData = () => {
        // fetch types
        fetch(process.env.REACT_APP_API + "add/check?name=" + entryName + "&dgraph_type=" + entity, {
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
                    setDuplicates(data);
                } else {
                    navigate('/add/entry?name=' + entryName + '&dgraph_type=' + entity)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
        getData()
    }, [])

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

    return (
        <>
            {duplicates.length > 0 && loggedIn && (
                <>
                    <h1>Add New Entry</h1>

                    <div className="infobox">
                        <h3>Found following entries matching "{entryName}"</h3>

                        <p>Please go through the list below and make sure your suggestion is not in the inventory yet</p>

                    </div>

                    <p align="center"><strong>{ count }</strong> record{ count === 1 ? "" : "s"}</p>

                    {duplicates.map(item => (
                        <div className="infobox" key={item.uid}>
                            <h4><Link to={getQuery(item._unique_name)}>{item.name}</Link></h4>
                            <p>
                                {item.entry_review_status}<br />
                                {retDate(item._date_created)}</p>
                        </div>
                    ))}

                    <div>
                        <br />
                        <h3>Is your suggestion listed above or new?</h3>
                        <div style={{clear:"left", "marginBottom":20}}>
                            <md-filled-button type="button" onClick={() => navigate('/add')}>Already listed</md-filled-button>&nbsp;
                            <md-filled-button type="button" onClick={() => navigate('/add/entry?name=' + entryName + '&dgraph_type=' + entity)}>My suggestion is new</md-filled-button>
                        </div>
                    </div>

                </>
            )}

        </>
    )

};

export default AddCheck;
