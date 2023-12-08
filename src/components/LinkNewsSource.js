import React from 'react';
import {Link} from "react-router-dom";
import { YouTube, Twitter, Facebook, Language, 
         Article, Instagram, Telegram, LinkedIn, 
         Pinterest, Reddit, Mic } from '@mui/icons-material';

const LinkNewsSource = ({ item }) => {

    const iconMap = {print: <Article />,
                      youtube: <YouTube />,
                      twitter: <Twitter />,
                      facebook: <Facebook />,
                      website: <Language />,
                      instagram: <Instagram />,
                      telegram: <Telegram />,
                      linkedin : <LinkedIn />,
                      pinterest: <Pinterest />,
                      reddit: <Reddit />,
                      transcript: <Mic />}

    const getLink = (unique_name) => {
        return '/detail/' + unique_name
    }

    return (
        <>
            <Link to={getLink(item._unique_name)}>
                <span className="material-symbols-outlined m3_icon">{iconMap[item.channel?._unique_name]}</span> {item.name} ({item.channel?.name})
            </Link>
        </>
    )
};
export default LinkNewsSource;