import React from 'react';

const DetailList = ({ d, s, n=false }) => {

    const formatText = (t) => {
        if (t){
            if (n){
                switch (t){
                    case 1:
                        return "Mon "
                    case 2:
                        return "Tue "
                    case 3:
                        return "Wed "
                    case 4:
                        return "Thu "
                    case 5:
                        return "Fri "
                    case 6:
                        return "Sat "
                    case 7:
                        return "Sun "
                    default:
                        return null
                }
            } else {
                var splitStr = t.toLowerCase().split(' ');
                for (var i = 0; i < splitStr.length; i++) {
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                }
                // Directly return the joined string
                return splitStr.join(' ');
            }
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