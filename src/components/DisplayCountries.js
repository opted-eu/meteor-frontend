import React from 'react';
import {Link} from "react-router-dom";

const DisplayCountries = ({ j, t }) => {

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    /*
    const retDateFrom = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        if (dt != 'NaN'){
            return ' from ' + dt
        }
    }

    const retDateTo = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        if (dt != 'NaN'){
            return ' to ' + dt
        }
    }
    */

    const retYearFrom = (d) => {
        if (d) {
            let dt = new Date(d)
            dt = dt.getFullYear()
            if (dt > 0) {
                return ' from ' + dt
            }
        }
        return ''
    }

    const retYearTo = (d) => {
        if (d) {
            let dt = new Date(d)
            dt = dt.getFullYear()
            if (dt > 0) {
                return ' to ' + dt
            }
        }
        return ''
    }

    const types = ["Archive", "NewsSource", "Collection"]

    //console.log(t)

    return (
        <>
            <div className="divTableRow">
                <div className="divTableHead">Countries covered in {t.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}:</div>
                <div className="divTableCell">
                    {j.map(c =>
                        <span className="link_list" key={c.uid}><Link to={getlink(c._unique_name)}>{c.name}</Link>
                            {!types.includes(t) &&
                                <>
                                    <span className="reduced">{retYearFrom(c["countries|temporal_coverage_end"])}
                                    {retYearTo(c["countries|temporal_coverage_end"])}</span>
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