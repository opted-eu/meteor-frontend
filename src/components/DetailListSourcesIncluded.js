import React from 'react';
import {Link} from "react-router-dom";
import LinkNewsSource from './LinkNewsSource';

const DetailListSourcesIncluded = ({ items }) => {
    
    const getLink = (unique_name) => {
        return '/detail/' + unique_name
    }

    // TODO: Add sorting by countries
    let sorted_by_type = {}
    for (let item of items) {
        let item_type = item['dgraph.type'].filter(e => e !== 'Entry')[0]
        if (!Object.keys(sorted_by_type).includes(item_type)) {
            sorted_by_type[item_type] = []
        }
        sorted_by_type[item_type].push(item)  
        // if (item_type === 'NewsSource') {
        //     // sorted_by_type[item_type].push(<LinkNewsSource item={item} />)
        //     sorted_by_type[item_type].push(item)
        // } else {
            // sorted_by_type[item_type].push(<Link to={getLink(item._unique_name)}>{item.name}</Link>)
    }

    
    let sorted_by_country = {}
    for (let dgraph_type of Object.keys(sorted_by_type)) {
        sorted_by_country[dgraph_type] = {}
        for (let country of Array.from(new Set(sorted_by_type[dgraph_type].map(e => e.country?.name))).sort()) {
            if (country !== undefined) {
            sorted_by_country[dgraph_type][country] = []
            }
        }
        for (let item of sorted_by_type[dgraph_type]) {
            if (item.country !== undefined) {
                sorted_by_country[dgraph_type][item.country?.name].push(item)
            } else {
                if (!Object.keys(sorted_by_country[dgraph_type]).includes(" ")) {
                    sorted_by_country[dgraph_type][" "] = []
                }
                    sorted_by_country[dgraph_type][" "].push(item)
            }
        }
    }

    return (
        <>
            {Object.keys(sorted_by_country).map((dgraph_type) => (
                <div key={dgraph_type} className='divTableRow'>
                    <div className='divTableHead'>{dgraph_type.replace(/([a-z])([A-Z])/g, '$1 $2') + 's:'}</div>
                    <div className='divTableCell'>
                {Object.keys(sorted_by_country[dgraph_type]).map((country, index) => (
                    <>
                    <h6 key={country + index}>{country}</h6>
                    {<><p>
                        {sorted_by_country[dgraph_type][country].map((item, i) => (
                        <span key={item.uid} className='me-4'>{
                            dgraph_type === 'NewsSource' ? <LinkNewsSource item={item} /> : <Link to={getLink(item._unique_name)}>{item.name}</Link>}
                        </span>
                    ))}
                    </p></>
                    }
                    </>
                ))}
                </div>
                </div>
            ))
            }
        </>
    )
};
export default DetailListSourcesIncluded;