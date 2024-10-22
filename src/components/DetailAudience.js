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
            {item["audience_size"] &&
                <>
                    <div className="divTableRow">
                        <div className="divTableHead">Audience Size:</div>
                        <div className="divTableCell">
                            <div className="divTable">
                                <div className="divTableRow">
                                    <div className="divTableCell">Date:</div>
                                    {item["audience_size|data_from"] && item["audience_size|data_from"]["0"] !== 'None' &&
                                        <div className="divTableCell">Data from:</div>
                                    }
                                    {item["audience_size|unit"] && item["audience_size|unit"]["0"] !== 'None' &&
                                        <div className="divTableCell">{formatText(item["audience_size|unit"]["0"])}:</div>
                                    }
                                </div>

                                <div className="divTableRow">
                                    <div className="divTableCell">{retDate(item["audience_size"])}</div>
                                    {item["audience_size|data_from"] && item["audience_size|data_from"]["0"] !== 'None' &&
                                        <div className="divTableCell"><Link to={item["audience_size|data_from"]["0"]}>{item["audience_size|data_from"]["0"]}</Link>
                                        </div>
                                    }
                                    {item["audience_size|count"] && item["audience_size|count"]["0"] !== 'None' &&
                                        <div className="divTableCell">{item["audience_size|count"]["0"]}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
};
export default DetailAudience;