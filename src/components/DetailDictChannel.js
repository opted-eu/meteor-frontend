import React from 'react';
import {Link} from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const DetailListDictChannel = ({ d, s, h=null }) => {

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    const getIcon = (i) => {
        switch (i) {
            case "print":
                return <ArticleIcon />
            case "website":
                return <LanguageIcon />
            case "facebook":
                return <FacebookIcon />
            case "instagram":
                return <InstagramIcon />
            case "twitter":
                return <TwitterIcon />
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
