import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/css/detail.css'
import DisplayCountry from "../components/DisplayCountry";
import DisplayCountries from "../components/DisplayCountries";
import {Link} from "react-router-dom";
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
import DetailListDictReverse from "../components/DetailListDictReverse";

const Detail = () => {

    let { uid } = useParams();
    const [item, setItem] = useState([])
    const [reverse, setReverse] = useState([])
    const navigate = useNavigate();

    const fetchItemData = () => {
        let forward_url = process.env.REACT_APP_API + "view/entry/" + uid
        console.log(forward_url)
        fetch(forward_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItem(data);
                let rev_url = process.env.REACT_APP_API + "view/reverse/" + data.uid
                console.log(rev_url)
                if(getDgraph(data) !== 'Collection') {
                    fetch(rev_url)
                        .then(response1 => {
                            return response1.json()
                        })
                        .then(data1 => {
                            setReverse(data1)
                        })
                }
                window.__dimensions_embed.addBadges();
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
    const doi = item.doi
    const w = 200

    // access to different sections
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
    const collections = ["Collection"]

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
                            t="un"
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
                {doi && type &&
                    <div className="item-img">
                        <span className="__dimensions_badge_embed__ badge" data-doi={doi}
                              data-hide-zero-citations="true" data-style="medium_circle"></span>
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
                    {type === 'Collection' &&
                        <DetailField
                            d={item._added_by.display_name}
                            s="Created By"
                            t="user"
                            u={item._added_by.uid}
                        />
                    }
                </div>
            </div>

            {/* Collections */}
            {collections.includes(type) &&
                <div className="divTable">
                    <DetailHeader
                        t="Collection includes"
                        m="Which entries are included in the collection."
                    />
                    <DetailListDict
                        d={item.entries_included}
                        s="Entries"
                    />
                    <DetailListDict
                        d={item.languages}
                        s="Language(s) in collection"
                    />
                    {item.countries &&
                        <DisplayCountries
                            j={item.countries}
                            t={type}
                        />
                    }
                </div>
            }

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
                        d="special_interest"
                        s="Special Interest Publication"
                        t="boolean"
                    />
                    <DetailList
                        d={item.publication_cycle_weekday}
                        s="Publication Cycle"
                        n={true}
                    />
                    <DetailField
                        d={item.publication_weekdays}
                        s="Publication Weekdays"
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
                <>
                    {reverse.publishes__organizations &&
                        <div className="divTable">
                            <DetailListDictReverse
                                d={reverse.publishes__organizations}
                                s="Published by"
                                h={true}

                            />
                        </div>
                    }
                </>
            }

            {/* Publishes */}
            {publishes.includes(type) &&
                <>
                    {item.publishes &&
                        <div className="divTable">
                            <DetailListDictChannel
                                d={item.publishes}
                                s="Publishes"
                                h={true}
                            />
                        </div>
                    }
                </>
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
                        d="language_independent"
                        s="Tool is independent of languages"
                        t="boolean"
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
                    <DetailListDictReverse
                        d={reverse.owns__organizations}
                        s="Owned by"
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
                    <DetailListDictReverse
                        d={reverse.sources_included__archives}
                        s=""
                        t="datasets"
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
                    {item.documentation && (item.documentation).map((d, i) => (
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
                    <DetailListDictReverse
                        d={reverse.sources_included__scientificpublications}
                        s=""
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
                    <DetailListDictReverse
                        d={reverse.sources_included__datasets}
                        s=""
                        t="datasets"

                    />
                </div>
            }

            {/* Publications */}
            {publications.includes(type) &&
                <div className="divTable">
                    <DetailListDictReverse
                        d={reverse.authors__scientificpublications}
                        s="Publications"
                        h={true}
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

            {/* Reverse Data */}
            <div className="divTable">
                <DetailHeader
                    t="Reverse Data"
                    m={JSON.stringify(reverse, null, 4)}
                    p="true"
                />
            </div>

        </>
    )
};

export default Detail;
