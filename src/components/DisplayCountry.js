import React from 'react';
import {Link} from "react-router-dom";

const DisplayCountry = ({ j }) => {

    const getlink = (country) => {
        return '/detail/' + country._unique_name
    }

    return (
        <div className="divTableBody">
            <div className="divTableRow">
                <div className="divTableHead">Country:</div>
                <div className="divTableCell"><Link to={getlink(j)}>{j.name}</Link></div>
            </div>
        </div>
    )
};
export default DisplayCountry;