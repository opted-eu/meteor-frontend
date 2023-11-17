import React, { useEffect, useState } from "react"
import {getImage} from '../../assets/js/Utils.js'

const Recent = () => {
    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])

    const fetchItemData = () => {
        setDetails([]);
        fetch("https://meteor.balluff.dev/api/view/recent?limit=10")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItems(data);
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
                Promise.all(p).then((d) => setDetails(d));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
    }, [])

    const getDesc = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            if (res.description){
                var s = res.description;
                var length = 100;
                var trimmedString = s.length > length ?
                    s.substring(0, length - 3) + "... (more)" : s;
                return trimmedString;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const getDgraph = (d) => {
        if(d) {
            return d["dgraph.type"];
        } else {
            return null;
        }
    }

    /*
    Added following code to show scroll right button
        as needs to re-run once options have been added
    */

    return (
        <>
            {items.length > 0 && (
                <>
                    {items.map(item => (
                        <div className="item" key={item._unique_name}>
                            <img className="item-image"
                                 src={getImage(getDgraph(item))}/>
                            <div className="item-title"><span className="item-header">{item.name}</span><span className="item-type"><br />{getDgraph(item)}</span></div>
                            <div className="item-description opacity-none">{getDesc(item._unique_name)}</div>
                            <span className="item-load-icon button opacity-none"><i className="fa fa-play"></i></span>

                        </div>
                    ))}

                </>
            )}
        </>
    );
}

export default Recent;