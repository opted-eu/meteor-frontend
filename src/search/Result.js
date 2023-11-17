import {Link} from "react-router-dom";
import React from "react";
import WikiImg from "./WikiImg";

const Result = ({ item, details }) => {

    const getDesc = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            if (res.description){
                var s = res.description;
                var length = 100;
                var trimmedString = s.length > length ?
                    s.substring(0, length - 3) + "... (more)" : s;
                return trimmedString;
            }
        }
        return null;
    }

    const getDgraph = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            for (let i = 0; i < res["dgraph.type"].length; i++) {
                if (res["dgraph.type"][i] !== 'Entry') {
                    return res["dgraph.type"][i];
                }
            }
        }
        return null;
    }

    const getCountry = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            let c = res["country"];
            if (c) {
                return c.name;
            }
        }
        return null;
    }

    const showItemName = (name) => {
        var len = name.length;
        if(len > 50) {
            return name.substring(0,50)
        } else {
            return name
        }
    }

    const getlink = (uid) => {
        return '/detail/' + uid
    }

    const getWikidata = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            if(res.wikidata_id){
                //console.log('wikiimg_id1='+ res["wikidata_id"])
                return res["wikidata_id"]
            }
        }
        return null;
    }

    let type = getDgraph(item._unique_name)
    //let type = 'PoliticalParty'
    //console.log("type=" + type)
    let wd = getWikidata(item._unique_name)
    //console.log("wd1=" + wd)
    let w = 100

    const getColorStyle = (un) => {
        const res = details.find(c => c._unique_name === un);
        if(res) {
            let c = res.color_hex
            if (c){
                return "linear-gradient(to right, #" + c + " 50px, rgba(0,0,0,0) 50px)"
            }
        }
        return null
    }

    const getPadding = (en) => {
        //console.log(en)
        if (en === "PoliticalParty"){
            return 60
        }
        return 10
    }

    return (
        <div className="flex-item" key={item.uid} style={{backgroundImage: getColorStyle(item._unique_name), paddingLeft: getPadding(type)}}>
            <Link to={getlink(item._unique_name)}>
                {wd && type &&
                    <div className="item-img">
                        <WikiImg
                            props={{type, wd, w}}
                        />
                    </div>
                }
                <div className="item-title">{showItemName(item.name)}</div>
                <div className="item-type">{type}</div>
                <div className="item-type">{getCountry(item._unique_name)}</div>
                <div className="item-desc">{getDesc(item._unique_name)}</div>
            </Link>
        </div>
    )
}

export default Result;