import React from 'react';
import {Link} from "react-router-dom";

const DetailListDictReverse = ({ d, s, h=null }) => {

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">
                        {h ? <h3>{s}</h3> : s }
                    </div>
                    <div className="divTableCell">
                        {d.map(x => (
                            <p key={x.uid}>
                                <Link to={getLink(x._unique_name)}>{x.name}</Link>&nbsp;
                                {x._authors_fallback &&
                                    x._authors_fallback
                                }
                                {x.authors &&
                                    <>
                                        {x.authors[0].name ?
                                            x.authors[0].name + " et al." :
                                                x.authors[0] + " et al."
                                        }
                                    </>
                                }
                            </p>
                        ))}
                        {d === false &&
                            <>
                                None
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
};
export default DetailListDictReverse;