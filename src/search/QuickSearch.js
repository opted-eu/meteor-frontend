import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/css/search.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import Result from "./Result";

const QuickSearch = () => {

    const { query } = useParams();
    const [count, setCount] = useState([])
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    // extra state vars for infinite scroll
    const [page, setPage] = useState(1);

    const fetchItemData = async () => {
        //let quicksearch = process.env.REACT_APP_API + "quicksearch?term=" + query + "&limit=50"
        let fullsearch = process.env.REACT_APP_API + "query?_terms=" + query + "&_max_results=12&_page=" + page
        console.log(fullsearch)

        //fetch count
        fetch(process.env.REACT_APP_API + "query/count?_terms=" + query)
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
                console.log(page*12)
                const p = [];
                data.forEach(b => {
                    p.push(
                        fetch(process.env.REACT_APP_API + "view/entry/" + b._unique_name)
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

    useEffect(() => {
        fetchItemData()
    }, [])

    return (
        <>
            <h1>Quick Search Results</h1>
            <p>Matching '<em>{query}</em>':</p>

            {items.length > 0 && (
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchItemData}
                    hasMore={count>(page-1)*12} // Replace with a condition based on your data source
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more data to load.</p>}
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

export default QuickSearch;
