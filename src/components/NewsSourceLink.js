import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

const NewsSourceLink = ({ item }) => {

    let url = ''
    switch (item.channel._unique_name){
        case "facebook":
            url = 'https://facebook.com/'
            break
        case "twitter":
            url = 'https://twitter.com/'
            break
        case "instagram":
            url = 'https://instagram.com/'
            break
        default:
            break
    }
    if (url){
        url += item.name
    }

    return (
        <>
            {url &&
                <div className="divTableRow">
                    <div className="divTableHead">Link to News Source:</div>
                        <div className="divTableCell">
                            <a href={url} target="_blank">{url} <LaunchIcon /></a>
                        </div>
                </div>
            }
        </>
    )
};
export default NewsSourceLink;