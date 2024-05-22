import {Link, useNavigate} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCheckForm from "./AddCheckForm";
import React, {useContext, useEffect, useState} from "react";
import getLoggedIn from "../user/getLoggedIn";
import {UserContext} from "../user/UserContext";

const Add = () => {

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
    }

    useEffect(() => {
        getData()
    }, [token])

    return (
        <>
            {loggedIn && (
                <>
                    <h1>Add New Entry</h1>

                    <div className="infobox">
                        <h3>First time doing this?</h3>

                        <p>Please quickly read through our <Link to='/guides/newssource'>detailed guide for adding entries</Link> to the inventory.</p>

                        <h4>Quick Tips</h4>
                        <ul>
                            <li>The <InfoIcon /> icons next to the questions give you additional information and explanations</li>
                            <li>The <MenuBookIcon /> icons give you ideas on how to retrieve some specific information.</li>
                        </ul>
                    </div>

                    <br /><br />

                    <AddCheckForm />
                </>
            )}

        </>
    )

};

export default Add;
