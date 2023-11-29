import React from 'react';
import {Link} from "react-router-dom";

const DetailListDictReverse = ({ d, s, t = null, h=null }) => {

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    const retDateYear = (d) => {
        let dt = new Date(d)
        dt = dt.getFullYear()
        return dt
    }

    const formatFulltext = (b) => {
        if (b === true){
            return ' (Full texts)'
        } else {
            return ''
        }
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
                                {t === 'datasets' &&
                                    <>
                                        {x.temporal_coverage_start &&
                                                " from " + retDateYear(x.temporal_coverage_start)
                                        }
                                        {x.temporal_coverage_end &&
                                            " to " + retDateYear(x.temporal_coverage_end)
                                        }
                                        {x.fulltext_available &&
                                            formatFulltext(x.fulltext_available )
                                        }
                                    </>
                                }
                                {t !== 'datasets' &&
                                    <>
                                        {x.date_published &&
                                            " (" + retDateYear(x.date_published) + ")"
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