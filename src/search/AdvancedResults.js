import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/css/search.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import Result from "./Result";

const AdvancedResults = ({entity}) => {

    const navigate = useNavigate();
    const [count, setCount] = useState([])
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    // extra state vars for infinite scroll
    const [page, setPage] = useState(1);

    console.log('here')

    const fetchItemData = () => {
        console.log('here2')

        if (entity) {
            console.log('here3')
            let query = 'dgraph.type=' + entity
            let fullsearch = "https://meteor.balluff.dev/api/query?" + query + "&_max_results=12&_page=" + page
            let fullcount = "https://meteor.balluff.dev/api/query/count?" + query
            console.log(fullsearch)

            //fetch count
            fetch(fullcount)
                .then(response => {
                    return response.json()
                })
                .then(data0 => {
                    setCount(data0);
                    console.log(count)
                })
                .catch((err) => {
                    console.log(err);
                });

            // fetch data
            fetch(fullsearch)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setItems(prevItems => [...prevItems, ...data]);
                    setPage(prevPage => prevPage + 1);
                    console.log(page * 12)
                    const p = [];
                    data.forEach(b => {
                        p.push(
                            fetch("https://meteor.balluff.dev/api/view/entry/" + b._unique_name)
                                .then(response1 => {
                                    return response1.json()
                                })
                                .then(data1 => {
                                    return data1;
                                })
                        )
                    });
                    Promise.all(p).then((d) => setDetails(prevDetails => [...prevDetails, ...d]));

                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    useEffect(() => {
        fetchItemData()
    }, [])

    return (
        <>
            <h1>Search Results</h1>
            <p><strong>{ count }</strong> record{ count > 1 ? "s" : count < 1 ? "s" : null} matching <strong>{entity}</strong></p>

            {items.length > 0 && (
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchItemData}
                    hasMore={count>(page-1)*12} // Replace with a condition based on your data source
                    loader={<p className="is_footer">Loading...</p>}
                    endMessage={<p className="is_footer">No more records to load</p>}
                >
                    <div className="flex-container">

                        {items.map(item => (
                            <div className="flex-item" key={item.uid}>
                                <Result
                                    item={item}
                                    details={details}
                                />
                            </div>
                        ))}

                        {/* placeholder boxes */}
                        <div className="flex-item-empty"></div>
                        <div className="flex-item-empty"></div>
                        <div className="flex-item-empty"></div>

                    </div>
                </InfiniteScroll>
            )}
        </>
    )
};

export default AdvancedResults;
