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

    const formatFulltext = (b, i = false) => {
        if (b === true){
            if (i){
                return 'full_text'
            }
            return 'Full texts'
        } else {
            return ''
        }
    }

    const formatAuthors = (entry) => {
        if (entry.hasOwnProperty("authors") && Array.isArray(entry.authors)) {
            if (entry.authors.length <= 2) {
                return entry.authors.map(e => e.name).join(" & ")
            } else {
                return entry.authors[0].name + 'et al.'
            }
        } else if (entry.hasOwnProperty("_authors_fallback") && Array.isArray(entry._authors_fallback)) {
            if (entry._authors_fallback.length <= 2) {
                return entry._authors_fallback.join(" & ")
            } else {
                return entry._authors_fallback[0] + 'et al.'
            }
        } else {
            return ""
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
                                <span className="reduced">
                                    {formatAuthors(x)}
                                    {t === 'datasets' &&
                                        <>
                                            {x.temporal_coverage_start &&
                                                " from " + retDateYear(x.temporal_coverage_start)
                                            }
                                            {x.temporal_coverage_end &&
                                                " to " + retDateYear(x.temporal_coverage_end)
                                            }
                                            {x.fulltext_available &&
                                                <nobr><span className={formatFulltext(x.fulltext_available, true)}>
                                                    {formatFulltext(x.fulltext_available)}
                                                </span></nobr>
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
                                </span>
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