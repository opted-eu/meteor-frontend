import React from 'react';

const DetailList = ({ d, s }) => {

    const formatText = (t) => {
        if (t) {
            var splitStr = t.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        return null;
    }

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">{s}:</div>
                    <div className="divTableCell">
                        {d.map(x => (
                            <span className="link_list" key={x}>{formatText(x)}</span>
                        ))}
                    </div>
                </div>
            }
        </>
    )
};
export default DetailList;