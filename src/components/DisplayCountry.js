import React from 'react';
import {Link} from "react-router-dom";

const DisplayCountries = ({ j }) => {

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    return (
        <div className="divTableBody">
            <div className="divTableRow">
                <div className="divTableHead">Country:</div>
                <div className="divTableCell"><Link to={getlink(j.uid)}>{j.name}</Link></div>
            </div>
        </div>
    )
};
export default DisplayCountries;