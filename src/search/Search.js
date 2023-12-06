import {useSearchParams, useNavigate, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/css/search.css'
import '../assets/css/m3.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import Result from "./Result";
import AdvancedSearchForm from "../forms/AdvancedSearchForm";

const Search = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [count, setCount] = useState('Loading')
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    // extra state vars for infinite scroll
    const [page, setPage] = useState(1);

    //get querystring
    var query = ''
    for (let param of searchParams) {
        query += '&' + param[0] + '=' + param[1]
    }
    //remove first '&'
    if (query) {
        query = query.slice(1)
    }

    const fetchItemData = async () => {

        let fullsearch = process.env.REACT_APP_API + "query?" + query + "&_max_results=12&_page=" + page
        let fullcount = process.env.REACT_APP_API + "query/count?" + query

        //console.log(fullsearch)

        //fetch count
        fetch(fullcount)
            .then(response => {
                return response.json()
            })
            .then(data0 => {
                setCount(data0);
                //console.log(count)
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
                //console.log(page*12)
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
        if (query) {
            fetchItemData()
        } else {
            setCount(0)
        }
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <h1>Search</h1>
            <div className="content">
                <div className="menu">
                    {<AdvancedSearchForm
                        searchParams={searchParams}
                    />}
                </div>
                <div className="information">
                    {count === 0 && query &&
                        <div className="infobox">
                            <h3>No result! Maybe you can help us?</h3>

                            <p>You cannot find what you're looking for? Maybe the resource you're searching is not yet in Meteor.</p>

                            <p>You could consider making a new entry and contributing to the community</p>

                            <ul>
                                <li><Link to="/login">Add a new entry in a few steps</Link></li>
                                <li>Consider giving the <Link to="/guides">provided guides</Link> a quick read.</li>
                            </ul>
                        </div>
                    }
                    {count > 0 && query &&
                        <p align="center"><strong>{ count }</strong> record{ count === 1 ? "" : "s"}</p>
                    }
                    {count === 0 && query === '' &&
                        <p align="center"><strong>Choose filter criteria...</strong></p>
                    }

                    {items.length > 0 && (
                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchItemData}
                            hasMore={count>(page-1)*12} // Replace with a condition based on your data source
                            loader={<p className="is_footer">Loading more records...</p>}
                            endMessage={<p className="is_footer">No more records to load</p>}
                        >
                            <div className="flex-container">

                                {items.map(item => (
                                    <div key={item.uid}>
                                        <Result
                                            item={item}
                                            details={details}
                                        />
                                    </div>
                                ))}

                            </div>
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    )
};

export default Search;
