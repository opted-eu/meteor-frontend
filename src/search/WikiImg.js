import React, {useEffect, useState} from "react";

const WikiImg = ({props}) => {

    const [wiki, setWiki] = useState(null);
    const uid = props.wd
    //console.log("wd2=" + props.wd)
    let wiki_prop = 154
    //console.log("entity2="+ props.entity)
    //console.log(entity)
    switch (props.type){
        case "TextType":
        case "FileFormat":
        case "Subnational":
        case "Multinational":
        case "Person":
        case "Country":
        case "Language":
            wiki_prop = 18
            break
        default:
            break
    }
    let w = props.w
    //console.log(wiki_prop)

    const fetchData = () => {
        // fetch types
        let f = "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&property=P" + wiki_prop + "&entity=" + uid + "&origin=*"
        //console.log('f=' + f)
        fetch(f)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setWiki(data);
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
    let imgURL = ''
    let imgURLPrefix = 'https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file&wpvalue='
    let imgURLSufffix = '&width=' + w
    let img = ''
    //console.log(wiki['claims']['P18'][0]['mainsnak']['datavalue']['value'])
    if (wiki){
        let claims = wiki["claims"]
        if (claims){
            let p = claims['P' + wiki_prop]
            if (p){
                let ary = p[0]
                if (ary){
                    let mainsnak = ary['mainsnak']
                    if (mainsnak){
                        let datavalue = mainsnak['datavalue']
                        if (datavalue){
                            img = datavalue['value']
                            img = img.replace(/ /g, "_")
                            imgURL = imgURLPrefix + img + imgURLSufffix
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            {imgURL &&
                <img src={imgURL}/>
            }
        </>
    )
}

export default WikiImg;