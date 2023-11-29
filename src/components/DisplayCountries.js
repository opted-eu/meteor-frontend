import React from 'react';
import {Link} from "react-router-dom";

const DisplayCountries = ({ j, t }) => {

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    const retDate = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        return dt
    }

    const types = ["Archive", "NewsSource", "Collection"]

    //console.log(t)

    return (
        <>
            <div className="divTableRow">
                <div className="divTableHead">Countries covered in {t.toLowerCase()}:</div>
                <div className="divTableCell">
                    {j.map(c =>
                        <span className="link_list" key={c.uid}><Link to={getlink(c._unique_name)}>{c.name}</Link>
                            {!types.includes(t) &&
                                <>
                                    {" "}from {retDate(c["countries|temporal_coverage_end"])} to {retDate(c["countries|temporal_coverage_end"])}
                                </>
                            }
                        </span>
                    )}
                </div>
            </div>
        </>
    )
};
export default DisplayCountries;