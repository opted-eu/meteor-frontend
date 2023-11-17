import React from 'react';

const DetailHeader = ({ t, m, p = undefined }) => {

    return (
        <div className="divTableRow">
            <div className="divTableHead"><h3>{t}</h3></div>
            <div className="divTableCell">{p ? <pre>{m}</pre> : m}</div>
        </div>
    )
};
export default DetailHeader;