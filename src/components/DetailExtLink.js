import React, {useEffect} from 'react';
import LaunchIcon from "@mui/icons-material/Launch";

const DetailExtLink = ({ d, s, u }) => {


    // run after each re-render
    useEffect(() => {
        window.__dimensions_embed.addBadges();
        window._altmetric_embed_init();
    }, [d])

    return (
        <>
            {d &&
                <>
                    <div className="divTableRow">
                        <div className="divTableHead">{s}:</div>
                        <div className="divTableCell"><a href={u + d} target="_blank">{d}</a> <a href={u + d} target="_blank"><LaunchIcon /></a></div>
                    </div>
                    {s === "DOI" &&
                        <div className="divTableRow">
                            <div className="divTableHead">&nbsp;</div>
                            <div className="divTableCell">
                                <span className="__dimensions_badge_embed__ badge" data-doi={d}
                                      data-hide-zero-citations="true" data-style="small_circle"></span>
                                <span data-badge-popover="right" data-badge-type="donut"
                                     data-doi={d} data-hide-no-mentions="true"
                                     className="altmetric-embed circle badge"></span>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
};
export default DetailExtLink;