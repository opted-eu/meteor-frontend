import React from 'react';
import {Link} from "react-router-dom";

const DetailFieldHead = ( {item} ) => {

    //console.log(item.uid)

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

    const getWidth = (w) => {
        if (w){
            return "150px"
        }
        return "200px"
    }

    const getDgraph = (d) => {
        let dg = d["dgraph.type"]
        if(dg) {
            let ret = ''
            for (var t of dg){
                if (t !== 'Entry') {
                    ret += t
                }
            }
            return ret;
        }
        return null;
    }

    return (
        <>
            {item &&
                <div className="divDetailHeader">
                    <div className="divDetailRow">
                        <div className="divDetailColumn">
                            <div className="divDetailHeadKey">Type</div>
                            <div className="divDetailHeadValue">{getDgraph(item)}</div>
                        </div>
                        <div className="divDetailColumn">
                            <div className="divDetailHeadKey">Created</div>
                            <div className="divDetailHeadValue">{retDate(item._date_created)}</div>
                        </div>
                    </div>
                    <div className="divDetailRow">
                        <div className="divDetailColumn">
                            <div className="divDetailHeadKey">UID</div>
                            <div className="divDetailHeadValue">{formatText(item.uid)}</div>
                        </div>
                        <div className="divDetailColumn">
                            <div className="divDetailHeadKey">OPTED ID</div>
                            <div className="divDetailHeadValue" style={{wordBreak: "break-all"}}>{item._unique_name}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};
export default DetailFieldHead;