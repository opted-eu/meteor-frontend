import React from 'react';
import {Link} from "react-router-dom";

const DetailField = ({ d, s, t, u=null, w=null, query_predicate="country" }) => {

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

    const getQuery = (s, uid) => {
        let dt = null
        switch(s){
            case 'Archives':
                dt = 'Archive'
                break
            case 'Datasets':
                dt = 'Dataset'
                break
            case 'Journalistic Brands':
                dt = 'JournalisticBrand'
                break
            case 'News Sources':
                dt = 'NewsSource'
                break
            case 'Organizations':
                dt = 'Organization'
                break
            case 'Parliaments':
                dt = 'Parliament'
                break
            case 'People':
                dt = 'People'
                break
            case 'Political Parties':
                dt = 'PoliticalParty'
                break
            case 'Scientific Publications':
                dt = 'ScientificPublication'
                break
            case 'Tools':
                dt = 'Tool'
                break
            case 'Learning Materials':
                dt = 'LearningMaterial'
                break
            default:
                return
        }
        return '/search?dgraph.type=' + dt + '&' + query_predicate + '=' + uid
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
        dt = dt.getFullYear() + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" +(dt.getDate()).toString().padStart(2, '0')
        return dt
    }

    const retDateYear_old = (d) => {
        let dt = new Date(d)
        dt = dt.getFullYear()
        return dt
    }

    // This version ignores time zones
    const retDateYear = (d, str=false) => {
        if (d) {
            let dt = d.substring(0, 4);
            if (!str){
                dt = parseInt(dt)
            }
            return dt
        }
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

    //console.log('d=' + d)
    //console.log('w=' + w)

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">{s}:</div>
                    <div className={getCellStyle(t)}>
                        {
                            t === 'boolean' ? formatBoolean(d) :
                                t === 'date' ? retDate(d) :
                                    t === 'year' ? retDateYear(d) :
                                        t === 'safe' ? d :
                                            t === 'upper' ? getUpper(d) :
                                                t === 'query' ? <Link to={getQuery(s, u)}>{d}</Link> :
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