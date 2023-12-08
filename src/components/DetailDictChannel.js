import React from 'react';
import {Link} from "react-router-dom";
import { YouTube, Twitter, Facebook, Language, 
        Article, Instagram, Telegram, LinkedIn, 
        Pinterest, Reddit, Mic } from '@mui/icons-material';

const DetailListDictChannel = ({ d, s, h=null }) => {

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    const getIcon = (i) => {
        switch (i) {
            case "print":
                return <Article />
            case "website":
                return <Language />
            case "facebook":
                return <Facebook />
            case "instagram":
                return <Instagram />
            case "twitter":
                return <Twitter />
            case "telegram":
                return <Telegram />
            case "youtube":
                return <YouTube />
            case "linkedin":
                return <LinkedIn />
            case "pinterest":
                return <Pinterest />
            case "reddit":
                return <Reddit />
            case "transcript":
                return <Mic />
            default:
                return null
        }
    }
    //console.log(d)

    return (
        <>
            {d &&
                <div className="divTableRow">
                    <div className="divTableHead">
                        {h ? <h3>{s}</h3> : s }
                    </div>
                    <div className="divTableCell">
                        <Link key={d.uid} to={getLink(d._unique_name)}><span
                            className="material-symbols-outlined m3_icon">{getIcon(d._unique_name)}</span> {d.name}</Link>
                        <br/>
                        {d === undefined &&
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
export default DetailListDictChannel;
