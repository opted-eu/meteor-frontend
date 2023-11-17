import React from 'react';
import {Link} from "react-router-dom";

const DetailAudience = ({ item }) => {

    const retDate = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        return dt
    }

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    const formatText = (t) => {
        if (t){
            var splitStr = t.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        return null;
    }

    return (
        <>
            {item["audience_size_recent|timestamp"] &&
                <>
                    <div className="divTableRow">
                        <div className="divTableCell">Date:</div>
                        {item["audience_size|data_from"] &&
                            <div className="divTableCell">Data:</div>
                        }
                        <div className="divTableCell">{formatText(item["audience_size|unit"]["0"])}:</div>
                    </div>

                    <div className="divTableRow">
                        <div className="divTableCell">{retDate(item["audience_size_recent|timestamp"])}</div>
                        {item["audience_size|data_from"] &&
                            <div className="divTableCell"><a
                                href={item["audience_size|data_from"]["0"]} target="_blank">{item["audience_size|data_from"]["0"]}</a>
                            </div>
                        }
                        <div className="divTableCell">{item["audience_size|count"]["0"]}</div>
                    </div>
                </>
            }
        </>
    )
};
export default DetailAudience;