import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/css/detail.css'
import DisplayCountry from "../components/DisplayCountry";
import DisplayCountries from "../components/DisplayCountries";
import {Link} from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LaunchIcon from '@mui/icons-material/Launch';
import NewsSourceLink from "../components/NewsSourceLink";
import DetailListDict from "../components/DetailListDict";
import DetailField from "../components/DetailField";
import DetailExtLink from "../components/DetailExtLink";
import DetailListExtLink from "../components/DetailListExtLink";
import DetailList from "../components/DetailList";
import DetailHeader from "../components/DetailHeader";
import DetailListDictChannel from "../components/DetailListDictChannel";
import DetailDictChannel from "../components/DetailDictChannel";
import '@material/web/button/text-button.js';
import WikiImg from "../search/WikiImg";
import DetailAudience from "../components/DetailAudience";

const Detail = () => {

    let { uid } = useParams();
    const [item, setItem] = useState([])
    const navigate = useNavigate();

    const fetchItemData = () => {
        fetch("https://meteor.balluff.dev/api/view/entry/" + uid)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItem(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
    }, [uid])

    const getDgraph = (d) => {
        let dg = d["dgraph.type"]
        if(dg) {
            let ret = ''
            for (var t of dg){
                if (t !== 'Entry') {
                    ret += t
                }
            }
            return ret;
        }
        return null;
    }

    const retDate = (d) => {
        let dt = new Date(d)
        dt = (dt.getDate()).toString().padStart(2, '0') + "-" + (dt.getMonth()+1).toString().padStart(2, '0') + "-" + dt.getFullYear()
        return dt
    }

    const retDateYear = (d) => {
        let dt = new Date(d)
        dt = dt.getFullYear()
        return dt
    }

    const retList = (an) => {
        if (an){
            return an.join(", ")
        }
        return null
    }

    const getLink = (uid) => {
        return '/detail/' + uid
    }

    const getSourcesLink = (uid) => {
        return '/search?~sources_included=' + uid
    }

    const getNumSources = (s) => {
        var count = 0
        if (s) {
            for (var si of s) {
                count++;
            }
        }
        return count
    }

    const getAddressLink = (a) => {
        return "https://www.openstreetmap.org/search?query=" + a
    }

    const formatBoolean = (b) => {
        if (b === true){
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const formatText = (t) => {
        if (t){
            var splitStr = t.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        return null;
    }

    const getExtLink = (u, d) => {
        return u + d;
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

    const getColorStyle = (c) => {
        if (c){
            return "linear-gradient(to right, #" + c + " 50px, rgba(0,0,0,0) 50px)"
        }
        return null
    }

    const getColorPadding = (c) => {
        //console.log(en)
        if (c){
            return 60
        }
        return 10
    }

    // vars
    const type = getDgraph(item)
    const wd = item.wikidata_id
    const w = 200

    // access to differnt sections
    const routines = ["NewsSource"]
    const audience = ["NewsSource"]
    const published_by = ["NewsSource"]
    const economic = ["NewsSource", "Organization"]
    const channel = ["NewsSource"]
    const data_access = ["NewsSource", "PoliticalParty"]
    const research = ["NewsSource", "PoliticalParty", "Dataset", "Tool", "ScientificPublication"]
    const datasets = ["NewsSource", "PoliticalParty"]
    const publishes = ["PoliticalParty", "Organization"]
    const about = ["Dataset", "Archive", "Tool"]
    const sources_included = ["Dataset", "Archive", "ScientificPublication"]
    const location = ["PoliticalParty", "Organization"]
    const owns = ["Organization"]
    const owned_by = ["Organization"]
    const related_sources = ["NewsSource"]
    const tools = ["ScientificPublication"]
    const publications = ["Author"]
    const documentation = ["Tool"]

    // field titles
    const conditions_of_access = {Tool:"User Access", Dataset:"Conditions of Access", Archive:"Conditions of Access"}
    const concept_variables = {Tool:"Concepts measured", Dataset:"Included Conceptual Variables"}
    const languages = {Tool:"Supported Languages", Dataset:"Language(s) in dataset"}
    const research_header = {Tool:"Following publications used this tool.", Dataset:"Following publications investigated this source.", PoliticalParty:"Following publications investigated this political party.", NewsSource:"Following publications investigated this source.", ScientificPublication:""}
    const sources_included_header = {ScientificPublication:"Shows which sources where studied in this publication.", Dataset:"Shows how many of the sources listed in this inventory are included in the dataset.", Archive:"Shows how many of the sources listed in this inventory are available in the archive."}
    const party_affiliated = {NewsSource:"Party Affiliated", Organization:"Affiliated with a political party"}
    const data_access_header = {NewsSource:"Following data bases include full text data.", PoliticalParty:"Following data archives include text data"}
    const datasets_header = {NewsSource:"Following datasets include the news source.", PoliticalParty:"Following datasets include the political party."}

    return (
        <>
            {/* Title Info */}
            <p style={{float: "right"}}><md-text-button type="button" onClick={() => navigate('/search')}>New Search</md-text-button></p>

            <h1>{item.name}</h1>
            <div className="divHeader" style={{backgroundImage: getColorStyle(item.color_hex), paddingLeft: getColorPadding(item.color_hex)}}>
                <div className="divTableHeader">
                    <div className="divTableBody">
                        <DetailField
                            d={type}
                            s="Type"
                            t="text"
                            w={item.color_hex ? 'true' : null}
                        />
                        <DetailField
                            d={item._date_created}
                            s="Created"
                            t="date"
                            w={item.color_hex ? 'true' : null}
                        />
                        <DetailField
                            d={item.uid}
                            s="UID"
                            t="text"
                            w={item.color_hex ? 'true' : null}
                        />
                        <DetailField
                            d={item._unique_name}
                            s="OPTED ID"
                            t="text"
                            w={item.color_hex ? 'true' : null}
                        />
                    </div>
                </div>
                {wd && type &&
                    <div className="item-img">
                        <WikiImg
                            props={{type, wd, w}}
                        />
                    </div>
                }
            </div>

            {/* General */}
            <div className="divTable">
                <div className="divTableBody">
                    <DetailHeader
                        t="General Information"
                        m=""
                    />
                    <DetailExtLink
                        d={item.orcid}
                        s="ORCID"
                        u="https://orcid.org/"
                    />
                    <DetailListExtLink
                        d={item.openalex}
                        s="OpenAlex"
                        u="https://explore.openalex.org/authors/"
                    />
                    <DetailList
                        d={item.affiliations}
                        s="Affiliations"
                    />
                    <DetailField
                        d={item.title}
                        s="Full Title"
                        t="titletext"
                    />
                    <DetailList
                        d={item._authors_fallback}
                        s="Author(s)"
                    />
                    <DetailListDict
                        d={item.authors}
                        s="Author(s)"
                    />
                    <DetailField
                        d={item.date_published}
                        s="Published"
                        t="year"
                    />
                    {item.channel &&
                        <>
                            <DetailDictChannel
                                d={item.channel}
                                s="Channel"
                            />
                            <NewsSourceLink
                                item={item}
                            />
                        </>
                    }
                    <DetailField
                        d={item["name@en"]}
                        s="English Name"
                        t="text"
                    />
                    <DetailList
                        d={item.alternate_names}
                        s="Also known as"
                    />
                    <DetailField
                        d={item.color_hex}
                        s="Color"
                        t="color"
                    />
                    <DetailExtLink
                        d={item.partyfacts_id}
                        s="Partyfacts ID"
                        u="https://partyfacts.herokuapp.com/data/partycodes/"
                    />
                    <DetailField
                        d={item.date_founded}
                        s="Founded"
                        t="year"
                    />
                    <DetailField
                        d={item.description}
                        s="Description"
                        t="safe"
                    />
                    <DetailExtLink
                        d={item.doi}
                        s="DOI"
                        u="https://doi.org/"
                    />
                    <DetailField
                        d={item.venue}
                        s="Journal"
                        t="text"
                    />
                    <DetailExtLink
                        d={item.url}
                        s="URL"
                        u=""
                    />
                    <DetailExtLink
                        d={item.arXiv}
                        s="arXiv"
                        u="https://arXiv/abs/"
                    />
                    <DetailExtLink
                        d={item.github}
                        s="GitHub"
                        u="https://github.com/"
                    />
                    <DetailExtLink
                        d={item.wikidata_id}
                        s="WikiData"
                        u="https://www.wikidata.org/wiki/"
                    />
                </div>
            </div>

            {/* Routines */}
            {routines.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Routines"
                        m=""
                    />
                    <DetailList
                        d={item.publication_kind}
                        s="Publication Kind"
                    />
                    <DetailField
                        d=""
                        s="Special Interest Publication"
                        t="text"
                    />
                    <DetailField
                        d={item.publication_cycle}
                        s="Publication Cycle"
                        t="text"
                    />
                    <DetailField
                        d={item.geographic_scope}
                        s="Geographic Scope"
                        t="text"
                    />
                    {item.countries &&
                        <DisplayCountries
                            j={item.countries}
                            t={type}
                        />
                    }
                    <DetailListDict
                        d={item.languages}
                        s="Languages"
                    />
                    <DetailField
                        d={item.party_affiliated}
                        s="News Source close to a political party"
                        t="text"
                    />
                </div>
            }

            {/* Audience */}
            {audience.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Audience"
                        m=""
                    />
                    {/*
                    {item["audience_size_recent|timestamp"] &&
                        <>
                            <div className="divTableRow">
                                <div className="divTableHead">Date:</div>
                                <div className="divTableCell">{retDate(item["audience_size_recent|timestamp"])}</div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableHead">Data:</div>
                                <div className="divTableCell"><Link to={getLink(item["audience_size|data_from"]["0"])}>{item["audience_size|data_from"]["0"]}</Link></div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableHead">{formatText(item["audience_size|unit"]["0"])}:</div>
                                <div className="divTableCell">{item["audience_size|count"]["0"]}</div>
                            </div>
                        </>
                    }
                    */}
                    <DetailAudience
                        item={item}
                    />
                </div>
            }

            {/* Published By */}
            {published_by.includes(type) &&
                <div className="divTable">
                    <DetailListDictChannel
                        d={item.published_by}
                        s="Published by"
                        h={true}
                    />
                </div>
            }

            {/* Publishes */}
            {publishes.includes(type) &&
                <div className="divTable">
                    <DetailListDictChannel
                        d={item.publishes}
                        s="Publishes"
                        h={true}
                    />
                </div>
            }

            {/* About */}
            {about.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="About"
                        m=""
                    />
                    <DetailListDict
                        d={item.programming_languages}
                        s="Programming Languages"
                    />
                    <DetailField
                        d={item.conditions_of_access}
                        s={conditions_of_access[type]}
                        t="text"
                    />
                    <DetailListDict
                        d={item.used_for}
                        s="Used For"
                    />
                    <DetailField
                        d={item.graphical_user_interface}
                        s="Graphical User Interface"
                        t="boolean"
                    />
                    <DetailField
                        d=""
                        s="Tool is independent of languages"
                        t="text"
                    />
                    <DetailField
                        d={item.fulltext_available}
                        s="Fulltexts Available"
                        t="boolean"
                    />
                    <DetailListDict
                        d={item.text_types}
                        s="Text types"
                    />
                    <DetailListDict
                        d={item.languages}
                        s={languages[type]}
                    />
                    <DetailField
                        d={item.author_validated}
                        s="Author(s) reported validation"
                        t="text"
                    />
                    <DetailField
                        d={item.license}
                        s="License"
                        t="text"
                    />
                    {item.countries &&
                        <DisplayCountries
                            j={item.countries}
                            t={type}
                        />
                    }
                    <DetailListDict
                        d={item.meta_file_formatsvariables}
                        s="Dataset File"
                    />
                    <DetailListDict
                        d={item.meta_variables}
                        s="Included Meta Variables"
                    />
                    <DetailListDict
                        d={item.concept_variables}
                        s={concept_variables[type]}
                    />
                </div>
            }

            {/* Tools  */}
            {tools.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Tools"
                        m="Tools used in the publication"
                    />
                </div>
            }

            {/* Sources Included */}
            {sources_included.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Sources Include"
                        m={sources_included_header[type]}
                    />
                    <div className="divTableRow">
                        <div className="divTableHead">Total:</div>
                        <div className="divTableCell"><Link to={getSourcesLink(item._unique_name)}>{getNumSources(item.sources_included)}</Link></div>
                    </div>
                    <DetailListDict
                        d={item.sources_included}
                        s="Sources"
                    />
                    <DetailListDict
                        d={item.text_units}
                        s="Text Units"
                    />
                </div>
            }

            {/* Location */}
            {location.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Location"
                        m=""
                    />
                    {item.country &&
                        <DisplayCountry
                            j={item.country}
                        />
                    }
                    <DetailExtLink
                        d={item.address}
                        s="Primary Address"
                        u="https://www.openstreetmap.org/search?query="
                    />
                </div>
            }

            {/* Owns */}
            {owns.includes(type) &&
                <div className="divTable">
                    <DetailListDict
                        d={item.owns}
                        s="Owns"
                        h="true"
                    />
                </div>
            }

            {/* Owned By */}
            {owned_by.includes(type) &&
                <div className="divTable">
                    <DetailListDict
                        d={item.owned_by}
                        s="Owned By"
                        h="true"
                    />
                </div>
            }

            {/* Economic */}
            {economic.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Economic"
                        m=""
                    />
                    <DetailField
                        d={item.payment_model}
                        s="Payment Model"
                        t="text"
                    />
                    <DetailField
                        d={item.contains_ads}
                        s="Contains Ads"
                        t="text"
                    />
                    <DetailField
                        d={item.ownership_kind}
                        s="Types of Organisation"
                        t="text"
                    />
                    <DetailField
                        d={item.employees}
                        s="Employees"
                        t="text"
                    />
                    {item.party_affiliated && type !== "NewsSource" &&
                        <DetailField
                            d={item.party_affiliated}
                            s={party_affiliated[type]}
                            t="upper"
                        />
                    }
                </div>
            }

            {/* Channel */}
            {channel.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Channel Features"
                        m=""
                    />
                </div>
            }

            {/* Data Access */}
            {data_access.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Data Access"
                        m={data_access_header[type]}
                    />
                </div>
            }
            {/* Documentation  */}
            {documentation.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Documentation"
                        m="Documentation that help using the tool."
                    />
                    {(item.documentation).map((d, i) => (
                        <DetailExtLink
                            d={d}
                            s={item["documentation|kind"][i]}
                            u=""
                        />
                    ))}
                </div>
            }


            {/* Research  */}
            {research.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Research"
                        m={research_header[type]}
                    />
                </div>
            }

            {/* Datasets */}
            {datasets.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Datasets"
                        m={datasets_header[type]}
                    />
                </div>
            }

            {/* Publications */}
            {publications.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Publications"
                        m=""
                    />
                </div>
            }

            {/* Related Source */}
            {related_sources.includes(type) &&
                <div className="divTable">
                    <DetailListDictChannel
                        d={item.related_news_sources}
                        s="Related Source by Brand"
                        h={true}
                    />
                </div>
            }

            {/* Raw Data */}
            <div className="divTable">
                <DetailHeader
                    t="Raw Data"
                    m={JSON.stringify(item, null, 4)}
                    p="true"
                />
            </div>

        </>
    )
};

export default Detail;
