import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

const ExternalNewsSourceLink = ({ item }) => {

    let url = ''
    switch (item.channel._unique_name){
        case "facebook":
            url = 'https://facebook.com/' + item.identifier
            break
        case "twitter":
            url = 'https://twitter.com/' + item.identifier
            break
        case "instagram":
            url = 'https://instagram.com/' + item.identifier
            break
        case "telegram":
            url = "https://t.me/" + item.name
            break
        case "website":
            url = item.identifier
            break
        case "vkontakte":
            url = "https://vk.com/anonymousnews_org" + item.identifier
            break
        case "youtube":
            url = "https://www.youtube.com/@" + item.identifier
                break
        default:
            break
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
export default ExternalNewsSourceLink;