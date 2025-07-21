import React, {useEffect} from 'react';
import LaunchIcon from "@mui/icons-material/Launch";

const DetailExtLink = ({ d, s, u }) => {


    // run after each re-render
    useEffect(() => {
        //window.__dimensions_embed.addBadges();
        try {
            window['_altmetric_embed_init']()
        } catch (e){
            console.log('Caught Error with Altmetric: ' + e)
        }
    }, [d])

    // check orcid entry for orcid URL
    const checkEntry = (u,d) => {
        if (d.includes(u)){
            return d
        } else {
            return u+d
        }
    }

    return (
        <>
            {d &&
                <>
                    <div className="divTableRow">
                        <div className="divTableHead">{s}:</div>
                        <div className="divTableCell"><a href={checkEntry(u, d)} target="_blank">{d}</a> <a href={checkEntry(u, d)} target="_blank"><LaunchIcon /></a></div>
                    </div>
                    {s === "DOI" &&
                        <>
                            {d &&
                                <div className="divTableRow">
                                    <div className="divTableHead">&nbsp;</div>
                                    <div className="divTableCell">

                                        <span data-badge-popover="right" data-badge-type="donut"
                                              data-doi={d} data-hide-no-mentions="true"
                                              className="altmetric-embed circle badge"></span>

                                    </div>
                                </div>
                            }
                        </>
                    }
                </>
            }
        </>
    )
};
export default DetailExtLink;