import React from 'react';
import {Link} from "react-router-dom";
import LinkNewsSource from './LinkNewsSource';

const DetailListSourcesIncluded = ({ items }) => {

    let sorted = new Object()

    const getLink = (unique_name) => {
        return '/detail/' + unique_name
    }

    // TODO: Add sorting by countries
    for (let item of items) {
        let item_type = item['dgraph.type'].filter(e => e !== 'Entry')[0]
        if (!Object.keys(sorted).includes(item_type)) {
            sorted[item_type] = new Array()
        }
        if (item_type === 'NewsSource') {
            sorted[item_type].push(<LinkNewsSource item={item} />)
        } else {
            sorted[item_type].push(<Link to={getLink(item._unique_name)}>{item.name}</Link>)
        }    }

    return (
        <>
            {Object.keys(sorted).map((dgraph_type) => (
                <div key={dgraph_type} className='divTableRow'>
                    <div className='divTableHead'>{dgraph_type.replace(/([a-z])([A-Z])/g, '$1 $2') + 's:'}</div>
                    <div className='divTableCell'>
                {sorted[dgraph_type].map((item, index) => (
                    <span key={index} className='me-4'>{item}</span>
                ))}
                </div>
                </div>
            ))
            }
        </>
    )
};
export default DetailListSourcesIncluded;