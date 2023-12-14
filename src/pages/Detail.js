import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../assets/css/detail.css'
import DisplayCountry from "../components/DisplayCountry";
import DisplayCountries from "../components/DisplayCountries";
import DisplaySubnational from "../components/DisplaySubnational";
import { Link } from "react-router-dom";
import ExternalNewsSourceLink from "../components/ExternalNewsSourceLink";
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
import DetailFieldHead from "../components/DetailFieldHead";
import BugReportIcon from '@mui/icons-material/BugReport';
import DetailListPubCycle from "../components/DetailListPubCycle";
import OwnershipStructure from "../components/OwnershipStructure";
import DetailListSourcesIncluded from "../components/DetailListSourcesIncluded";
import SlickSimilar from "../components/SlickSimilar";

const Detail = () => {

    let { uid } = useParams();
    const [item, setItem] = useState([])
    const [reverse, setReverse] = useState([])
    const navigate = useNavigate();

    const types_similar = [
        'Dataset',
        'Archive',
        'ScientificPublication',
        'Tool',
        'Collection',
        'LearningMaterial'
    ]

    const fetchItemData = () => {
        let forward_url = process.env.REACT_APP_API + "view/entry/" + uid
        //console.log(forward_url)
        fetch(forward_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setItem(data);
                let rev_url = process.env.REACT_APP_API + "view/reverse/" + data.uid
                //console.log(rev_url)
                if (getDgraph(data) !== 'Collection') {
                    fetch(rev_url)
                        .then(response1 => {
                            return response1.json()
                        })
                        .then(data1 => {
                            setReverse(data1)
                            window.__dimensions_embed.addBadges();
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/404')
            });
    }

    useEffect(() => {
        fetchItemData()
        window.scrollTo(0, 0)
    }, [uid])

    const getDgraph = (d) => {
        let dg = d["dgraph.type"]
        if (dg) {
            let ret = ''
            for (var t of dg) {
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
        if (c) {
            return "linear-gradient(to right, #" + c + " 50px, rgba(0,0,0,0) 50px)"
        }
        return null
    }

    const getColorPadding = (c) => {
        //console.log(en)
        if (c) {
            return 60
        }
        return 10
    }

    // vars
    const type = getDgraph(item)
    let os = false
    let generalClass = "divTableBody"
    if (type === 'Organization' || type === 'NewsSource' || type == 'Person') {
        os = true
        generalClass = "divDetailHeader"
    }
    const wd = item.wikidata_id
    const doi = item.doi
    const w = 200

    // access to different sections
    const routines = ["NewsSource"]
    const audience = ["NewsSource"]
    const published_by = ["NewsSource"]
    const economic = ["NewsSource", "Organization"]
    //const channel = ["NewsSource"]
    const channel = []
    const archives = ["Author", "NewsSource", "PoliticalParty", "Government", "Parliament", "ConceptVariable", "FileFormat", "MetaVariable", "TextType", "UnitOfAnalysis", "Modality"]
    const research = ["NewsSource", "PoliticalParty", "Dataset", "Tool", "ScientificPublication", "Government", "Parliament", "ConceptVariable", "Person", "Operation", "TextType", "UnitOfAnalysis", "Modality"]
    const datasets = ["Author", "NewsSource", "PoliticalParty", "Government", "Parliament", "ConceptVariable", "Person", "FileFormat", "MetaVariable", "TextType", "UnitOfAnalysis", "Modality", "Subnational"]
    const publishes = ["PoliticalParty", "Organization", "Person"]
    const about = ["Archive", "Tool", "LearningMaterial", "Dataset", "ScientificPublication"]
    const sources_included = ["JournalisticBrand", "Dataset", "Archive", "ScientificPublication", "Channel"]
    const location = ["PoliticalParty", "Organization", "Person"]
    const owns = ["Organization", "PoliticalParty", "Person"]
    const owned_by = ["Organization", "PoliticalParty"]
    const related_sources = ["NewsSource"]
    const tools = ["Author", "Dataset", "ScientificPublication", "ConceptVariable", "ProgrammingLanguage", "Operation", "FileFormat", "Modality"]
    const publications = ["Author"]
    const documentation = ["Tool"]
    const collections = ["Collection"]
    const learning_materials = ["Author", "Dataset", "ConceptVariable", "ProgrammingLanguage", "Operation", "TextType", "Modality", "Tool"]
    const initial_source = ["Dataset"]
    const journalistic_brands = ["NewsSource", "Subnational"]
    const summary = ["Country", "Multinational", "Subnational", "Channel", "TextType", "Operation", "Language", "Modality", "ProgrammingLanguage"]
    const files = ["FileFormat"]

    // field titles
    const conditions_of_access = { Tool: "User Access", Dataset: "Conditions of Access", Archive: "Conditions of Access" }

    const concept_variables = { Tool: "Concepts measured", Dataset: "Included Conceptual Variables", LearningMaterial: "Included Conceptual Variables" }

    const languages = { Tool: "Supported Languages", Dataset: "Language(s) in dataset", LearningMaterial: "Language(s)" }

    const research_header = { Tool: "Following publications used this tool.", Dataset: "Following publications use this dataset.", PoliticalParty: "Following publications investigated this political party.", NewsSource: "Following publications investigated this source.", ScientificPublication: "Following publications are related to this publication.", Government: "Following publications are related to this government.", Parliament: "Following datasets are related to this parliament.", ConceptVariable: "Following publications are related to this concept.", Person: "Following publications relate to this person.", Operation: "Following publications are related to this operation.", TextType: "Following publications are related to this text type.", UnitOfAnalysis: "Following publications are related to this unit.", Modality: "Used in the following publications." }

    const sources_included_header = { ScientificPublication: "Shows which sources where studied in this publication.", 
                                      Dataset: "Shows how many of the sources listed in this inventory are included in the dataset.", 
                                      Archive: "Shows how many of the sources listed in this inventory are available in the archive.", 
                                      Channel: "Shows how many of the sources listed in this inventory are available in this channel.",
                                      JournalisticBrand: "News sources that are associated with this brand."}

    const party_affiliated = { NewsSource: "Affiliated with a political party", Organization: "Affiliated with a political party." }

    const archives_header = { NewsSource: "Following data bases include full text data.", 
                              PoliticalParty: "Following data archives include text data.", 
                              Parliament: "Following data archives include text data.", 
                              Government: "Following data archives include text data.", 
                              ConceptVariable: "Following data archives include text data.", 
                              FileFormat: "Following data archives use this fileformat.", 
                              MetaVariable: "Following data archives use this meta variable.", 
                              TextType: "Following data archives use this text type.", 
                              UnitOfAnalysis: "Following data archives use this unit.", 
                              Modality: "Used in the following archives.",
                              Author: "Archives maintained by this author." }

    const datasets_header = {
        NewsSource: "Following datasets include the news source.",
        PoliticalParty: "Following datasets include the political party.",
        Government: "Following datasets relate to this Government.",
        Parliament: "Following datasets relate to this Parliament.",
        ConceptVariable: "Following datasets include this concept.",
        Person: "Following datasets are relevant.",
        FileFormat: "Following datasets use this fileformat.",
        MetaVariable: "Following datasets use this meta variable.",
        TextType: "Following datasets use this text type.",
        UnitOfAnalysis: "Following datasets use this unit.",
        Modality: "Used in the following datasets.",
        Author: "Datasets by this author."
    }

    const learning_materials_header = {
        Dataset: "These Learning Materials use this dataset.",
        ConceptVariable: "These Learning Materials use this concept.",
        ProgrammingLanguage: "These Learning Materials use this programming language.",
        Operation: "These Learning Materials use this operation.",
        TextType: "These Learning Materials use this text type.",
        Modality: "Used in the following learning materials.",
        Author: "Learning materials by this author.",
        Tool: "Learning materials related to this tool." 
    }

    const initial_source_header = { Dataset: "The corpus or dataset that this dataset is derived from." }

    const tools_header = { Dataset: "This dataset was used to validate these tools.", 
                           ScientificPublication: "This publication was used with these tools.", 
                           ConceptVariable: "This concept was used with these tools.", 
                           ProgrammingLanguage: "This programming language is used in the following tools.", 
                           Operation: "This operation is used in the following tools.", 
                           FileFormat: "This fileformat is used in the following tools.", 
                           Modality: "Used in the following tools.",
                           Author: "Tools by this author." }

    const summary_header = { Country: "Shows how many of the news sources and organizations listed in this inventory are associated with this country.", 
                             Multinational: "Shows how many of the news sources listed in this inventory are associated with this multinational construct.", 
                             Subnational: "Shows how many of the news sources and organizations listed in this inventory are associated with this subunit.",
                             Channel: "Shows how many of the news sources and organizations listed in this inventory are associated with this channel." }

    const files_header = { FileFormat: "Following files use this fileformat." }

    const summary_predicate_mapping = {Channel: 'channel', 
                                       Country: 'country', 
                                       Multinational: 'country',
                                       Subnational: 'subnational_scope',
                                       Archive: '~sources_included',
                                       Language: 'languages', 
                                       ProgrammingLanguage: 'programming_languages', 
                                       TextType: 'text_types',
                                       Modality: 'modalities', 
                                       Operation: 'methodologies'}

    const correction_email = () => {
        let email_to = 'info@opted.eu'
        let email_subject = 'Correction for ' + item.name + ' (' + item.uid + ')'
        let email_body = 'Dear Meteor Team,%0D%0A' +
            '%0D%0A' +
            'I browsed your website and noticed that something is wrong in this entry: https://meteor.opted.eu/view/uid/' + item.uid + '.%0D%0A' +
            '%0D%0A' +
            '-- PLEASE WRITE YOUR CORRECTION HERE --%0D%0A' +
            '%0D%0A' +
            'Please also note that you are very welcome to create an account on Meteor and contribute your suggestions directly.'
        window.open("mailto:" + email_to + "?subject=" + email_subject + "&body=" + email_body)
    }

    return (
        <>
            {item.status == 403 &&
                <>
                    <p>{item.message}</p>
                </>
            }

            {item.status != 403 &&
                <>

                    {/* Title Info */}
                    <p style={{ float: "right" }}>
                        <md-text-button type="button" onClick={() => navigate('/search')}>New Search</md-text-button>
                    </p>

                    <h1>{item.name}</h1>

                    <div className="divHeader" style={{
                        backgroundImage: getColorStyle(item.color_hex),
                        paddingLeft: getColorPadding(item.color_hex)
                    }}>

                        <DetailFieldHead
                            item={item}
                        />
                        {wd && type &&
                            <div className="item-img">
                                <WikiImg
                                    props={{ type, wd, w }}
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
                        <div className={generalClass}>
                            <DetailHeader
                                t="General Information"
                                m={<md-text-button type="button" onClick={() => correction_email()}><BugReportIcon /> Something not right?</md-text-button>}
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
                            {!item.authors &&
                                <DetailList
                                    d={item._authors_fallback}
                                    s="Author(s)"
                                />
                            }
                            {item.authors &&
                                <DetailListDict
                                    d={item.authors}
                                    s="Author(s)"
                                />
                            }
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
                                    <ExternalNewsSourceLink
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
                            {item.partyfacts_id && 
                            <DetailExtLink
                                d={item.partyfacts_id + "/"}
                                s="Partyfacts ID"
                                u="https://partyfacts.herokuapp.com/data/partycodes/"
                            />
                            }
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
                                d={item.arxiv}
                                s="arXiv"
                                u="https://arXiv/abs/"
                            />
                            <DetailExtLink
                                d={item.cran}
                                s="CRAN"
                                u="https://cran.r-project.org/package="
                            />
                            <DetailExtLink
                                d={item.pypi}
                                s="PyPI"
                                u="https://pypi.org/project/"
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
                        {item.uid && os &&
                            <div className="item-img">
                                <h4>Ownership Structure</h4>
                                <OwnershipStructure
                                    uid={item.uid}
                                />
                            </div>
                        }

                    </div>

                    {item.uid && types_similar.includes(type) &&
                        <div className="divTableSlick">
                            <DetailHeader
                                t="Similar Records"
                                m=''
                            />
                            <SlickSimilar
                                uid={item.uid}
                            />
                        </div>
                    }

                    {/* Summary */}
                    {type === 'Subnational' && 
                    <div className="divTable">
                                <DisplayCountry
                                    j={item.country}
                                />
                                </div>
                            }
                    {summary.includes(type) &&
                        <div className="divTable">
                            <DetailHeader
                                t="Summary"
                                m={summary_header[type]}
                            />
                            <DetailField
                                d={item.num_archive}
                                s="Archives"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_dataset}
                                s="Datasets"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_government}
                                s="Governments"
                                t="query"
                                u={item.uid}
                            />
                            <DetailField
                                d={item.num_journalisticbrand}
                                s="Journalistic Brands"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_newssource}
                                s="News Sources"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_organization}
                                s="Organizations"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_parliament}
                                s="Parliaments"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_person}
                                s="People"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_politicalparty}
                                s="Political Parties"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_scientificpublication}
                                s="Scientific Publications"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_subnational}
                                s="Sub Nationals"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_learningmaterial}
                                s="Learning Materials"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                            <DetailField
                                d={item.num_tool}
                                s="Tools"
                                t="query"
                                u={item.uid}
                                query_predicate={summary_predicate_mapping[type]}
                            />
                        </div>
                    }

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
                    
                    {/* Journalistic Brands */}
                    {journalistic_brands.includes(type) &&
                        Object.keys(reverse)
                            .filter((item) => item.includes('journalisticbrands'))
                            .map(function(predicate) {
                                if (reverse[predicate].length > 0) {
                                    return <> <div className="divTable" key={predicate}>
                                                <DetailHeader t="Journalistic Brands" m="" /> 
                                                <DetailListDictReverse d={reverse[predicate]} s="" /> </div> </>
                                }
                            })
                    
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
                                d={item.special_interest}
                                s="Special Interest Publication"
                                t="boolean"
                            />
                            <DetailField
                                d={item.publication_cycle}
                                s="Publication Cycle"
                            />
                            <DetailListPubCycle
                                d={item.publication_cycle_weekday}
                                s="Publication Cycle (weekdays)"
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
                            {item.subnational_scope &&
                                <DisplaySubnational
                                    j={item.subnational_scope}
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
                                t="safe"
                            />
                        </div>
                    }

                    {/* Journalistic Brand */}
                    {type === 'JournalisticBrand' &&
                        <div className="divTable">
                            <DetailHeader t="About" m="" />
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
                            {item.subnational_scope &&
                                <DisplaySubnational
                                    j={item.subnational_scope}
                                    t={type}
                                />
                            }

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
                            {reverse.publishes__organizations?.length > 0 &&
                                <div className="divTable">
                                    <DetailListDictReverse
                                        d={reverse.publishes__organizations}
                                        s="Published by (Organizations)"
                                        h={true}

                                    />
                                </div>
                            }
                            {reverse.publishes__politicalpartys?.length > 0 &&
                                <div className="divTable">
                                    <DetailListDictReverse
                                        d={reverse.publishes__politicalpartys}
                                        s="Published by (Political Parties)"
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
                                s="Operations performed"
                            />
                            <DetailListDict
                                d={item.designed_for}
                                s="Designed For"
                            />
                            <DetailListDict
                                d={item.channels}
                                s="Channels covered"
                            />
                            <DetailField
                                d={item.graphical_user_interface}
                                s="Graphical User Interface"
                                t="boolean"
                            />
                            <DetailList
                                d={item.platforms}
                                s="Platforms"
                            />
                            {type === 'Tool' &&
                                <DetailField
                                    d="language_independent"
                                    s="Tool is independent of languages"
                                    t="boolean"
                                />
                            }
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
                                s={languages[type] ? languages[type] : 'Language(s)'}
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
                                d={item.file_formats}
                                s="File Formats"
                            />
                            <DetailListDict
                                d={item.meta_variables}
                                s="Included Meta Variables"
                            />
                            <DetailListDict
                                d={item.concept_variables}
                                s="Included Concept Variables"
                            />
                            <DetailField
                                d={item.temporal_coverage_start}
                                s="Start date of coverage"
                                t="year"
                            />
                            <DetailField
                                d={item.temporal_coverage_end}
                                s="End date of coverage"
                                t="year"
                            />
                            <DetailListDict
                                d={item.methodologies}
                                s="Methodologies"
                            />
                            <DetailListDict
                                d={item.modalities}
                                s="Modalities"
                            />
                            <DetailExtLink
                                d={item.urls}
                                s="URLs"
                                u=""
                            />

                        </div>
                    }

                    {/* Governments & Parliaments */}
                    {["Government", "Parliament"].includes(type) &&
                        <div className="divTable">
                        <DetailHeader t="About" m="" />
                        {item.country &&
                            <DisplayCountry
                                j={item.country}
                                t={type}
                            />
                        }
                        {item.languages &&
                            <DetailListDict
                            d={item.languages}
                            s="Language(s)"
                        />
                        }

                    </div>
                    }

                    {/* Files  */}
                    {files.includes(type) &&
                        <div className="divTable">
                            <DetailHeader
                                t="Files"
                                m={files_header[type]}
                            />
                            {reverse.file_formats__files &&
                                <>
                                    {(reverse.file_formats__files).length > 0 &&
                                        <DetailListDictReverse
                                            d={reverse.file_formats__files}
                                            s=""
                                        />
                                    }
                                </>
                            }
                        </div>
                    }
                    {/* Tools */ }
                    {tools.includes(type) &&
                        Object.keys(reverse)
                            .filter((item) => item.includes('tools'))
                            .map(function(key) {
                                if (reverse[key].length > 0) {
                                    return <> <div className="divTable">
                                                <DetailHeader t="Tools" m={tools_header[type]} /> 
                                                <DetailListDictReverse d={reverse[key]} s="" /> </div> </>
                                }
                            })
                    
                    }

                    {/* Sources Included */}
                    {sources_included.includes(type) &&
                        <div className="divTable">
                            <DetailHeader
                                t="Sources Included"
                                m={sources_included_header[type]}
                            />
                            {item.sources_included &&
                            <div className="divTableRow">
                                <div className="divTableHead">Total:</div>
                                <div className="divTableCell"><Link
                                    to={getSourcesLink(item._unique_name)}>{getNumSources(item.sources_included)}</Link>
                                </div>
                            </div>
                            }
                            {item.sources_included &&
                                <DetailListSourcesIncluded
                                    items={item.sources_included}
                                />
                            }
                            {item.text_units &&
                                <DetailListDict
                                    d={item.text_units}
                                    s="Text Units"
                                />
                            }
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
                    {owns.includes(type) && item.owns?.length > 0 &&
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
                        <>
                            {reverse.owns__organizations &&
                                <>
                                    {reverse.owns__organizations.length > 0 &&
                                        <div className="divTable">
                                            <DetailListDictReverse
                                                d={reverse.owns__organizations}
                                                s="Owned by"
                                                h="true"
                                            />
                                        </div>
                                    }
                                </>
                            }
                        </>
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

                    {/* Archives */}
                    {archives.includes(type) &&
                        Object.keys(reverse)
                            .filter((item) => item.includes('archives'))
                            .map(function(key) {
                                if (reverse[key].length > 0) {
                                    return <> <div className="divTable">
                                                <DetailHeader t="Archives" m={archives_header[type]} /> 
                                                <DetailListDictReverse d={reverse[key]} s="" /> </div> </>
                                }
                            })
                    
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
                        Object.keys(reverse)
                            .filter((item) => item.includes('scientificpublications'))
                            .map(function(predicate) {
                                if (reverse[predicate].length > 0) {
                                    return <> <div className="divTable" key={predicate}>
                                                <DetailHeader t="Research" m={research_header[type]} /> 
                                                <DetailListDictReverse d={reverse[predicate]} s="" /> </div> </>
                                }
                            })
                    
                    }


                    {/* Datasets */}
                    {datasets.includes(type) &&
                        Object.keys(reverse)
                            .filter((item) => item.includes('datasets'))
                            .map(function(predicate) {
                                if (reverse[predicate].length > 0) {
                                    return <> <div className="divTable" key={predicate}>
                                                <DetailHeader t="Datasets" m={datasets_header[type]} /> 
                                                <DetailListDictReverse d={reverse[predicate]} s="" /> </div> </>
                                }
                            })
                    
                    }

                    {/* Publications */}
                    {publications.includes(type) &&
                        <>
                        {reverse.authors__scientificpublications?.length > 0 &&
                        <div className="divTable">
                            <DetailListDictReverse
                                d={reverse.authors__scientificpublications}
                                s="Publications"
                                h={true}
                                />
                         </div>
                        }
                        </>
                    }

                    {/* Learning materials */}
                    {learning_materials.includes(type) &&
                        Object.keys(reverse)
                            .filter((item) => item.includes('learningmaterials'))
                            .map(function(key) {
                                if (reverse[key].length > 0) {
                                    return <> <div className="divTable">
                                                <DetailHeader t="Learning Materials" m={learning_materials_header[type]} /> 
                                                <DetailListDictReverse d={reverse[key]} s="" /> </div> </>
                                }
                            })
                    
                    }

                    {/* Initial Source */}
                    {initial_source.includes(type) &&
                        <>
                            {reverse.initial_source__datasets &&
                                <>
                                    {(reverse.initial_source__datasets).length > 0 &&
                                        <div className="divTable">
                                            <DetailHeader
                                                t="Initial Source"
                                                m={initial_source_header[type]}
                                            />
                                            <DetailListDictReverse
                                                d={reverse.initial_source__datasets}
                                                s=""
                                            />
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }

                    {/* Included in collections */}
                    {Object.keys(reverse)
                            .filter((item) => item.includes('collections'))
                            .map(function(predicate) {
                                if (reverse[predicate].length > 0) {
                                    return <> <div className="divTable" key={predicate}>
                                                <DetailHeader t="Collections" m="Entry included in the following collections" /> 
                                                <DetailListDictReverse d={reverse[predicate]} s="" /> </div> </>
                                }
                            })
                    
                    }

                    

                </>
            }

            {/* Raw Data */}
            {process.env.NODE_ENV === "development" && item &&
                <div className="divTable">
                    <DetailHeader
                        t="Raw Data"
                        m={JSON.stringify(item, null, 4)}
                        p="true"
                    />
                </div>
            }

            {/* Reverse Data */}
            {process.env.NODE_ENV === "development" && reverse &&
                <div className="divTable">
                    <DetailHeader
                        t="Reverse Data"
                        m={JSON.stringify(reverse, null, 4)}
                        p="true"
                    />
                </div>
            }
        </>
    )
};

export default Detail;
