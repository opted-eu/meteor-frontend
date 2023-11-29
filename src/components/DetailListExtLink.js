import React from 'react';
import LaunchIcon from "@mui/icons-material/Launch";

const DetailListExtLink = ({ d, s, u }) => {

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">{s}:</div>
                    <div className="divTableCell">
                        {d.map(x => (
                            <span className="link_list" key={x}><a href={u+x}>{x}</a> <a href={u + x} target="_blank"><LaunchIcon /></a></span>
                        ))}
                    </div>
                </div>
            }
        </>
    )
};
export default DetailListExtLink;