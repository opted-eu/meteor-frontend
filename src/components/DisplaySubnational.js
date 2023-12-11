import React from 'react';
import {Link} from "react-router-dom";

const DisplayCountries = ({ j, t }) => {

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    //console.log(t)

    return (
        <>
            <div className="divTableRow">
                <div className="divTableHead">Subnational units covered in {t.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}:</div>
                <div className="divTableCell">
                    {j.map(c =>
                        <span className="link_list" key={c.uid}><Link to={getlink(c._unique_name)}>{c.name} ({c.country.name})</Link>
                        </span>
                    )}
                </div>
            </div>
        </>
    )
};
export default DisplayCountries;