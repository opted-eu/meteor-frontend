import React from 'react';
import LaunchIcon from "@mui/icons-material/Launch";

const DetailExtLink = ({ d, s, u }) => {

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">{s}:</div>
                    <div className="divTableCell"><a href={u + d} target="_blank">{d}</a> <a href={u + d} target="_blank"><LaunchIcon /></a></div>
                </div>
            }
        </>
    )
};
export default DetailExtLink;