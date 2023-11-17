import React, {useEffect, useState} from "react";

const Version = () => {

    const [api, setApi] = useState(null);

    const fetchData = () => {
        // fetch types
        let f = "https://meteor.balluff.dev/api/openapi.json"
        //console.log(f)
        fetch(f)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setApi(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    //console.log(wikidata_json)
    //console.log(wiki)
    let version = null
    //console.log(wiki['claims']['P18'][0]['mainsnak']['datavalue']['value'])
    if (api){
        let info = api["info"]
        if (info){
            version = info["version"]
        }
    }

    //console.log(version)

    return (
        <>
            {version &&
                <span className="version">{version}</span>
            }
        </>
    )
}

export default Version;