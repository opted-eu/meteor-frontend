import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";
import AddAsyncSelectBox from "../forms/AddAsyncSelectBox";
import SearchTextField from "../forms/SearchTextField";
import SearchSelectBox from "../forms/SearchSelectBox";
import CreatableSelectBox from "../forms/CreatableSelectBox";
import TypeDescription from '../components/TypeDescription';
import { useOpenAPI } from "../components/APISpecs";
import SearchCheckbox from "../forms/SearchCheckbox";
import getProfile from "../user/getProfile";
import {ProfileContext} from "../user/ProfileContext";
import DatePickerValue from "./DatePickerValue"
import Magic from "./Magic"


async function addRecord(dgraph_type, json_entry, token) {
    return fetch(process.env.REACT_APP_API + 'add/' + dgraph_type, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token?.access_token
        },
        body: JSON.stringify(json_entry)
    })
        .then(data => data.json())

}

async function editRecord(uid, json_entry, token) {
    return fetch(process.env.REACT_APP_API + 'edit/' + uid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token?.access_token
        },
        body: JSON.stringify(json_entry)
    })
        .then(data => data.json())
        .catch((err) => {
            //console.log('EDIT ERROR:');
            console.log(err);
        });

}

const AddEntry = () => {

    /*
        To add more entities:
            Follow the Cs

        To add more Async select boxes:
            Follow the As

        To add more normal select boxes
            Follow the Bs

        To add more text boxes:
            Follow the Ts

        To add more 'creatable' selects
            Follow the Ds

        To add more 'enum' selects
            Follow the Es

        To add more checkboxes
            follow the Fs
    */

    let dockindUpdate = 'multi'
    //let dockindUpdate = 'single'
    let { uid } = useParams();
    const [searchParams] = useSearchParams();
    const openApi = useOpenAPI();

    // API field names lookup (A1, B1, D1, E1, F1, T1)
    let apiField = {}
    apiField['name'] = 'name'
    apiField['description'] = 'description'
    apiField['entries_included'] = 'entries_included'
    apiField['languages'] = 'languages'
    apiField['countries'] = 'countries'
    apiField['concept'] = 'concept_variables'
    apiField['modal'] = 'modalities'
    apiField['subnational_scope'] = 'subnational_scope'
    apiField['materials'] = 'materials'
    apiField['tools'] = 'tools'
    apiField['references'] = 'references'
    apiField['alternate_names'] = 'alternate_names'
    apiField['url'] = 'url'
    apiField['authors'] = 'authors'
    apiField['doi'] = 'doi'
    apiField['arxiv'] = 'arxiv'
    apiField['conditions_of_access'] = 'conditions_of_access'
    apiField['text_types'] = 'text_types'
    apiField['sources_included'] = 'sources_included'
    apiField['geographic'] = 'geographic_scope'
    apiField['fulltext'] = 'fulltext_available'
    apiField['text_units'] = 'text_units'
    apiField['meta_variables'] = 'meta_variables'
    apiField['file_formats'] = 'file_formats'
    apiField['date_published'] = 'date_published'
    apiField['github'] = 'github'
    apiField['temporal_coverage_start'] = 'temporal_coverage_start'
    apiField['temporal_coverage_end'] = 'temporal_coverage_end'
    apiField['initial_source'] = 'initial_source'
    apiField['related_publications'] = 'related_publications'
    apiField['entry_review_status'] = 'entry_review_status'
    apiField['wikidata_id'] = 'wikidata_id'
    apiField['country'] = 'country'
    apiField['ownership'] = 'ownership_kind'
    apiField['ngo'] = 'is_ngo'
    apiField['publishes'] = 'publishes'
    apiField['owns'] = 'owns'
    apiField['subnational_async'] = 'subnational'
    apiField['urls'] = 'urls'
    apiField['method'] = 'methodologies'
    apiField['dataset'] = 'datasets_used'
    apiField['programming_languages'] = 'programming_languages'
    apiField['channels'] = 'channels'
    apiField['name_abbrev'] = 'name_abbrev'
    apiField['color_hex'] = 'color_hex'
    apiField['parlgov_id'] = 'parlgov_id'
    apiField['partyfacts_id'] = 'partyfacts_id'
    apiField['title'] = 'title'
    apiField['openalex'] = 'openalex'
    apiField['paper_kind'] = 'paper_kind'
    apiField['venue'] = 'venue'
    apiField['version'] = 'version'
    apiField['cran'] = 'cran'
    apiField['pypi'] = 'pypi'
    apiField['platform'] = 'platforms'
    apiField['used_for'] = 'used_for'
    apiField['open_source'] = 'open_source'
    apiField['license'] = 'license'
    apiField['gui'] = 'graphical_user_interface'
    apiField['designed_for'] = 'designed_for'
    apiField['language_independent'] = 'language_independent'
    apiField['iff'] = 'input_file_format'
    apiField['off'] = 'output_file_format'
    apiField['author_validated'] = 'author_validated'
    apiField['defunct'] = 'defunct'
    apiField['validation_dataset'] = 'validation_dataset'
    apiField['transcript'] = 'transcript_kind'
    apiField['channel'] = 'channel'
    apiField['website_allows_comments'] = 'website_allows_comments'
    apiField['website_comments_reg'] = 'website_comments_registration_required'
    apiField['date_founded'] = 'date_founded'
    apiField['pubkind'] = 'publication_kind'
    apiField['special_interest'] = 'special_interest'
    apiField['topical'] = 'topical_focus'
    apiField['pubcycle'] = 'publication_cycle'
    apiField['pubcycleweekly'] = 'publication_cycle_weekday'
    apiField['paymod'] = 'payment_model'
    apiField['ads'] = 'contains_ads'
    apiField['audience_size_recent'] = 'audience_size_recent'
    apiField['audience_size_recent|timestamp'] = 'audience_size_recent|timestamp'
    apiField['audience_size_recent|unit'] = 'audience_size_recent|unit'
    apiField['audience_size_recent|data_from'] = 'audience_size_recent|data_from'
    apiField['audience_size'] = 'audience_size'
    apiField['audience_size_count'] = 'audience_size|count'
    apiField['audience_size_unit'] = 'audience_size|unit'
    apiField['audience_size_data_from'] = 'audience_size|data_from'
    apiField['epaper'] = 'channel_epaper'
    apiField['party'] = 'party_affiliated'
    apiField['relatedns'] = 'related_news_sources'
    apiField['documentation'] = 'documentation'
    apiField['dockind'] = 'documentation|kind'
    apiField['is_politician'] = 'is_politician'

    // set initial json for adding a new record
    let initialJSON = () => {
        let j = {}
        j['name'] = entryName
        let d = {'data': j}
        return d
    }

    // get querystring
    let initalEntity = ''
    let initialEntryName = ''

    for (let param of searchParams) {
        if (param[0] === 'name'){
            initialEntryName = param[1]
        } else {
            if (param[0] === 'dgraph_type'){
                initalEntity = param[1]
            }
        }
    }

    const [token, setToken] = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();
    const navigate = useNavigate();
    const [entity, setEntity] = useState(initalEntity);
    const [entryName, setEntryName] = useState(initialEntryName);
    const [json, setJson] = useState(initialJSON())
    const [error, setError] = useState(null);
    const [addResponse, setAddResponse] = useState(null);
    const [item, setItem] = useState(null);
    const [profile, setProfile] = useContext(ProfileContext);
    const [schema, setSchema] = useState(null);
    const [doc, setDoc] = useState();
    const [dockind, setDockind] = useState();

    // Async (A2)
    // entries included
    const [entriesIncludedDetails, setEntriesIncludedDetails] = useState([])
    const [searchEntriesIncluded, setSearchEntriesIncluded] = useState();
    // tools
    const [toolsDetails, setToolsDetails] = useState([])
    const [searchTools, setSearchTools] = useState();
    // references
    const [referencesDetails, setReferencesDetails] = useState([])
    const [searchReferences, setSearchReferences] = useState();
    // authors
    const [authorsDetails, setAuthorsDetails] = useState([])
    const [searchAuthors, setSearchAuthors] = useState();
    // sourcesincluded
    const [sourcesIncludedDetails, setSourcesIncludedDetails] = useState([])
    const [searchSourcesIncluded, setSearchSourcesIncluded] = useState();
    // learning materials
    const [materialsDetails, setMaterialsDetails] = useState([])
    const [searchMaterials, setSearchMaterials] = useState();
    // initial source
    const [initialSourceDetails, setInitialSourceDetails] = useState([])
    const [searchInitialSource, setSearchInitialSource] = useState();
    // related publications
    const [relatedPublicationsDetails, setRelatedPublicationsDetails] = useState([])
    const [searchRelatedPublications, setSearchRelatedPublications] = useState();
    // publishes
    const [publishesDetails, setPublishesDetails] = useState([])
    const [searchPublishes, setSearchPublishes] = useState();
    // owns
    const [ownsDetails, setOwnsDetails] = useState([])
    const [searchOwns, setSearchOwns] = useState();
    // subnational_async
    const [subnationalAsyncDetails, setSubnationalAsyncDetails] = useState([])
    const [searchSubnationalAsync, setSearchSubnationalAsync] = useState();
    // dataset
    const [datasetDetails, setDatasetDetails] = useState([])
    const [searchDataset, setSearchDataset] = useState();
    // designed for
    const [designedForDetails, setDesignedForDetails] = useState([])
    const [searchDesignedFor, setSearchDesignedFor] = useState();
    // related news sources
    const [relatednsDetails, setRelatednsDetails] = useState([])
    const [searchRelatedns, setSearchRelatedns] = useState();

    // List (B2)
    // languages
    const [languagesList, setLanguagesList] = useState([])
    const [searchLanguages, setSearchLanguages] = useState();
    // countries
    const [countriesList, setCountriesList] = useState([])
    const [searchCountries, setSearchCountries] = useState();
    // concept_variable
    const [conceptList, setConceptList] = useState([])
    const [searchConcept, setSearchConcept] = useState();
    // modalities
    const [modalList, setModalList] = useState([])
    const [searchModal, setSearchModal] = useState();
    // subnational scope
    const [subnationalScopeList, setSubnationalScopeList] = useState([])
    const [searchSubnationalScope, setSearchSubnationalScope] = useState();
    // text types
    const [textTypesList, setTextTypesList] = useState([])
    const [searchTextTypes, setSearchTextTypes] = useState();
    // text units
    const [textUnitsList, setTextUnitsList] = useState([])
    const [searchTextUnits, setSearchTextUnits] = useState();
    // meta variables
    const [metaVariablesList, setMetaVariablesList] = useState([])
    const [searchMetaVariables, setSearchMetaVariables] = useState();
    // file formats
    const [fileFormatsList, setFileFormatsList] = useState([])
    const [searchFileFormats, setSearchFileFormats] = useState();
    // country
    const [countryList, setCountryList] = useState([])
    const [searchCountry, setSearchCountry] = useState();
    // method
    const [methodList, setMethodList] = useState([])
    const [searchMethod, setSearchMethod] = useState();
    // programming
    const [programmingList, setProgrammingList] = useState([])
    const [searchProgramming, setSearchProgramming] = useState();
    // channels
    const [channelsList, setChannelsList] = useState([])
    const [searchChannels, setSearchChannels] = useState();
    // used for
    const [usedForList, setUsedForList] = useState([])
    const [searchUsedFor, setSearchUsedFor] = useState();
    // input ff
    const [iffList, setIffList] = useState([])
    const [searchIff, setSearchIff] = useState();
    // output ff
    const [offList, setOffList] = useState([])
    const [searchOff, setSearchOff] = useState();
    // validation_dataset
    const [validationDatasetList, setValidationDatasetList] = useState([])
    const [searchValidationDataset, setSearchValidationDataset] = useState();
    // channel
    const [channelList, setChannelList] = useState([])
    const [searchChannel, setSearchChannel] = useState();

    // Creatable (D2)
    // Alternates
    const [searchAlternates, setSearchAlternates] = useState();
    // Urls
    const [searchUrls, setSearchUrls] = useState();
    // Documentation
    const [searchDoc, setSearchDoc] = useState()

    // Extras - Documentation Kind
    const [searchDockind, setSearchDockind] = useState()

    // Enum (E2)
    // Access
    const [accessList, setAccessList] = useState([['NA', 'NA / Unknown'], ['free', 'Free'], ['registration', 'Registration Required'], ['request', 'Upon Request'], ['purchase', 'Purchase']])
    const [searchAccess, setSearchAccess] = useState();

    // Geographic
    const [geographicList, setGeographicList] = useState([['multinational', 'Multinational'], ['national', 'National'], ['subnational', 'Subnational']])
    const [searchGeographic, setSearchGeographic] = useState();

    // Entry Review Status
    const [entryReviewStatusList, setEntryReviewStatusList] = useState([['draft', 'Draft'], ['pending', 'Pending'], ['accepted', 'Accepted'], ['rejected', 'Rejected']])
    const [searchEntryReviewStatus, setSearchEntryReviewStatus] = useState();

    // Ownership
    const [ownershipList, setOwnershipList] = useState([['NA', 'Don\'t know / NA'], ['private ownership', 'Mainly private Ownership'], ['public ownership', 'Mainly public ownership'], ['unknown', 'Unknown Ownership']])
    const [searchOwnership, setSearchOwnership] = useState();

    // Paper kind
    const [paperkindList, setPaperkindList] = useState([
        ['journal-article', 'Journal Article'],
        ['book', 'Book'],
        ['dataset', 'Dataset'],
        ['book-chapter', 'Book Chapter'],
        ['book-part', 'Part'],
        ['book-section', 'Book Section'],
        ['book-series', 'Book Series'],
        ['book-set', 'Book Set'],
        ['book-track', 'Book Track'],
        ['component', 'Component'],
        ['database', 'Database'],
        ['dissertation', 'Dissertation'],
        ['edited-book', 'Edited Book'],
        ['grant', 'Grant'],
        ['journal', 'Journal'],
        ['journal-issue', 'Journal Issue'],
        ['journal-volume', 'Journal Volume'],
        ['monograph', 'Monograph'],
        ['peer-review', 'Peer Review'],
        [' posted-content', 'Posted Content'],
        ['proceedings', 'Proceedings'],
        ['proceedings-article', 'Proceedings Article'],
        ['proceedings-series', 'Proceedings Series'],
        ['reference-book', 'Reference Book'],
        ['reference-entry', 'Reference Entry'],
        ['report', 'Report'],
        ['report-component', 'Report Component'],
        ['report-series', 'Report Series'],
        ['standard', 'Standard'],
        ['other', 'Other'],
    ])
    const [searchPaperkind, setSearchPaperkind] = useState();

    // platforms
    const [platformsList, setPlatformsList] = useState([['windows', 'Windows'], ['linux', 'Linux'], ['macos', 'macOS']])
    const [searchPlatforms, setSearchPlatforms] = useState();

    // Open Source
    const [openSourceList, setOpenSourceList] = useState([['NA', 'NA / Unknown'], ['yes', 'Yes'], ['no', 'No']])
    const [searchOpenSource, setSearchOpenSource] = useState();

    // Author validated
    const [authorValidatedList, setAuthorValidatedList] = useState([['NA', 'NA / Unknown'], ['yes', 'Yes'], ['no', 'No, not reported']])
    const [searchAuthorValidated, setSearchAuthorValidated] = useState();

    // Transcript Kind
    const [transcriptList, setTranscriptList] = useState([['tv', 'TV (broadcast, cable, satellite, etc'], ['radio', 'Radio'], ['podcast', 'Podcast']])
    const [searchTranscript, setSearchTranscript] = useState();

    // Website Allows Comments
    const [websiteAllowsCommentsList, setWebsiteAllowsCommentsList] = useState([['NA', 'NA / Unknown'], ['yes', 'Yes'], ['no', 'No']])
    const [searchWebsiteAllowsComments, setSearchWebsiteAllowsComments] = useState();

    // Website Comments Reg Req
    const [websiteCommentsRegList, setWebsiteCommentsRegList] = useState([['NA', 'NA / Unknown'], ['yes', 'Yes'], ['no', 'No']])
    const [searchWebsiteCommentsReg, setSearchWebsiteCommentsReg] = useState();

    // Pub kind
    const [pubkindList, setPubkindList] = useState([
        ['newspaper', 'Newspaper'],
        ['news site', 'News Site'],
        ['news agency', 'News Agency'],
        ['magazine', 'Magazine'],
        ['tv show', 'TV Show / TV Channel'],
        ['radio show', 'Radio Show / Radio Channel'],
        ['podcast', 'Podcast'],
        ['news blog', 'News Blog'],
        ['alternative media', 'Alternative Media'],
        ['organizational communication', 'Organizational Communication'],
    ])
    const [searchPubkind, setSearchPubkind] = useState();

    // Topical Focus
    const [topicalList, setTopicalList] = useState([
        ['economy', 'Business, Economy, Finance & Stocks'],
        ['education', 'Education'],
        ['environment', 'Environment'],
        ['health', 'Health'],
        ['media', 'Media'],
        ['politics', 'Politics'],
        ['religion', 'Religion'],
        ['society', 'Society & Panorama'],
        ['science', 'Science & Technology'],
        ['youth', 'Youth'],
        ['NA', 'Don\'t Know / NA'],
    ])
    const [searchTopical, setSearchTopical] = useState();

    // Publication cycle
    const [pubcycleList, setPubcycleList] = useState([
        ['continuous', 'Continuous'],
        ['daily', 'Daily (7 times a week)'],
        ['multiple times per week', 'Multiple times per week'],
        ['weekly', 'Weekly'],
        ['twice a month', 'Twice a month'],
        ['monthly', 'Monthly'],
        ['less than monthly', 'Less frequent than monthly'],
        ['NA', 'Don\'t Know / NA'],
    ])
    const [searchPubcycle, setSearchPubcycle] = useState();

    // Publication cycle
    const [pubcycleweeklyList, setPubcycleweeklyList] = useState([
        ['1', 'Monday'],
        ['2', 'Tuesday'],
        ['3', 'Wednesday'],
        ['4', 'Thursday'],
        ['5', 'Friday'],
        ['6', 'Saturday'],
        ['7', 'Sunday'],
    ])
    const [searchPubcycleweekly, setSearchPubcycleweekly] = useState();

    // Payment Model
    const [paymodList, setPaymodList] = useState([['free', 'All content is free of charge'], ['partly free', 'Some content is free of charge'], ['not free', 'Paid content only'], ['NA', 'Don\'t know / NA']])
    const [searchPaymod, setSearchPaymod] = useState();

    // Contains Ads
    const [adsList, setAdsList] = useState([['yes', 'Yes'], ['no', 'No'], ['non subscribers', 'Only for non-subscribers'], ['NA', 'Don\'t know / NA']])
    const [searchAds, setSearchAds] = useState();

    // Channel ePaper
    const [epaperList, setEpaperList] = useState([['yes', 'Yes'], ['no', 'No'], ['NA', 'Don\'t know / NA']])
    const [searchEpaper, setSearchEpaper] = useState();

    // Party Affiliated
    const [partyList, setPartyList] = useState([['NA', 'Don\'t know / NA'], ['yes', 'Yes'], ['no', 'No']])
    const [searchParty, setSearchParty] = useState();


    // *************** Fetch Data ****************

    const fetchItemData = () => {
        let getItem = process.env.REACT_APP_API + "view/uid/" + uid

        fetch(getItem, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token?.access_token
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                updateInitialJSON(data);
                setItem(data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //**************** magic dictionaries **************

    // Magic text fields (T2)
    const [description, setDescription] = useState();
    const [datePublished, setDatePublished] = useState();
    const [doi, setDoi] = useState();
    const [openalex, setOpenalex] = useState();
    const [url, setUrl] = useState();
    const [venue, setVenue] = useState();
    const [title, setTitle] = useState();
    const [arxiv, setArxiv] = useState();
    const [github, setGithub] = useState();
    const [cran, setCran] = useState();
    const [pypi, setPypi] = useState();
    const [license, setLicense] = useState();
    const [version, setVersion] = useState();
    const [audience_size_recent, setAudSizeRecent] = useState();
    const [audience_size_recent_count, setAudSizeRecentCount] = useState();
    const [audience_size_recent_unit, setAudSizeRecentUnit] = useState();
    const [audience_size_recent_data, setAudSizeRecentData] = useState();
    const [audience_size, setAudSize] = useState();
    const [audience_size_count, setAudSizeCount] = useState();
    const [audience_size_unit, setAudSizeUnit] = useState();
    const [audience_size_data_from, setAudSizeData] = useState();

    let magicText = {}
    magicText['name'] = setEntryName
    magicText['description'] = setDescription
    magicText['date_published'] = setDatePublished
    magicText['doi'] = setDoi
    magicText['openalex'] = setOpenalex
    magicText['url'] = setUrl
    magicText['venue'] = setVenue
    magicText['title'] = setTitle
    magicText['arxiv'] = setArxiv
    magicText['github'] = setGithub
    magicText['cran'] = setCran
    magicText['pypi'] = setPypi
    magicText['license'] = setLicense
    magicText['version'] = setVersion
    magicText['audience_size_recent'] = setAudSizeRecent
    magicText['audience_size_recent|count'] = setAudSizeRecentCount
    magicText['audience_size_recent|unit'] = setAudSizeRecentUnit
    magicText['audience_size_recent|data'] = setAudSizeRecentData
    magicText['audience_size'] = setAudSize
    magicText['audience_size|count'] = setAudSizeCount
    magicText['audience_size|unit'] = setAudSizeUnit
    magicText['audience_size|data_from'] = setAudSizeData

    // Magic Enum fields - Single
    let magicEnumSingle = {}
    magicEnumSingle['paper_kind'] = [paperkindList, setSearchPaperkind]
    magicEnumSingle['conditions_of_access'] = [accessList, setSearchAccess]
    magicEnumSingle['open_source'] = [openSourceList, setSearchOpenSource]

    // Magic Enum fields - Multiple
    let magicEnumMultiple = {}
    magicEnumMultiple['platform'] = [platformsList, setSearchPlatforms]

    // Magic Select boxes - Multiple
    let magicSelectMultiple = {}
    magicSelectMultiple['authors'] = [setSearchAuthors]
    magicSelectMultiple['programming_languages'] = [setSearchProgramming, programmingList]

    // Magic Creatable Select boxes - Multiple
    let magicCreatable = {}
    magicCreatable['alternate_names'] = setSearchAlternates
    magicCreatable['documentation'] = setSearchDoc

    // *********** helper fetch function ****************
    const fetchData = (fetchURL, predicate, val, list, itemdata, detailed=false, singleitem=false) => {
        /*
            Arguments:
                fetchURL:
                    URL of the API query (minus the basePath)
                predicate
                    If the fetchURL contains a '/' then the predicate is added to the fetchURL
                val:
                    0 = uses 'name' field from returned API query for both value & name parameters
                    1 = uses 'uid' and 'name
                    2 = user 'value' and 'name;
                list:
                    true = API query returns a list of dictionaries
                    false = single dictionary returned
                itemdata:
                    item data
                detailed:
                    true: add '?detailed=true' to the API query. This returns a list of dictionaries instead of a list of key/value pairs
                singleitem:
                    true: does not attempt to loop through itemdata
        */
        // construct API URL
        let fullURL = process.env.REACT_APP_API
        fullURL += fetchURL
        if (fullURL.slice(-1) === '/'){
            fullURL += apiField[predicate]
        }
        if (detailed){
            fullURL += '?detailed=true'
        }
        //console.log(fullURL)

        // fetch data
        fetch(fullURL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // get list of previously selected search items
                let s = []
                if (itemdata) {
                    if (itemdata[apiField[predicate]]) {
                        if (list) {
                            let a = 0
                            for (var d of data) {
                                if (singleitem){
                                    let param = itemdata[apiField[predicate]]
                                    if (val === 1) {
                                        if (param.uid === d.uid) {
                                            s[s.length] = {value: d.uid, label: d.name};
                                        }
                                    } else {
                                        if (val === 0) {
                                            if (param.name === d.name) {
                                                s[s.length] = {value: d.name, label: d.name};
                                            }
                                        } else {
                                            if (param.value === d.value) {
                                                s[s.length] = {value: d.value, label: d.name};
                                            }
                                        }
                                    }
                                } else {
                                    for (let param of itemdata[apiField[predicate]]) {
                                        if (val === 1) {
                                            if (param.uid === d.uid) {
                                                s[s.length] = {value: d.uid, label: d.name};
                                            }
                                        } else {
                                            if (val === 0) {
                                                if (param.name === d.name) {
                                                    s[s.length] = {value: d.name, label: d.name};
                                                }
                                            } else {
                                                if (param.value === d.value) {
                                                    s[s.length] = {value: d.value, label: d.name};
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (const [key, val] of Object.entries(data)) {
                                for (let param of itemdata[apiField[predicate]]) {
                                    if (param[1] === key) {
                                        s[s.length] = {value: key, label: val};
                                    }
                                }
                            }
                        }
                    }
                }
                setStateVars(predicate, data, s)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // ************* set state vars after fetch *************** (B3)
    const setStateVars = (predicate, data, s) => {
        // Add each predicate here (not async)
        switch (predicate) {
            case 'languages':
                setLanguagesList(data);
                setSearchLanguages(s);
                break;
            case 'countries':
                setCountriesList(data);
                setSearchCountries(s);
                break;
            case 'concept':
                setConceptList(data);
                setSearchConcept(s);
                break;
            case 'modal':
                setModalList(data);
                setSearchModal(s);
                break;
            case 'subnational_scope':
                setSubnationalScopeList(data);
                setSearchSubnationalScope(s);
                break;
            case 'text_types':
                setTextTypesList(data);
                setSearchTextTypes(s);
                break;
            case 'text_units':
                setTextUnitsList(data);
                setSearchTextUnits(s);
                break;
            case 'meta_variables':
                setMetaVariablesList(data);
                setSearchMetaVariables(s);
                break;
            case 'file_formats':
                setFileFormatsList(data);
                setSearchFileFormats(s);
                break;
            case 'country':
                setCountryList(data);
                setSearchCountry(s);
                break;
            case 'method':
                setMethodList(data);
                setSearchMethod(s);
                break;
            case 'programming_languages':
                setProgrammingList(data);
                setSearchProgramming(s);
                break;
            case 'channels':
                setChannelsList(data);
                setSearchChannels(s);
                break;
            case 'used_for':
                setUsedForList(data);
                setSearchUsedFor(s);
                break;
            case 'iff':
                setIffList(data);
                setSearchIff(s);
                break;
            case 'off':
                setOffList(data);
                setSearchOff(s);
                break;
            case 'validation_dataset':
                setValidationDatasetList(data);
                setSearchValidationDataset(s);
                break;
            case 'channel':
                setChannelList(data);
                setSearchChannel(s);
                break;
            default:
                break
        }
    }


    // ************* Get Data when enter screen ***************

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken, navigate)
        getProfile(setProfile)
    }


    const fetchSchemaData = async () => {
        try {
            const data = await openApi.getData();
            setSchema(data.components.schemas[entity]);
        } catch (error) {
            console.error('Error fetching API Schema data:', error);
        } finally {
        }
    };
    if (entity && !schema){
        fetchSchemaData()
    }

    useEffect(() => {
        getData()
        if (uid){
            fetchItemData()
        } else {
            updateInitialJSON(null)
        }
    }, [token])

    // ************* Create select box details ***************** (A3)

    const createSearchDetails = (search, details, predicate) => {
        let ary = []
        search?.forEach(b => {
            if (b.name){  // search is a full dictionary
                ary.push({name: b.name, uid: b.uid})
            } else {
                const res = details?.find(c => c.uid === b.uid);
                if (res) {
                    let d = ''
                    if (res["dgraph.type"]) {
                        let dt = res["dgraph.type"]
                        for (var i = 0; i < dt.length; i++) {
                            if (dt[i] !== 'Entry') {
                                d = dt[i];
                                break;
                            }
                        }
                    } else {
                        if (predicate) {
                            d = predicate
                        }
                    }
                    let ch = res.channel
                    let chan = ''
                    if (ch) {
                        chan = ch.name
                    }
                    let n = chan + ' ' + res.name
                    ary.push({name: n, uid: res.uid, type: d})
                }
            }

        })
        //console.log(predicate, ary)
        return ary
    }

    const createSearchDetailsSingle = (search, details) => {
        if (search){
            let d = null
            if (search["dgraph.type"]) {
                let dt = search["dgraph.type"]
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
            }
            return {name: search.name, uid: search.uid, type: d}
        }

    }

    let entries_included_details = createSearchDetails(searchEntriesIncluded, entriesIncludedDetails)
    let tools_details = createSearchDetails(searchTools, toolsDetails)
    let references_details = createSearchDetails(searchReferences, referencesDetails)
    //console.log('searchAuthors ae: ', searchAuthors)
    let authors_details = createSearchDetails(searchAuthors, authorsDetails, 'Author')
    let sources_included_details = createSearchDetails(searchSourcesIncluded, sourcesIncludedDetails)
    let materials_details = createSearchDetails(searchMaterials, materialsDetails)
    let initial_source_details = createSearchDetails(searchInitialSource, initialSourceDetails)
    let related_publications_details = createSearchDetails(searchRelatedPublications, relatedPublicationsDetails)
    let publishes_details = createSearchDetails(searchPublishes, publishesDetails)
    let owns_details = createSearchDetails(searchOwns, ownsDetails)
    let subnational_async_details = createSearchDetailsSingle(searchSubnationalAsync, subnationalAsyncDetails)
    let dataset_details = createSearchDetails(searchDataset, datasetDetails)
    let designed_for_details = createSearchDetails(searchDesignedFor, designedForDetails)
    let relatedns_details = createSearchDetails(searchRelatedns, relatednsDetails)

    // ************** Handlers ***************

    // *** async *** (A4)

    const handleChangeEntriesIncluded = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchEntriesIncluded(sel[1])
        updateJSON('entries_included', sel[0])
    };

    const handleChangeTools = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchTools(sel[1])
        updateJSON('tools', sel[0])
    };

    const handleChangeReferences = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchReferences(sel[1])
        updateJSON('references', sel[0])
    };

    const handleChangeAuthors = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchAuthors(sel[1])
        //console.log('authors', sel[1])
        updateJSON('authors', sel[0])
    };

    const handleChangeSourcesIncluded = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchSourcesIncluded(sel[1])
        updateJSON('sources_included', sel[0])
    };

    const handleChangeMaterials = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchMaterials(sel[1])
        updateJSON('materials', sel[0])
    };

    const handleChangeInitialSource = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchInitialSource(sel[1])
        updateJSON('initial_source', sel[0])
    };

    const handleChangeRelatedPublications = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchRelatedPublications(sel[1])
        updateJSON('related_publications', sel[0])
    };

    const handleChangePublishes = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchPublishes(sel[1])
        updateJSON('publishes', sel[0])
    };

    const handleChangeOwns = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchOwns(sel[1])
        updateJSON('owns', sel[0])
    };

    const handleChangeSubnationalAsync = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        let obj = {value: sel[1][0], label: sel[1][1]}
        setSearchSubnationalAsync(obj)
        let uidPos = sel[1]
        uidPos = uidPos.length
        updateJSON('subnational_async', sel[1][uidPos-1])
    };

    const handleChangeDataset = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchDataset(sel[1])
        updateJSON('dataset', sel[0])
    };

    const handleChangeDesignedFor = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchDesignedFor(sel[1])
        updateJSON('designed_for', sel[0])
    };

    const handleChangeRelatedns = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption)
        setSearchRelatedns(sel[1])
        updateJSON('relatedns', sel[0])
    };

    // *** normal *** (B4)

    const handleChangeLanguages = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchLanguages(sel[1])
        updateJSON('languages', sel[0])
    };

    const handleChangeCountries = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchCountries(sel[1])
        updateJSON('countries', sel[0])
    };

    const handleChangeConcept = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchConcept(sel[1])
        updateJSON('concept', sel[0])
    };

    const handleChangeModal = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchModal(sel[1])
        updateJSON('modal', sel[0])
    };

    const handleChangeSubnationalScope = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchSubnationalScope(sel[1])
        updateJSON('subnational_scope', sel[0])
    };

    const handleChangeTextTypes = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchTextTypes(sel[1])
        updateJSON('text_types', sel[0])
    };

    const handleChangeTextUnits = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchTextUnits(sel[1])
        updateJSON('text_units', sel[0])
    };

    const handleChangeMetaVariables = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchMetaVariables(sel[1])
        updateJSON('meta_variables', sel[0])
    };

    const handleChangeFileFormats = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchFileFormats(sel[1])
        updateJSON('file_formats', sel[0])
    };

    const handleChangeCountry = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        let obj = {value: sel[1][0], label: sel[1][1]}
        setSearchCountry(obj)
        updateJSON('country', sel[1][0])
    };
    const handleChangeMethod = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchMethod(sel[1])
        updateJSON('method', sel[0])
    };
    const handleChangeProgramming = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchProgramming(sel[1])
        updateJSON('programming_languages', sel[0])
    };
    const handleChangeChannels = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchChannels(sel[1])
        updateJSON('channels', sel[0])
    };
    const handleChangeUsedFor = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchUsedFor(sel[1])
        updateJSON('used_for', sel[0])
    };
    const handleChangeIff = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchIff(sel[1])
        updateJSON('iff', sel[0])
    };
    const handleChangeOff = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchOff(sel[1])
        updateJSON('off', sel[0])
    };
    const handleChangeValidationDataset = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchValidationDataset(sel[1])
        updateJSON('validation_dataset', sel[0])
    };
    const handleChangeChannel = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        let obj = {value: sel[1][0], label: sel[1][1]}
        setSearchChannel(obj)
        updateJSON('channel', sel[1][0])
    };


    // *** creatable *** (D3)

    const handleChangeAlternates = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        //console.log(sel)
        setSearchAlternates(sel[1])
        updateJSON('alternate_names', sel[0])
    };

    const handleChangeUrls = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchUrls(sel[1])
        updateJSON('urls', sel[0])
    };

    const handleChangeDoc = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchDoc(sel[1])
        setDoc(sel[0])
        updateJSON('documentation', sel[0])
    };

    // *** Extra Handler for Documentation|kind ***
    //     arguments not actually required
    const handleChangeDockind = (fieldName=null, value=null) => {
        // get all dockind fields
        var elements = document.querySelectorAll('[name^=dockind_]')

        // update JSON
        let dict_json = new Object()
        let i = 0
        for (var e of elements) {
            //console.log(e.name, e.value)
            dict_json[i] = e.value;
            i++;
        }
        updateJSON('dockind', dict_json)
    };

    const handleChangeAudSize = (fieldname=null, value=null) => {
        // get all audsize fields
        var elements = document.querySelectorAll('[name^=audsize_]')

        // update JSON
        let ary_json = []
        for (var e of elements) {
            if (e.value) {
                if (fieldname === e.name){
                    let dt = value
                    let d = ('0' + dt.getDate()).slice(-2)
                    let m = ('0' + (dt.getMonth()+1)).slice(-2)
                    let y = dt.getFullYear()
                    let str_dt = y + '-' + m + '-' + d
                    //console.log(fieldname, value, str_dt)
                    ary_json.push(str_dt)
                } else {
                    let d = (e.value).substring(0, 2)
                    let m = (e.value).substring(3, 5)
                    let y = (e.value).substring(6)
                    let str_dt = y + '-' + m + '-' + d
                    //console.log(e.name, e.value, str_dt)
                    ary_json.push(str_dt)
                }
            }
        }
        updateJSON('audience_size', ary_json)
    };


    // *** enums *** (E3)

    const handleChangeAccess = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchAccess({'value': sel[0], 'label': sel[1]})
        updateJSON('conditions_of_access', sel[0])
    };

    const handleChangeGeographic = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchGeographic({'value': sel[0], 'label': sel[1]})
        updateJSON('geographic', sel[0])
    };

    const handleChangeEntryReviewStatus = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchEntryReviewStatus({'value': sel[0], 'label': sel[1]})
        updateJSON('entry_review_status', sel[0])
    };

    const handleChangeOwnership = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchOwnership({'value': sel[0], 'label': sel[1]})
        updateJSON('ownership', sel[0])
    };

    const handleChangePaperkind = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchPaperkind({'value': sel[0], 'label': sel[1]})
        updateJSON('paper_kind', sel[0])
    };

    const handleChangePlatforms = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchPlatforms(sel[1])
        updateJSON('platform', sel[0])
    };

    const handleChangeOpenSource = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchOpenSource({'value': sel[0], 'label': sel[1]})
        updateJSON('open_source', sel[0])
    };

    const handleChangeAuthorValidated = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchAuthorValidated({'value': sel[0], 'label': sel[1]})
        updateJSON('author_validated', sel[0])
    };

    const handleChangeTranscript = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchTranscript({'value': sel[0], 'label': sel[1]})
        updateJSON('transcript', sel[0])
    };
    const handleChangeWebsiteAllowsComments = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchWebsiteAllowsComments({'value': sel[0], 'label': sel[1]})
        updateJSON('website_allows_comments', sel[0])
    };
    const handleChangeWebsiteCommentsReg = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchWebsiteCommentsReg({'value': sel[0], 'label': sel[1]})
        updateJSON('website_comments_reg', sel[0])
    };
    const handleChangePubkind = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchPubkind(sel[1])
        updateJSON('pubkind', sel[0])
    };
    const handleChangeTopical = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchTopical(sel[1])
        updateJSON('topical', sel[0])
    };
    const handleChangePubcycle = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchPubcycle({'value': sel[0], 'label': sel[1]})
        updateJSON('pubcycle', sel[0])
    };
    const handleChangePubcycleweekly = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchPubcycleweekly(sel[1])
        updateJSON('pubcycleweekly', sel[0])
    };
    const handleChangePaymod = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchPaymod({'value': sel[0], 'label': sel[1]})
        updateJSON('paymod', sel[0])
    };
    const handleChangeAds = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchAds({'value': sel[0], 'label': sel[1]})
        updateJSON('ads', sel[0])
    };
    const handleChangeEpaper = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchEpaper({'value': sel[0], 'label': sel[1]})
        updateJSON('epaper', sel[0])
    };

    const handleChangeParty = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchParty({'value': sel[0], 'label': sel[1]})
        updateJSON('party', sel[0])
    };

    // *** checkboxes *** (F2)

    const handleClickFulltext = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('fulltext', false)
        } else {
            updateJSON('fulltext', true)
        }
    };
    const handleClickNgo = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('ngo', false)
        } else {
            updateJSON('ngo', true)
        }
    };
    const handleClickGui = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('gui', false)
        } else {
            updateJSON('gui', true)
        }
    };
    const handleClickLanguageIndependent = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('language_independent', false)
        } else {
            updateJSON('language_independent', true)
        }
    };

    const handleClickDefunct = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('defunct', false)
        } else {
            updateJSON('defunct', true)
        }
    };

    const handleClickSpecialInterest = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('special_interest', false)
        } else {
            updateJSON('special_interest', true)
        }
    };

    const handleClickIsPolitician = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('is_politician', false)
        } else {
            updateJSON('is_politician', true)
        }
    };

    // ************** Submit ****************

    const handleSubmitAE = async e => {
        e.preventDefault();

        // update dockind
        handleChangeDockind()

        if (1===1) {
            let resp = null
            //let token2 = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxODI4NjQwMCwianRpIjoiZTgyYTMwYzgtODA1My00OGQ4LWE3MDgtNjJiYmU2YTIyNGYwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjB4NjRkZWMxMSIsIm5iZiI6MTcxODI4NjQwMCwiY3NyZiI6IjFhMWI3OWEzLTNiMjgtNDUwOS04ZGIxLTFiM2Q0ZDUwM2E1OSIsImV4cCI6MTcxODI4NzMwMH0.FxVwqHbaZzAP-NaBoz9RJxslUpH-ji0FqYrzNHyXZK8","access_token_valid_until":"2024-06-13T14:01:40.870910","status":200,"refreh_token_valid_until":"2024-07-07T16:04:10.582213","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNzc3NjI1MCwianRpIjoiNzA0MTU0NjktNmNkMy00MTAwLWJlOWUtMzQzMDQ4MTk5ZTUwIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiIweDY0ZGVjMTEiLCJuYmYiOjE3MTc3NzYyNTAsImNzcmYiOiI4OWNlYzRlNS04NjYwLTRkMzUtOGQ4My03ZDAwNjZkMTYyYzUiLCJleHAiOjE3MjAzNjgyNTB9.HPTvTXVo3YwF4Jaol76rs-TpVRK1FDFdcG8JK_j-OTQ"}

            // Force the system into checking the token
            // If the user has waited on the screen more than 15 minutes they will be logged out
            // ... and the add/edit won't work
            // So, run getLoggedIn again and update the token_checked variable

            // check token
            let checked_token = await getLoggedIn(token, setLoggedIn, setToken, navigate)
            //console.log('checked_token', checked_token)

            if (uid) {
                //edit
                //console.log('Editing record')
                //console.log(json)
                resp = await editRecord(
                    uid,
                    json,
                    checked_token
                );
            } else {
                //add
                //console.log('Adding record')
                //console.log(json)
                resp = await addRecord(
                    entity,
                    json,
                    checked_token
                );
            }
            if (resp.status === 200) {
                setAddResponse(resp);
                setError(null)
                navigate('/detail/' + resp.uid)
            } else {
                if (resp.status === 'success') {
                    setAddResponse(resp);
                    setError(null)
                    navigate('/detail/' + resp.uid)
                } else {
                    let msg = resp.message
                    if (!msg){
                        msg = resp.msg
                    }
                    setError(msg)
                }
            }
        } else {
            setAddResponse(json)
        }

    }


    // ************** Display ****************

    const checkDisplay = (ary) => {
        for (var x of ary){
            if (entity?.indexOf(x) >= 0){
                return true
            }
        }
        return false
    }

    // *** async *** (A5)
    let entries_included_types = ['Dataset', 'Archive', 'NewsSource', 'JournalisticBrand', 'Government', 'Parliament', 'Person' , 'PoliticalParty', 'Organization']
    let tools_types = ['Tool']
    let references_types = ['ScientificPublication']
    let authors_types = ['Author']
    let sources_included_types = []
    if (entity === 'JournalisticBrand'){
        sources_included_types.push('NewsSource')
    } else {
        if (entity === 'Archive') {
            sources_included_types = ['NewsSource', 'Government', 'Parliament', 'PoliticalParty', 'Organization']
        } else {
            sources_included_types = ['NewsSource', 'Government', 'Parliament', 'PoliticalParty', 'Organization', 'Person']
        }
    }
    let materials_types = ['LearningMaterial']
    let initial_source_types = ['Dataset']
    let related_publications_types = ['ScientificPublication']
    let publishes_types = ['NewsSource']
    let owns_types = ['Organization']
    let subnational_async_types = ['Subnational']
    let dataset_types = ['Dataset']
    let designed_for_types = ['Channel', 'PoliticalParty', 'Organization', 'Government', 'Parliament', 'Person']
    let relatedns_types = ['NewsSource']

    // *** all *** (A6, B5, C1, T4, D4, E4, F3)
    const show_name = ["Collection", "Archive", "Dataset", "JournalisticBrand", "Parliament", "Organization", "Government", "LearningMaterial", "PoliticalParty", "Tool", "NewsSource", "Person", "Author"]
    const show_alternates = ["Collection", "Archive", "Dataset", "JournalisticBrand", "Parliament", "Organization", "Government", "LearningMaterial", "PoliticalParty", "Tool", "NewsSource", "Person"]
    const show_description = ["Collection", "Archive", "Dataset", "JournalisticBrand", "Parliament", "Organization", "Government", "LearningMaterial", "PoliticalParty", "Tool", "ScientificPublication", "NewsSource", "Person"]
    const show_references = ["Collection"]
    const show_entries_included = ["Collection"]
    const show_languages = ["Collection", "Archive", "Dataset", "Parliament", "Government", "LearningMaterial", "Tool", "ScientificPublication", "NewsSource"]
    const show_countries = ["Collection", "Archive", "Dataset", "JournalisticBrand", "ScientificPublication", "NewsSource"]
    const show_country = ["Parliament", "Organization", "Government", "PoliticalParty", "Person"]
    const show_concept = ["Collection", "Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_modal = ["Collection", "Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_subnational_scope = ["Collection", "JournalisticBrand", "NewsSource"]
    const show_materials = ["Collection"]
    const show_tools = ["Collection", "LearningMaterial", "ScientificPublication"]
    const show_authors = ["Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_url = ["Archive", "Dataset", "Parliament", "Government", "PoliticalParty", "Tool", "ScientificPublication", "Person"]
    const show_doi = ["Archive", "Dataset", "Tool", "ScientificPublication"]
    const show_arxiv = ["Archive", "Dataset", "Tool", "ScientificPublication"]
    const show_access = ["Archive", "Dataset", "Tool"]
    const show_text_types = ["Archive", "Dataset", "LearningMaterial", "ScientificPublication"]
    const show_sources_included = ["Archive", "Dataset", "JournalisticBrand", "ScientificPublication"]
    const show_geographic = ["Archive", "Dataset", "Parliament", "Government", "ScientificPublication", "NewsSource"]
    const show_fulltext = ["Archive", "Dataset"]
    const show_text_units = ["Archive", "Dataset", "ScientificPublication"]
    const show_meta_variables = ["Archive", "Dataset"]
    const show_file_formats = ["Archive", "Dataset"]
    const show_date_published = ["Dataset", "Tool", "ScientificPublication"]
    const show_github = ["Dataset", "Tool"]
    const show_temporal_coverage_start = ["Dataset"]
    const show_temporal_coverage_end = ["Dataset"]
    const show_initial_source = ["Dataset"]
    const show_related_publications = ["Dataset"]
    const show_entry_review_status = []
    const show_wikidata_id = ["Dataset", "LearningMaterial", "PoliticalParty", "Tool", "NewsSource"]
    const show_ownership = ["Organization"]
    const show_ngo = ["Organization"]
    const show_publishes = ["Organization", "PoliticalParty", "Person"]
    const show_owns = ["Organization"]
    const show_subnational_async = ["Government"]
    const show_urls = ["LearningMaterial"]
    const show_method = ["LearningMaterial", "ScientificPublication"]
    const show_dataset = ["LearningMaterial", "ScientificPublication"]
    const show_programming = ["LearningMaterial", "Dataset"]
    const show_channels = ["LearningMaterial", "ScientificPublication"]
    const show_name_abbrev = ["PoliticalParty"]
    const show_color_hex = ["PoliticalParty"]
    const show_parlgov_id = ["PoliticalParty"]
    const show_partyfacts_id = ["PoliticalParty"]
    const show_title = ["ScientificPublication"]
    const show_openalex = ["ScientificPublication", "Author"]
    const show_paperkind = ["ScientificPublication"]
    const show_venue = ["ScientificPublication"]
    const show_version = ["Tool"]
    const show_cran = ["Tool"]
    const show_pypi = ["Tool"]
    const show_platforms = ["Tool"]
    const show_used_for = ["Tool"]
    const show_open_source = ["Tool"]
    const show_license = ["Tool"]
    const show_gui = ["Tool"]
    const show_designed_for = ["Tool"]
    const show_language_independent = ["Tool"]
    const show_iff = ["Tool"]
    const show_off = ["Tool"]
    const show_author_validated = ["Tool"]
    const show_defunct = ["Tool", "NewsSource"]
    const show_validation_dataset = ["Tool"]
    const show_transcript = ["NewsSource"]
    const show_channel = ["NewsSource"]
    const show_website_allows_comments = ["NewsSource"]
    const show_website_comments_reg = ["NewsSource"]
    const show_date_founded = ["NewsSource"]
    const show_pubkind = ["NewsSource"]
    const show_special_interest = ["NewsSource"]
    const show_topical = ["NewsSource"]
    const show_pubcycle = ["NewsSource"]
    const show_pubcycleweekly = ["NewsSource"]
    const show_paymod = ["NewsSource"]
    const show_ads = ["NewsSource"]
    const show_audsizerecent = ["NewsSource"]
    const show_audsize = ["NewsSource"]
    const show_epaper = ["NewsSource"]
    const show_party = ["NewsSource"]
    const show_relatedns = ["NewsSource"]
    const show_doc = ["Dataset", "Tool"]
    const show_is_politician = ["Person"]
    const show_magic = ["Tool", "Dataset", "ScientificPublication", "NewsSource", "Organization", "PoliticalParty", "Government", "Parliament", "Person", "Archive", "Author", "Language", "ProgrammingLanguage", "FileFormat", "LearningMaterial"]


    // ************** Setup Select boxes & initial JSON ****************

    let setupSelectVars = (i, j, predicate, empty=false, toStr=false, setFunc = null) => {
        predicate = apiField[predicate]
        let ary = []
        if (empty){
            i[predicate]?.forEach(e => {
                if (toStr){
                    ary.push(e.toString())
                } else {
                    ary.push(e)
                }
            })
        } else {
            i[predicate]?.forEach(e => {
                ary.push(e.uid)
            })
        }
        if (ary.length > 0) {
            j[predicate] = ary
            if (setFunc){
                setFunc(ary)
            }
        }
    }

    //console.log(doc)


    // ************* Update Initial JSON ****************

    const setSearchEnum = (i, j, predicate, enumList, setSearchEnum) => {
        if (i[apiField[predicate]]) {
            j[apiField[predicate]] = i[apiField[predicate]]
            let lab = ''
            for (var b of enumList) {
                if (b[0] === i[apiField[predicate]]) {
                    lab = b[1];
                }
            }
            setSearchEnum({'value': i[apiField[predicate]], 'label': lab})
        }
    }

    const setSearchEnumMulti = (i, j, predicate, setSearchEnum, enumList, toStr = false) => {
        /*

        arguments
            toStr (boolean)
                set to true if values stored in db as integers
        */

        if (i[apiField[predicate]]) {
            let opts = []
            for (var b of enumList) {
                for (var c of i[apiField[predicate]]) {
                    if (toStr) {
                        if (b[0] === c.toString()) {
                            opts.push({value: b[0], label: b[1]})
                        }
                    } else {
                        if (b[0] === c) {
                            opts.push({value: b[0], label: b[1]})
                        }
                    }
                }
            }
            setSearchEnum(opts)
        }
        setupSelectVars(i, j, predicate, true, toStr)
    }

    let updateInitialJSON = (i) => {

        // *** List *** (B6)
        // languages
        fetchData('schema/predicate/counts/', 'languages', 1, true, i)

        // countries
        fetchData('schema/predicate/counts/', 'countries', 1, true, i)

        // concept
        fetchData('schema/predicate/counts/', 'concept', 1, true, i)

        // modal
        fetchData('schema/predicate/', 'modal', 1, true, i, true)

        // subnational scope
        fetchData('schema/predicate/counts/', 'subnational_scope', 1, true, i)

        // text types
        fetchData('schema/predicate/counts/', 'text_types', 1, true, i)

        // text units
        fetchData('schema/predicate/counts/', 'text_units', 1, true, i)

        // meta variables
        fetchData('schema/predicate/counts/', 'meta_variables', 1, true, i)

        // file formats
        fetchData('schema/predicate/', 'file_formats', 1, true, i, true)

        // country
        fetchData('schema/predicate/counts/', 'country', 1, true, i, false, true)

        // method
        fetchData('schema/predicate/', 'method', 1, true, i, true)

        // programming
        fetchData('schema/predicate/', 'programming_languages', 1, true, i, true)

        // channels
        fetchData('schema/predicate/', 'channels', 1, true, i, true)

        // Used for
        fetchData('schema/predicate/', 'used_for', 1, true, i, true)

        // Input ff
        fetchData('schema/predicate/', 'iff', 1, true, i, true)

        // Ouput ff
        fetchData('schema/predicate/', 'off', 1, true, i, true)

        // validation_dataset
        fetchData('schema/predicate/', 'validation_dataset', 1, true, i, true)

        // channel
        fetchData('schema/predicate/counts/', 'channel', 1, true, i, false, true)


        if (i) {
            //console.log(i)
            let j = {}

            //set dgraph type
            setEntity(getDgraph(i))

            // add entry name
            j[apiField['name']] = i[apiField['name']]
            setEntryName(i[apiField['name']])


            // *** add other fields ***

            // *** Text *** (T3)

            // description
            checkTextField(i,j,'description', setDescription)

            // doi
            checkTextField(i,j,'doi', setDoi)

            // arxiv
            checkTextField(i,j,'arxiv', setArxiv)

            // url
            checkTextField(i,j,'url', setUrl)

            // github
            checkTextField(i,j,'github', setGithub)

            // date_published
            if (i[apiField['date_published']]) {
                let d = retDateYear(i[apiField['date_published']], true)
                j[apiField['date_published']] = d
                setDatePublished(d)
            }

            // temporal_coverage_start
            checkTextField(i,j,'temporal_coverage_start')

            // temporal_coverage_end
            checkTextField(i,j,'temporal_coverage_end')

            // wikidata_id
            checkTextField(i,j,'wikidata_id')

            // name_abbrev
            checkTextField(i,j,'name_abbrev')

            // color_hex
            checkTextField(i,j,'color_hex')

            // parlgov_id
            checkTextField(i,j,'parlgov_id')

            // partyfacts_id
            checkTextField(i,j,'partyfacts_id')

            // title
            checkTextField(i,j,'title', setTitle)

            // openalex
            checkTextField(i,j,'openalex', setOpenalex)

            // venue
            checkTextField(i,j,'venue', setVenue)

            // version
            checkTextField(i,j,'version', setVersion)

            // cran
            checkTextField(i,j,'cran', setCran)

            // pypi
            checkTextField(i,j,'pypi', setPypi)

            // license
            checkTextField(i,j,'license', setLicense)

            // date_founded
            if (i[apiField['date_founded']]) {
                j[apiField['date_founded']] = retDateYear(i[apiField['date_founded']], true)
            }

            // audience size recent
            checkTextField(i,j,'audience_size_recent', setAudSizeRecent)

            // audience size recent count
            checkTextField(i,j,'audience_size_recent_count', setAudSizeRecentCount)

            // audience size recent unit
            checkTextField(i,j,'audience_size_recent_unit', setAudSizeRecentUnit)

            // audience size recent data
            checkTextField(i,j,'audience_size_recent_data', setAudSizeRecentData)

            // audience size
            checkTextField(i,j,'audience_size', setAudSize)

            // audience size count
            checkTextField(i,j,'audience_size_count', setAudSizeCount)

            // audience size unit
            checkTextField(i,j,'audience_size_unit', setAudSizeUnit)

            // audience size data
            checkTextField(i,j,'audience_size_data_from', setAudSizeData)

            // *** Async *** (A7)

            // entries included
            setupSelectVars(i, j, 'entries_included')
            setSearchEntriesIncluded(i[apiField['entries_included']])
            setEntriesIncludedDetails(i[apiField['entries_included']])

            // tools
            setupSelectVars(i, j, 'tools')
            setSearchTools(i[apiField['tools']])
            setToolsDetails(i[apiField['tools']])

            // references
            setupSelectVars(i, j, 'references')
            setSearchReferences(i[apiField['references']])
            setReferencesDetails(i[apiField['references']])

            // authors
            setupSelectVars(i, j, 'authors')
            setSearchAuthors(i[apiField['authors']])
            setAuthorsDetails(i[apiField['authors']])

            // sources included
            setupSelectVars(i, j, 'sources_included')
            setSearchSourcesIncluded(i[apiField['sources_included']])
            setSourcesIncludedDetails(i[apiField['sources_included']])

            // learning materials
            setupSelectVars(i, j, 'materials')
            setSearchMaterials(i[apiField['materials']])
            setMaterialsDetails(i[apiField['materials']])

            // initial source
            setupSelectVars(i, j, 'initial_source')
            setSearchInitialSource(i[apiField['initial_source']])
            setInitialSourceDetails(i[apiField['initial_source']])

            // related publication
            setupSelectVars(i, j, 'related_publication')
            setSearchRelatedPublications(i[apiField['related_publication']])
            setRelatedPublicationsDetails(i[apiField['related_publication']])

            // publishes
            setupSelectVars(i, j, 'publishes')
            setSearchPublishes(i[apiField['publishes']])
            setPublishesDetails(i[apiField['publishes']])

            // owns
            setupSelectVars(i, j, 'owns')
            setSearchOwns(i[apiField['owns']])
            setOwnsDetails(i[apiField['owns']])

            // subnational async
            if (i[apiField['subnational_async']]) {
                j[apiField['subnational_async']] = i[apiField['subnational_async']]['uid']
            }
            setSearchSubnationalAsync(i[apiField['subnational_async']])
            setSubnationalAsyncDetails(i[apiField['subnational_async']])

            // dataset
            setupSelectVars(i, j, 'dataset')
            setSearchDataset(i[apiField['dataset']])
            setDatasetDetails(i[apiField['dataset']])

            // designed for
            setupSelectVars(i, j, 'designed_for')
            setSearchDesignedFor(i[apiField['designed_for']])
            setDesignedForDetails(i[apiField['designed_for']])

            // related news sources
            setupSelectVars(i, j, 'relatedns')
            setSearchRelatedns(i[apiField['relatedns']])
            setRelatednsDetails(i[apiField['relatedns']])


            // *** List *** (B7)

            // languages
            setupSelectVars(i, j, 'languages')

            // countries
            setupSelectVars(i, j, 'countries')

            // concept
            setupSelectVars(i, j, 'concept')

            // modal
            setupSelectVars(i, j, 'modal')

            // subnational scope
            setupSelectVars(i, j, 'subnational_scope')

            // text types
            setupSelectVars(i, j, 'text_types')

            // text units
            setupSelectVars(i, j, 'text_units')

            // meta variables
            setupSelectVars(i, j, 'meta_variables')

            // file formats
            setupSelectVars(i, j, 'file_formats')

            // country
            if (i[apiField['country']]) {
                j[apiField['country']] = i[apiField['country']]['uid']
            }

            // method
            setupSelectVars(i, j, 'method')

            // programming
            setupSelectVars(i, j, 'programming_languages')

            // channels
            setupSelectVars(i, j, 'channels')

            // used for
            setupSelectVars(i, j, 'used_for')

            // input ff
            setupSelectVars(i, j, 'iff')

            // output ff
            setupSelectVars(i, j, 'off')

            // validation_dataset
            setupSelectVars(i, j, 'validation_dataset')

            // channel
            if (i[apiField['channel']]) {
                j[apiField['channel']] = i[apiField['channel']]['uid']
            }


            // *** Creatable *** (D5)

            // alternates
            setupSelectVars(i, j, 'alternate_names', true)
            setSearchAlternates(setCreatable(i, 'alternate_names'))

            // urls
            setupSelectVars(i, j, 'urls', true)
            setSearchUrls(setCreatable(i, 'urls'))

            // documentation
            setupSelectVars(i, j, 'documentation', true, false, setDoc)
            setSearchDoc(setCreatable(i, 'documentation'))

            // documentation kind
            if (i[apiField['dockind']]) {
                if (dockindUpdate === 'multi') {
                    j[apiField['dockind']] = i[apiField['dockind']]
                } else {
                    j[apiField['dockind']] = i[apiField['dockind']][0]
                }
                setSearchDockind(i[apiField['dockind']])
            }

            // *** Enums *** (E5)

            setSearchEnum(i, j, 'conditions_of_access', accessList, setSearchAccess)

            setSearchEnum(i, j, 'geographic', geographicList, setSearchGeographic)

            setSearchEnum(i, j, 'entry_review_status', entryReviewStatusList, setSearchEntryReviewStatus)

            setSearchEnum(i, j, 'ownership', ownershipList, setSearchOwnership)

            setSearchEnum(i, j, 'paper_kind', paperkindList, setSearchPaperkind)

            setSearchEnum(i, j, 'open_source', openSourceList, setSearchOpenSource)

            setSearchEnum(i, j, 'author_validated', authorValidatedList, setSearchAuthorValidated)

            // platforms (multi)
            setSearchEnumMulti(i, j, 'platform', setSearchPlatforms, platformsList)

            setSearchEnum(i, j, 'transcript', transcriptList, setSearchTranscript)

            setSearchEnum(i, j, 'website_allows_comments', websiteAllowsCommentsList, setSearchWebsiteAllowsComments)

            setSearchEnum(i, j, 'website_comments_reg', websiteCommentsRegList, setSearchWebsiteCommentsReg)

            // Publication Kind (multi)
            setSearchEnumMulti(i, j, 'pubkind', setSearchPubkind, pubkindList)

            // Topical Focus (multi)
            setSearchEnumMulti(i, j, 'topical', setSearchTopical, topicalList)

            setSearchEnum(i, j, 'pubcycle', pubcycleList, setSearchPubcycle)

            setSearchEnumMulti(i, j, 'pubcycleweekly', setSearchPubcycleweekly, pubcycleweeklyList, true)

            setSearchEnum(i, j, 'paymod', paymodList, setSearchPaymod)

            setSearchEnum(i, j, 'ads', adsList, setSearchAds)

            setSearchEnum(i, j, 'epaper', epaperList, setSearchEpaper)

            setSearchEnum(i, j, 'party', partyList, setSearchParty)


            // *** Checkboxes *** (F4)
            checkTextField(i,j, 'fulltext')

            checkTextField(i,j, 'ngo')

            checkTextField(i,j, 'gui')

            checkTextField(i,j, 'language_independent')

            checkTextField(i,j, 'defunct')

            checkTextField(i,j, 'special_interest')

            checkTextField(i,j, 'is_politician')

            // add top key and update
            let d = {'data': j}
            setJson(d)
        }
    }


    // *************** options *************** (B8, E6)

    // *** specials ***

    // countries
    let multinational_options = []
    let individual_countries_options = []
    for (var c of countriesList){
        if (c["dgraph.type"][0] === 'Multinational'){
            multinational_options[multinational_options.length] = {value: c.uid, label: c.name}
        } else {
            individual_countries_options[individual_countries_options.length] = {value: c.uid, label: c.name}
        }
    }
    const countries_options = [
        {
            label: "Multinational",
            options: multinational_options
        },
        {
            label: "Country",
            options: individual_countries_options
        }
    ];

    const country_options = [
        {
            label: "Multinational",
            options: multinational_options
        },
        {
            label: "Country",
            options: individual_countries_options
        }
    ];

    // *** normals ***

    let languages_options = languagesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let concept_options = conceptList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    //console.log(modalList)
    let modal_options = modalList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let subnational_scope_options = subnationalScopeList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let text_types_options = textTypesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let text_units_options = textUnitsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let meta_variables_options = metaVariablesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let file_formats_options = []
    try {
        file_formats_options = fileFormatsList.map(function (p) {
            return {value: p.uid, label: p.name};
        })
    } catch (error) {
        console.log(error)
    } finally {

    }
    let method_options = methodList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let programming_options = programmingList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let channels_options = channelsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let used_for_options = usedForList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let iff_options = iffList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let off_options = offList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let validation_dataset_options = validationDatasetList.map(function (p) {
        return {value: p.uid, label: p.name};
    })
    let channel_options = channelsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })


    // *** enums ***

    let access_options = accessList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let geographic_options = geographicList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let entry_review_status_options = entryReviewStatusList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let ownership_options = ownershipList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let paperkind_options = paperkindList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let platforms_options = platformsList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let open_source_options = openSourceList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let author_validated_options = authorValidatedList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let transcript_options = transcriptList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let website_allows_comments_options = websiteAllowsCommentsList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let website_comments_reg_options = websiteCommentsRegList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let pubkind_options = pubkindList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let topical_options = topicalList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let pubcycle_options = pubcycleList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let pubcycleweekly_options = pubcycleweeklyList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let paymod_options = paymodList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let ads_options = adsList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let epaper_options = epaperList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let party_options = partyList.map(function (p) {
        return {value: p[0], label: p[1]};
    })

    // ************** Generic Helper Functions ****************

    // helper function to set creatable boxes
    let setCreatable = (i, predicate) => {
        let ary = []
        if (i[apiField[predicate]]) {
            for (let c of i[apiField[predicate]]) {
                ary.push({label: c, value: c})
            }
        }
        return ary
    }

    let updateJSON = (key, val) => {
        //console.log(val)
        // add key and update
        let d = json
        key = apiField[key]
        if (val || val === false){
            d['data'][key] = val
        } else {
            d['data'][key] = null
        }
        //console.log(d)
        setJson(d)
    }

    let updateJSONAS = (key, val) => {
        updateJSON(key, val)
        updateJSON('audience_size_data_from', getAudienceDataFrom())
        updateJSON('audience_size_unit', getAudienceUnit())
        updateJSON('audience_size_count', getAudienceCount())
    }

    let updateJSONAudSize = (key, val) => {
        //console.log(key, val)
        // add key and update
        let d = json
        key = apiField[key]
        //console.log(key)
        let dict = {
                "0": val
            }
        let dict_null = {
            "0": null
        }
        if (val || val === false){
            d['data'][key] = dict
        } else {
            d['data'][key] = dict_null
            delete d['data'][key]
        }
        //console.log(d)
        setJson(d)
    }

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

    // helper function for Async selectedOptions
    const getSelectedOptionsAsync = (selectedOption) => {
        let ary = []
        var sel = []
        for (var e in selectedOption){
            ary.push(selectedOption[e].uid)
            sel[sel.length] = selectedOption[e]
        }
        return [ary, sel]
    };

    // helper function for selectedOptions
    const getSelectedOptions = (selectedOption) => {
        var ary = []
        var sel = []
        for (var e in selectedOption){
            ary.push(selectedOption[e].value)
            sel[sel.length] = selectedOption[e]
        }
        return [ary, sel]
    };

    const retDateYear = (d, str=false) => {
        if (d) {
            let dt = d.substring(0, 4);
            if (!str){
                dt = parseInt(dt)
            }
            return dt
        }
    }

    const checkTextField = (i, j, predicate, setFunc = null) => {
        if (i[apiField[predicate]]) {
            j[apiField[predicate]] = i[apiField[predicate]]
            if (setFunc){
                setFunc(i[apiField[predicate]])
            }
        }
    }

    const getReq = (predicate) => {

        let req = false
        if (schema && schema.required && schema.required.includes(predicate)){
            req = true
        }
        return req
    }

    const getFieldName = (fn, v) => {
        return fn + '_' + v
    }

    const getDockindFieldValue = (d) => {
        let p = 0
        for (var r of doc) {
            if (d === r){
                if (item[apiField['dockind']]) {
                    return item[apiField['dockind']][p]
                }
            }
            p++;
        }
    }

    const setMagicEnumSingle = (predicate, data) => {
        if(data) {
            let lab = ''
            for (var b of magicEnumSingle[predicate][0]) {
                //console.log(b, data)
                if (Array.isArray(data)){
                    if (b[0] === data[0]) {
                        lab = b[1];
                        //console.log(lab)
                        updateJSON(predicate, data[0])
                        magicEnumSingle[predicate][1]({'value': data[0], 'label': lab})
                        break;
                    }
                } else {
                    if (b[0] === data) {
                        lab = b[1];
                        //console.log(lab)
                        updateJSON(predicate, data)
                        magicEnumSingle[predicate][1]({'value': data, 'label': lab})
                        break;
                    }
                }
            }


        }
    }

    const setMagicEnumMultiple = (predicate, data) => {
        if(data) {
            let sel = []
            let j = []
            for (var a of data) {
                for (var b of magicEnumMultiple[predicate][0]) {
                    //console.log(b)
                    if (b[0] === a) {
                        //console.log(lab)
                        sel.push({'value': a, 'label': b[1]})
                        j.push(a)
                        break;
                    }
                }
            }
            magicEnumMultiple[predicate][1](sel)
            updateJSON(predicate, j)
        }
    }

    const setMagicSelectMultiple = (predicate, data) => {
        if(data) {
            let sel = []
            let j = []
            if (Array.isArray(data)) {
                for (var a of data) {
                    if (magicSelectMultiple[predicate][1]) {
                        for (var b of magicSelectMultiple[predicate][1]) {
                            if (b.uid === a) {
                                sel.push({'value': b.uid, 'label': b.name})
                                j.push(b.uid)
                            } else {
                                if ((b.name).toLowerCase() === a) {
                                    sel.push({'value': b.uid, 'label': b.name})
                                    j.push(b.uid)
                                }
                            }
                        }
                    } else {
                        if (a.uid) {
                            sel.push(a)
                            j.push(a.uid)
                        } else {
                            if (predicate === 'authors' && a.openalex){
                                sel.push({'uid': a.openalex[0], 'name': a.name})
                                j.push(a.openalex[0])
                            }
                        }
                    }
                }
                magicSelectMultiple[predicate][0](sel)
                updateJSON(predicate, j)
            }
        }
    }

    const setMagicCreatable = (predicate, data) => {
        if(data) {
            let sel = []
            let j = []
            if (Array.isArray(data)){
                for (var a of data) {
                    //console.log(a)
                    sel.push({ label: a, value: a})
                    j.push(a)
                }
                magicCreatable[predicate](sel)
            } else {
                j.push(data)
                magicCreatable[predicate]({ label: data, value: data})
            }
            updateJSON(predicate, j)
        }
    }

    // magic form
    const magicForm = (data) => {
        let keys = Object.keys(data)
        for (var predicate of keys){
            //console.log(predicate, ':', data[predicate])
            if (magicText[predicate]){
                if(data[predicate]) {
                    let dat = null
                    if (predicate === 'audience_size'){
                        dat = retDateYear(data[predicate])
                        updateJSON(predicate, dat)
                        //magicText[predicate](dat)
                        setAudSize(dat + '-01-01T00:00:00+00:00')
                    } else {
                        dat = data[predicate]

                        if (predicate === 'audience_size|unit' ||  predicate === 'audience_size|count' ||  predicate === 'audience_size|data_from'){
                            if (predicate === 'audience_size|unit'){
                                updateJSON('audience_size_unit', dat)
                                setAudSizeUnit(dat)
                            }
                            if (predicate === 'audience_size|count'){
                                updateJSON('audience_size_count', dat)
                                setAudSizeCount(dat)
                            }
                            if (predicate === 'audience_size|data_from'){
                                updateJSON('audience_size_data_from', dat)
                                setAudSizeData(dat)
                            }

                        } else {
                            updateJSON(predicate, dat)
                            magicText[predicate](dat)
                        }
                    }
                }
            }
            if (magicEnumSingle[predicate]){
                setMagicEnumSingle(predicate, data[predicate])
            }
            if (magicEnumMultiple[predicate]){
                setMagicEnumMultiple(predicate, data[predicate])
            }
            if (magicSelectMultiple[predicate]){
                setMagicSelectMultiple(predicate, data[predicate])
            }
            if (magicCreatable[predicate]){
                setMagicCreatable(predicate, data[predicate])
            }
        }
    }

    let getAudienceDataFrom = () => {
        if (item) {
            try {
                if (item['audience_size|data_from']) {
                    return item['audience_size|data_from']["0"]
                }
            } catch (error) {
                console.log(error)
                return ''
            } finally {

            }
        }
    }

    let getAudienceUnit = () => {
        if (item){
            try {
                return item['audience_size|unit']["0"]
            } catch (error) {
                console.log(error)
                return ''
            } finally {

            }
        }
    }

    let getAudienceCount = () => {
        if (item) {
            try {
                if (item['audience_size|count']) {
                    return item['audience_size|count']["0"]
                }
            } catch (error) {
                console.log(error)
                return ''
            } finally {

            }
        }
    }



    // *************** RENDER ************** (A8, B9, T5, D6, E7, F5)

    return (
        <>
            {loggedIn && (
                <>
                    <h1>{uid ? 'Edit' : 'Add'} {entity}</h1>
                    <div className={'addrow'}>
                        <div className={checkDisplay(show_magic) ? 'addcol1' : 'addcol'}>

                            <form id="addEntry" onSubmit={handleSubmitAE}>

                                {checkDisplay(show_name) &&
                                <div className='add_entry'>
                                    <h4><TypeDescription dgraphType={entity} fieldName={apiField['name']}/></h4>
                                    <SearchTextField
                                        onBlurEvent={updateJSON}
                                        fieldName={'name'}
                                        fieldValue={entryName}
                                        rows='0'
                                        req={getReq(apiField['name'])}
                                    />
                                </div>
                                }

                                {checkDisplay(show_is_politician) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['is_politician']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickIsPolitician}
                                            name={'is_politician'}
                                            val={true}
                                            chk={item?.is_politician}
                                            req={getReq(apiField['is_politician'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_channel) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['channel']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeChannel}
                                            searchOptions={channel_options}
                                            searchValues={searchChannel}
                                            multi={false}
                                            req={getReq(apiField['channel'])}
                                            width="100%"
                                            isDisabled={item ? true : false}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_title) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['title']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'title'}
                                            fieldValue={title}
                                            req={getReq(apiField['title'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_alternates) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['alternate_names']}/></h4>
                                        <CreatableSelectBox
                                            handleChangeEntity={handleChangeAlternates}
                                            searchValues={searchAlternates}
                                            req={getReq(apiField['alternate_names'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_description) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['description']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'description'}
                                            fieldValue={description}
                                            rows="3"
                                            req={getReq(apiField['description'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_transcript) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['transcript']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeTranscript}
                                            searchOptions={transcript_options}
                                            searchValues={searchTranscript}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['transcript'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_website_allows_comments) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['website_allows_comments']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeWebsiteAllowsComments}
                                            searchOptions={website_allows_comments_options}
                                            searchValues={searchWebsiteAllowsComments}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['website_allows_comments'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_website_comments_reg) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['website_comments_reg']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeWebsiteCommentsReg}
                                            searchOptions={website_comments_reg_options}
                                            searchValues={searchWebsiteCommentsReg}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['website_comments_reg'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_name_abbrev) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['name_abbrev']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'name_abbrev'}
                                            fieldValue={item?.name_abbrev}
                                            req={getReq(apiField['name_abbrev'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_parlgov_id) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['parlgov_id']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'parlgov_id'}
                                            fieldValue={item?.parlgov_id}
                                            req={getReq(apiField['parlgov_id'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_partyfacts_id) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['partyfacts_id']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'partyfacts_id'}
                                            fieldValue={item?.partyfacts_id}
                                            req={getReq(apiField['partyfacts_id'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_color_hex) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['color_hex']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'color_hex'}
                                            fieldValue={item?.color_hex}
                                            req={getReq(apiField['color_hex'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_urls) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['urls']}/></h4>
                                        <CreatableSelectBox
                                            handleChangeEntity={handleChangeUrls}
                                            searchValues={searchUrls}
                                            req={getReq(apiField['urls'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_ownership) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['ownership']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeOwnership}
                                            searchOptions={ownership_options}
                                            searchValues={searchOwnership}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['ownership'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_country) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['country']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeCountry}
                                            searchOptions={country_options}
                                            searchValues={searchCountry}
                                            multi={false}
                                            req={getReq(apiField['country'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_publishes) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['publishes']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangePublishes}
                                            searchValues={publishes_details}
                                            types={publishes_types}
                                            width='100%'
                                            req={getReq(apiField['publishes'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_owns) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['owns']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeOwns}
                                            searchValues={owns_details}
                                            types={owns_types}
                                            width='100%'
                                            req={getReq(apiField['owns'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_ngo) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['ngo']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickNgo}
                                            name={'ngo'}
                                            val={true}
                                            chk={item?.is_ngo}
                                            req={getReq(apiField['ngo'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_date_published) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['date_published']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'date_published'}
                                            fieldValue={datePublished}
                                            req={getReq(apiField['date_published'])}
                                            type="number"
                                            min="1500"
                                            max="2100"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_date_founded) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['date_founded']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'date_founded'}
                                            fieldValue={retDateYear(item?.date_founded)}
                                            req={getReq(apiField['date_founded'])}
                                            type="number"
                                            min="1500"
                                            max="2100"
                                        />
                                    </div>
                                }


                                {checkDisplay(show_version) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['version']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'version'}
                                            fieldValue={version}
                                            req={getReq(apiField['version'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_paperkind) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['paper_kind']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePaperkind}
                                            searchOptions={paperkind_options}
                                            searchValues={searchPaperkind}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['paper_kind'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_venue) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['venue']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'venue'}
                                            fieldValue={venue}
                                            req={getReq(apiField['venue'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_url) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['url']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'url'}
                                            fieldValue={url}
                                            //type="url"
                                            req={getReq(apiField['url'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_authors) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['authors']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeAuthors}
                                            searchValues={authors_details}
                                            types={authors_types}
                                            width='100%'
                                            req={getReq(apiField['authors'])}
                                            predicate='authors'
                                        />
                                    </div>
                                }

                                {checkDisplay(show_doi) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['doi']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'doi'}
                                            fieldValue={doi}
                                            req={getReq(apiField['doi'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_openalex) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['openalex']}  /></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'openalex'}
                                            fieldValue={openalex}
                                            req={getReq(apiField['openalex'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_arxiv) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['arxiv']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'arxiv'}
                                            fieldValue={arxiv}
                                            req={getReq(apiField['arxiv'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_cran) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['cran']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'cran'}
                                            fieldValue={cran}
                                            req={getReq(apiField['cran'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_pypi) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['pypi']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'pypi'}
                                            fieldValue={pypi}
                                            req={getReq(apiField['pypi'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_github) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['github']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'github'}
                                            fieldValue={github}
                                            label="If the dataset has a repository on GitHub you can add it here."
                                            req={getReq(apiField['github'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_platforms) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['platform']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePlatforms}
                                            searchOptions={platforms_options}
                                            searchValues={searchPlatforms}
                                            req={getReq(apiField['platform'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_pubkind) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['pubkind']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePubkind}
                                            searchOptions={pubkind_options}
                                            searchValues={searchPubkind}
                                            req={getReq(apiField['pubkind'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_special_interest) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['special_interest']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickSpecialInterest}
                                            name={'special_interest'}
                                            val={true}
                                            chk={item?.special_interest}
                                            req={getReq(apiField['special_interest'])}
                                        />
                                    </div>
                                }


                                {checkDisplay(show_topical) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['topical']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeTopical}
                                            searchOptions={topical_options}
                                            searchValues={searchTopical}
                                            req={getReq(apiField['topical'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_pubcycle) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['pubcycle']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePubcycle}
                                            searchOptions={pubcycle_options}
                                            searchValues={searchPubcycle}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['pubcycle'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_pubcycleweekly) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['pubcycleweekly']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePubcycleweekly}
                                            searchOptions={pubcycleweekly_options}
                                            searchValues={searchPubcycleweekly}
                                            width="100%"
                                            req={getReq(apiField['pubcycleweekly'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_paymod) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['paymod']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangePaymod}
                                            searchOptions={paymod_options}
                                            searchValues={searchPaymod}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['paymod'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_ads) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['ads']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeAds}
                                            searchOptions={ads_options}
                                            searchValues={searchAds}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['ads'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_audsize) && uid &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['audience_size']}/></h4>
                                        <div>
                                            Date
                                        </div>
                                        <DatePickerValue
                                            onChangeEvent={updateJSONAS}
                                            fieldName={'audience_size'}
                                            fieldValue={item?.audience_size}
                                            req={getReq(apiField['audience_size'])}
                                        />
                                        <div>
                                            <br/>Data from
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSONAudSize}
                                            fieldName={'audience_size_data_from'}
                                            fieldValue={getAudienceDataFrom()}
                                            req={false}
                                            width={'50%'}
                                        />
                                        <div>
                                            <br/>Unit
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSONAudSize}
                                            fieldName={'audience_size_unit'}
                                            fieldValue={getAudienceUnit()}
                                            req={false}
                                            width={'50%'}
                                        />
                                        <div>
                                            <br/>Count
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSONAudSize}
                                            fieldName={'audience_size_count'}
                                            fieldValue={getAudienceCount()}
                                            req={false}
                                            width={'50%'}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_audsize) && !uid &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['audience_size']}/></h4>
                                        <div>
                                            Date
                                        </div>
                                        <DatePickerValue
                                            onChangeEvent={updateJSON}
                                            fieldName={'audience_size'}
                                            fieldValue={audience_size}
                                            req={getReq(apiField['audience_size'])}
                                        />
                                        <div>
                                            <br/>Data from
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'audience_size_data_from'}
                                            fieldValue={audience_size_data_from}
                                            req={false}
                                            width={'50%'}
                                        />
                                        <div>
                                            <br/>Unit
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'audience_size_unit'}
                                            fieldValue={audience_size_unit}
                                            req={false}
                                            width={'50%'}
                                        />
                                        <div>
                                            <br/>Count
                                        </div>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'audience_size_count'}
                                            fieldValue={audience_size_count}
                                            req={false}
                                            width={'50%'}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_epaper) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['epaper']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeEpaper}
                                            searchOptions={epaper_options}
                                            searchValues={searchEpaper}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['epaper'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_party) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['party']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeParty}
                                            searchOptions={party_options}
                                            searchValues={searchParty}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['party'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_open_source) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['open_source']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeOpenSource}
                                            searchOptions={open_source_options}
                                            searchValues={searchOpenSource}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['handleChangeOpenSource'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_license) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['license']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'license'}
                                            fieldValue={license}
                                            req={getReq(apiField['license'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_used_for) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['used_for']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeUsedFor}
                                            searchOptions={used_for_options}
                                            searchValues={searchUsedFor}
                                            req={getReq(apiField['used_for'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_access) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['conditions_of_access']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeAccess}
                                            searchOptions={access_options}
                                            searchValues={searchAccess}
                                            multi={false}
                                            req={getReq(apiField['conditions_of_access'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_sources_included) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['sources_included']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeSourcesIncluded}
                                            searchValues={sources_included_details}
                                            types={sources_included_types}
                                            width='100%'
                                            req={getReq(apiField['sources_included'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_geographic) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['geographic']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeGeographic}
                                            searchOptions={geographic_options}
                                            searchValues={searchGeographic}
                                            multi={false}
                                            req={getReq(apiField['geographic'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_subnational_async) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['subnational_async']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeSubnationalAsync}
                                            searchValues={subnational_async_details}
                                            types={subnational_async_types}
                                            width='100%'
                                            single={true}
                                            req={getReq(apiField['subnational_async'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_initial_source) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['initial_source']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeInitialSource}
                                            searchValues={initial_source_details}
                                            types={initial_source_types}
                                            width='100%'
                                            req={getReq(apiField['initial_source'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_fulltext) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['fulltext']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickFulltext}
                                            name={'fulltext_available'}
                                            val={true}
                                            chk={item?.fulltext_available}
                                            req={getReq(apiField['fulltext'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_entries_included) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['entries_included']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeEntriesIncluded}
                                            searchValues={entries_included_details}
                                            types={entries_included_types}
                                            width='100%'
                                            req={getReq(apiField['entries_included'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_languages) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['languages']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeLanguages}
                                            searchOptions={languages_options}
                                            searchValues={searchLanguages}
                                            multi={true}
                                            req={getReq(apiField['languages'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_programming) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['programming_languages']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeProgramming}
                                            searchOptions={programming_options}
                                            searchValues={searchProgramming}
                                            multi={true}
                                            req={getReq(apiField['programming_languages'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_countries) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['countries']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeCountries}
                                            searchOptions={countries_options}
                                            searchValues={searchCountries}
                                            multi={true}
                                            req={getReq(apiField['countries'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_temporal_coverage_start) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['temporal_coverage_start']}/></h4>
                                        <DatePickerValue
                                            onChangeEvent={updateJSON}
                                            fieldName={'temporal_coverage_start'}
                                            fieldValue={item?.temporal_coverage_start}
                                            req={getReq(apiField['temporal_coverage_start'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_temporal_coverage_end) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['temporal_coverage_end']}/></h4>
                                        <DatePickerValue
                                            onChangeEvent={updateJSON}
                                            fieldName={'temporal_coverage_end'}
                                            fieldValue={item?.temporal_coverage_end}
                                            req={getReq(apiField['temporal_coverage_end'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_text_types) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['text_types']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeTextTypes}
                                            searchOptions={text_types_options}
                                            searchValues={searchTextTypes}
                                            multi={true}
                                            req={getReq(apiField['text_types'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_channels) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['channels']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeChannels}
                                            searchOptions={channels_options}
                                            searchValues={searchChannels}
                                            multi={true}
                                            req={getReq(apiField['channels'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_text_units) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['text_units']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeTextUnits}
                                            searchOptions={text_units_options}
                                            searchValues={searchTextUnits}
                                            multi={true}
                                            req={getReq(apiField['text_units'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_subnational_scope) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['subnational_scope']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeSubnationalScope}
                                            searchOptions={subnational_scope_options}
                                            searchValues={searchSubnationalScope}
                                            multi={true}
                                            req={getReq(apiField['subnational_scope'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_tools) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['tools']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeTools}
                                            searchValues={tools_details}
                                            types={tools_types}
                                            width='100%'
                                            req={getReq(apiField['tools'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_references) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['references']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeReferences}
                                            searchValues={references_details}
                                            types={references_types}
                                            width='100%'
                                            req={getReq(apiField['references'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_dataset) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['dataset']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeDataset}
                                            searchValues={dataset_details}
                                            types={dataset_types}
                                            width='100%'
                                            req={getReq(apiField['dataset'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_materials) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['materials']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeMaterials}
                                            searchValues={materials_details}
                                            types={materials_types}
                                            width='100%'
                                            req={getReq(apiField['materials'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_concept) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['concept']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeConcept}
                                            searchOptions={concept_options}
                                            searchValues={searchConcept}
                                            multi={true}
                                            req={getReq(apiField['concept'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_method) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['method']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeMethod}
                                            searchOptions={method_options}
                                            searchValues={searchMethod}
                                            multi={true}
                                            req={getReq(apiField['method'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_modal) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['modal']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeModal}
                                            searchOptions={modal_options}
                                            searchValues={searchModal}
                                            multi={true}
                                            req={getReq(apiField['modal'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_gui) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['gui']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickGui}
                                            name={'gui'}
                                            val={true}
                                            chk={item?.graphical_user_interface}
                                            req={getReq(apiField['gui'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_meta_variables) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['meta_variables']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeMetaVariables}
                                            searchOptions={meta_variables_options}
                                            searchValues={searchMetaVariables}
                                            multi={true}
                                            req={getReq(apiField['meta_variables'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_file_formats) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['file_formats']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeFileFormats}
                                            searchOptions={file_formats_options}
                                            searchValues={searchFileFormats}
                                            multi={true}
                                            req={getReq(apiField['file_formats'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_related_publications) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['related_publications']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeRelatedPublications}
                                            searchValues={related_publications_details}
                                            types={related_publications_types}
                                            width='100%'
                                            req={getReq(apiField['related_publications'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_entry_review_status) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['entry_review_status']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeEntryReviewStatus}
                                            searchOptions={entry_review_status_options}
                                            searchValues={searchEntryReviewStatus}
                                            multi={false}
                                            req={getReq(apiField['entry_review_status'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_designed_for) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['designed_for']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeDesignedFor}
                                            searchValues={designed_for_details}
                                            types={designed_for_types}
                                            width='100%'
                                            req={getReq(apiField['designed_for'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_language_independent) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['language_independent']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickLanguageIndependent}
                                            name={'language_independent'}
                                            val={true}
                                            chk={item?.language_independent}
                                            req={getReq(apiField['language_independent'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_iff) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['iff']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeIff}
                                            searchOptions={iff_options}
                                            searchValues={searchIff}
                                            req={getReq(apiField['iff'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_off) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['off']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeOff}
                                            searchOptions={off_options}
                                            searchValues={searchOff}
                                            req={getReq(apiField['off'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_author_validated) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['author_validated']} /></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeAuthorValidated}
                                            searchOptions={author_validated_options}
                                            searchValues={searchAuthorValidated}
                                            multi={false}
                                            width="100%"
                                            req={getReq(apiField['author_validated'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_validation_dataset) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['validation_dataset']}/></h4>
                                        <SearchSelectBox
                                            handleChangeEntity={handleChangeValidationDataset}
                                            searchOptions={validation_dataset_options}
                                            searchValues={searchValidationDataset}
                                            req={getReq(apiField['validation_dataset'])}
                                            width="100%"
                                        />
                                    </div>
                                }

                                {checkDisplay(show_defunct) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['defunct']}/></h4>
                                        <SearchCheckbox
                                            handleClick={handleClickDefunct}
                                            name={'defunct'}
                                            val={true}
                                            chk={item?.defunct}
                                            req={getReq(apiField['defunct'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_relatedns) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['relatedns']}/></h4>
                                        <AddAsyncSelectBox
                                            handleChangeEntity={handleChangeRelatedns}
                                            searchValues={relatedns_details}
                                            types={relatedns_types}
                                            width='100%'
                                            req={getReq(apiField['relatedns'])}
                                        />
                                    </div>
                                }

                                {checkDisplay(show_doc) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['documentation']}/></h4>
                                        <CreatableSelectBox
                                            handleChangeEntity={handleChangeDoc}
                                            searchValues={searchDoc}
                                            req={getReq(apiField['documentation'])}
                                            width="100%"
                                            label="Please paste the URLs to the documentation here..."

                                        />
                                    </div>
                                }

                                {checkDisplay(show_doc) && doc?.map(d => (
                                    <div className='add_entry'>
                                        <h5>
                                            Please specify what kind of resource it is:&nbsp;&nbsp;
                                            <SearchTextField
                                                onBlurEvent={handleChangeDockind}
                                                fieldName={getFieldName('dockind', d)}
                                                fieldValue={getDockindFieldValue(d)}
                                                rows='0'
                                                width={'400px'}
                                                label={'e.g. FAQ, Manual, Tutorial, Website, etc'}
                                            />
                                             &nbsp;: {d}
                                        </h5>
                                    </div>
                                ))}

                                {checkDisplay(show_wikidata_id) &&
                                    <div className='add_entry'>
                                        <h4><TypeDescription dgraphType={entity} fieldName={apiField['wikidata_id']}/></h4>
                                        <SearchTextField
                                            onBlurEvent={updateJSON}
                                            fieldName={'wikidata_id'}
                                            fieldValue={item?.wikidata_id}
                                            req={getReq(apiField['wikidata_id'])}
                                        />
                                    </div>
                                }

                                <div style={{clear:"both", "marginTop":10}}>
                                    <md-filled-button id="submitForm" type="submit">{uid ? 'Edit' : 'Add'}&nbsp;{entity}</md-filled-button>&nbsp;
                                </div>

                            </form>

                            {error &&
                                <p className={'message'}>{error}</p>
                            }

                            {process.env.NODE_ENV === "development" &&
                                <>
                                    <br/>
                                    <h4>JSON</h4>
                                    <pre>{JSON.stringify(json, null, 4)}</pre>
                                    <br /><br />
                                    <h4>Response</h4>
                                    <pre>{JSON.stringify(addResponse, null, 4)}</pre>
                                </>
                            }

                        </div>

                        {!uid && checkDisplay(show_magic) &&
                            <div className={'addcol2'}>
                                <Magic
                                    fillForm={magicForm}
                                    entity={entity}
                                />
                            </div>
                        }
                    </div>

                </>
            )}
        </>
    )

};

export default AddEntry;
