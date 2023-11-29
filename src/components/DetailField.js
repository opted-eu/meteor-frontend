import React from 'react';
import {Link} from "react-router-dom";

const DetailField = ({ d, s, t, u=null, w=null }) => {

    const formatBoolean = (b) => {
        if (b === true){
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const getUserLink = (uid) => {
        return '/users/' + uid + "/entries"
    }

    const formatText = (t) => {
        if (t){
            var splitStr = t.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        return null;
    }

    const retDate = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        return dt
    }

    const retDateYear = (d) => {
        let dt = new Date(d)
        dt = dt.getFullYear()
        return dt
    }

    const getCellStyle = (t) => {
        if (t === 'titletext'){
            return 'divTableCellTitle'
        }
        return "divTableCell"
    }

    const getUpper = (d) => {
        return d.toUpperCase()
    }

    const getWidth = (w) => {
        if (w){
            return "150px"
        }
        return "200px"
    }
    //console.log('d=' + d)
    //console.log('w=' + w)

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead" style={{width:getWidth(w)}}>{s}:</div>
                    <div className={getCellStyle(t)}>
                        {
                            t === 'boolean' ? formatBoolean(d) :
                                t === 'date' ? retDate(d) :
                                    t === 'year' ? retDateYear(d) :
                                        t === 'safe' ? d :
                                            t === 'upper' ? getUpper(d) :
                                                t === 'color' ? <span style={{backgroundColor: "#" + d, width: "15px", height: "15px", display: "block", borderStyle: "solid", borderWidth: "0px"}}></span> :
                                                    t === 'un' ? <span style={{wordBreak: "break-all"}}>{d}</span> :
                                                        t === 'user' ? <Link to={getUserLink(u)}>{d}</Link> :
                                                            t === 'role' ?
                                                                (d === 1 ? "Contributor" : "Admin") :
                                                                formatText(d)
                        }
                    </div>
                </div>
            }
        </>
    )
};
export default DetailField;