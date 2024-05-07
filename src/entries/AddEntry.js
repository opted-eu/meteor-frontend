import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";

async function addRecord(dgraph_type, json_entry, token) {
    return fetch(process.env.REACT_APP_API + 'add/' + dgraph_type, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token?.access_token
        },
        body: JSON.stringify(json_entry)
    })
        .then(data => data.json())

}

async function editRecord(uid, json_entry, token) {
    return fetch(process.env.REACT_APP_API + 'edit/' + uid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token?.access_token
        },
        body: JSON.stringify(json_entry)
    })
        .then(data => data.json())

}

const AddEntry = () => {

    let { uid } = useParams();
    const [searchParams] = useSearchParams();

    let initialJSON = () => {
        let j = {}
        j['name'] = entryName
        let d = {'data': j}
        return d
    }

    //get querystring
    let initalEntity = ''
    let initialEntryName = ''

    for (let param of searchParams) {
        if (param[0] == 'name'){
            initialEntryName = param[1]
        } else {
            if (param[0] == 'dgraph_type'){
                initalEntity = param[1]
            }
        }
    }

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [entity, setEntity] = useState(initalEntity);
    const [entryName, setEntryName] = useState(initialEntryName);
    const [json, setJson] = useState(initialJSON())
    const [error, setError] = useState(null);
    const [addResponse, setAddResponse] = useState(null);
    const [item, setItem] = useState(null);

    let updateJSON = (key, val) => {
        let j = {}

        // add all state vars
        j['name'] = entryName

        // update changed var
        j[key] = val

        // add top key and update
        let d = {'data': j}
        //console.log(d)
        setJson(d)
    }

    let updateInitialJSON = (i) => {
        console.log(i)
        let j = {}

        //set dgraph type
        setEntity(getDgraph(i))

        // add all state vars
        j['name'] = i.name
        setEntryName(i.name)

        // add top key and update
        let d = {'data': j}
        setJson(d)
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

    const fetchItemData = () => {
        let getItem = process.env.REACT_APP_API + "view/uid/" + uid

        fetch(getItem, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                updateInitialJSON(data);
                setItem(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
    }

    useEffect(() => {
        getData()
        if (uid){
            fetchItemData()
        }
    }, [])

    const TextStyles = {
        width:'100%'
    };

    const handleSubmitAE = async e => {
        e.preventDefault();
        if (1===1) {
            let resp = null
            if (uid) {
                //edit
                resp = await editRecord(
                    uid,
                    json,
                    token
                );
            } else {
                //add
                resp = await addRecord(
                    entity,
                    json,
                    token
                );
            }
            if (resp.status === 200) {
                setAddResponse(resp);
                setError(null)
                //navigate('/detail/' + resp.uid)
            } else {
                setError(resp.message)
            }
        } else {
            setAddResponse(json)
        }
    }

    return (
        <>
            {loggedIn && (
                <>
                    <h1>{uid ? 'Edit' : 'Add'} {entity}</h1>

                    <form id="addEntry" onSubmit={handleSubmitAE}>

                        <div>
                            <h4>How do you want to call your new {entity}? *</h4>
                            <md-filled-text-field
                                style={TextStyles}
                                name="entry_name"
                                value={entryName}
                                onBlur={event => {
                                    const { value } = event.target;
                                    if (value) {
                                        setEntryName(value)
                                    } else {
                                        setEntryName('')
                                    }
                                    updateJSON('name', value)
                                }}
                                required
                            />
                        </div>

                        <div style={{clear:"both", "marginTop":10}}>
                            <md-filled-button id="submitForm" type="submit">{uid ? 'Edit' : 'Add'}&nbsp;{entity}</md-filled-button>&nbsp;
                        </div>

                    </form>

                    <br />

                    <h4>Add JSON</h4>
                    <pre>{JSON.stringify(json, null, 4)}</pre>

                    <br /><br />
                    <h4>Add Response</h4>

                    <pre>{JSON.stringify(addResponse, null, 4)}</pre>

                    <br /><br />
                    <h4>Error</h4>
                    {error}

                </>
            )}
        </>
    )

};

export default AddEntry;
