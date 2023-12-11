import React from 'react';
import {Link} from "react-router-dom";
import LinkNewsSource from './LinkNewsSource';

const DetailListDict = ({ d, s, h=null }) => {

    let sorted = []

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    function removeDuplicates(arr) {
        let unique = [];
        let add = true
        arr.forEach(element => {
            add = true
            unique.forEach(u => {
                if (u[0] === (element[0])) {
                    add = false
                }
            })
            if (add){
                unique.push(element);
            }
        });
        return unique;
    }

    if (s === 'Sources'){
        let countries = []
        for (var x of d){
            if (x.country) {
                countries.push([x.country.name, x.country.uid])
            } else {
                if (x.countries){
                    countries.push([x.countries[0].name, x.countries[0].uid])
                }
            }
        }
        let uniq = removeDuplicates(countries);
        uniq.sort()
        for (var y of uniq){
            let si = []
            for (var z of d) {
                if (z.country) {
                    if (z.country.name === y[0]) {
                        si.push(z)
                    }
                } else {
                    if (z.countries) {
                        if (z.countries[0].name === y[0]) {
                            si.push(z)
                        }
                    }
                }
            }
            let dict = {}
            let ary = [y, si]
            sorted.push(ary)
        }
    }

    const retJSON = (a) => {
        return JSON.stringify(a, null, 4)
    }

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">
                        {h ? <h3>{s}</h3> : s + ':' }
                    </div>
                    <div className="divTableCell">
                        {s === "Sources" &&
                            <>
                                {sorted.map(x => (
                                    <div key={x[0][1]}>
                                        <h5>{x[0][0]}</h5>
                                        <p>{x[1].map(y => (
                                            <span className="link_list" key={y.uid}><LinkNewsSource item={y} /></span>
                                        ))}</p>
                                    </div>
                                ))}

                            </>
                        }
                        {s !== "Sources" &&
                            <>
                                {d.map(x => (
                                    <span className="link_list" key={x.uid}><Link to={getLink(x._unique_name)}>{x.name}</Link> </span>
                                ))}
                                {d === undefined &&
                                    <>
                                        None
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
};
export default DetailListDict;