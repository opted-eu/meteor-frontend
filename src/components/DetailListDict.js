import React from 'react';
import {Link} from "react-router-dom";


const DetailListDict = ({ d, s, h=null }) => {

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">
                        {h ? <h3>{s}</h3> : s }
                    </div>
                    <div className="divTableCell">
                        {d.map(x => (
                            <span className="link_list" key={x.uid}><Link to={getLink(x._unique_name)}>{x.name}</Link></span>
                        ))}
                        {d === undefined &&
                            <>
                                None
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
};
export default DetailListDict;