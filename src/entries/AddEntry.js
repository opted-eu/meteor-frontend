import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext";
import getLoggedIn from "../user/getLoggedIn";
import SearchAsyncSelectBox from "../forms/SearchAsyncSelectBox";
import SearchTextField from "../forms/SearchTextField";
import SearchSelectBox from "../forms/SearchSelectBox";
import CreatableSelectBox from "../forms/CreatableSelectBox";
import TypeDescription from '../components/TypeDescription';
import { useOpenAPI } from "../components/APISpecs";
import SearchCheckbox from "../forms/SearchCheckbox";
import getProfile from "../user/getProfile";
import {ProfileContext} from "../user/ProfileContext";
import DatePickerValue from "./DatePickerValue"


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
            console.log('EDIT ERROR:');
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

    let { uid } = useParams();
    const [searchParams] = useSearchParams();
    const openApi = useOpenAPI();

    // API field names lookup (A1, B1, D1, E1, F1, T1)
    let apiField = {}
    apiField['name'] = 'name'
    apiField['desc'] = 'description'
    apiField['entries_included'] = 'entries_included'
    apiField['languages'] = 'languages'
    apiField['countries'] = 'countries'
    apiField['concept'] = 'concept_variables'
    apiField['modal'] = 'modalities'
    apiField['subnational_scope'] = 'subnational_scope'
    apiField['materials'] = 'materials'
    apiField['tools'] = 'tools'
    apiField['references'] = 'references'
    apiField['alternates'] = 'alternate_names'
    apiField['url'] = 'url'
    apiField['authors'] = 'authors'
    apiField['doi'] = 'doi'
    apiField['arxiv'] = 'arxiv'
    apiField['access'] = 'conditions_of_access'
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
    apiField['programming'] = 'programming_languages'
    apiField['channels'] = 'channels'
    apiField['name_abbrev'] = 'name_abbrev'
    apiField['color_hex'] = 'color_hex'
    apiField['parlgov_id'] = 'parlgov_id'
    apiField['partyfacts_id'] = 'partyfacts_id'

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

    // Creatable (D2)
    // Alternates
    const [searchAlternates, setSearchAlternates] = useState();
    // Urls
    const [searchUrls, setSearchUrls] = useState();

    // Enum (E2)
    // Access
    const [accessList, setAccessList] = useState([['NA', 'NA / Unknown'], ['free', 'Free'], ['registration', 'Registration Required'], ['request', 'Upon Request'], ['purchase', 'Purchase']])
    const [searchAccess, setSearchAccess] = useState();

    // Geographic
    const [geographicList, setGeographicList] = useState([['multinational', 'Multinational'], ['national', 'National'], ['subnational', 'Subnational']])
    const [searchGeographic, setSearchGeographic] = useState();

    // Geographic
    const [entryReviewStatusList, setEntryReviewStatusList] = useState([['draft', 'Draft'], ['pending', 'Pending'], ['accepted', 'Accepted'], ['rejected', 'Rejected']])
    const [searchEntryReviewStatus, setSearchEntryReviewStatus] = useState();

    // Ownership
    const [ownershipList, setOwnershipList] = useState([['NA', 'Don\'t know / NA'], ['private ownership', 'Mainly private Ownership'], ['public ownership', 'Mainly public ownership'], ['unknown', 'Unknown Ownership']])
    const [searchOwnership, setSearchOwnership] = useState();

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
            case 'programming':
                setProgrammingList(data);
                setSearchProgramming(s);
                break;
            case 'channels':
                setChannelsList(data);
                setSearchChannels(s);
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
                    if (predicate){
                        d = predicate
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                ary.push({name: n, uid: res.uid, type: d})
            }
            //console.log(ary)
        })
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
    let authors_details = createSearchDetails(searchAuthors, authorsDetails, 'Author')
    let sources_included_details = createSearchDetails(searchSourcesIncluded, sourcesIncludedDetails)
    let materials_details = createSearchDetails(searchMaterials, materialsDetails)
    let initial_source_details = createSearchDetails(searchInitialSource, initialSourceDetails)
    let related_publications_details = createSearchDetails(searchRelatedPublications, relatedPublicationsDetails)
    let publishes_details = createSearchDetails(searchPublishes, publishesDetails)
    let owns_details = createSearchDetails(searchOwns, ownsDetails)
    let subnational_async_details = createSearchDetailsSingle(searchSubnationalAsync, subnationalAsyncDetails)
    let dataset_details = createSearchDetails(searchDataset, datasetDetails)

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
        updateJSON('programming', sel[0])
    };
    const handleChangeChannels = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchChannels(sel[1])
        updateJSON('channels', sel[0])
    };

    // *** creatable *** (D3)

    const handleChangeAlternates = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchAlternates(sel[1])
        updateJSON('alternates', sel[0])
    };

    const handleChangeUrls = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchUrls(sel[1])
        updateJSON('urls', sel[0])
    };

    // *** enums *** (E3)

    const handleChangeAccess = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)[1]
        setSearchAccess({'value': sel[0], 'label': sel[1]})
        updateJSON('access', sel[0])
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

    // ************** Submit ****************

    const handleSubmitAE = async e => {
        e.preventDefault();
        if (1===1) {
            let resp = null
            if (uid) {
                //edit
                console.log('Editing record')
                console.log(uid)
                console.log(json)
                resp = await editRecord(
                    uid,
                    json,
                    token
                );
            } else {
                //add
                console.log('Adding record')
                console.log(json)
                resp = await addRecord(
                    entity,
                    json,
                    token
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
                    //navigate('/detail/' + resp.uid)
                } else {
                    setError(resp.message)
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
        sources_included_types = ['NewsSource', 'Government', 'Parliament', 'PoliticalParty', 'Organization']
    }
    let materials_types = ['LearningMaterial']
    let initial_source_types = ['Dataset']
    let related_publications_types = ['ScientificPublication']
    let publishes_types = ['NewsSource']
    let owns_types = ['Organization']
    let subnational_async_types = ['Subnational']
    let dataset_types = ['Dataset']

    // *** all *** (A6, B5, C1, T2, D4, E4, F3)
    const show_alternates = ["Collection", "Archive", "Dataset", "JournalisticBrand", "Parliament", "Organization", "Government", "LearningMaterial", "PoliticalParty", "Tool"]
    const show_description = ["Collection", "Archive", "Dataset", "JournalisticBrand", "Parliament", "Organization", "Government", "LearningMaterial", "PoliticalParty", "Tool", "ScientificPublication"]
    const show_references = ["Collection"]
    const show_entries_included = ["Collection"]
    const show_languages = ["Collection", "Archive", "Dataset", "Parliament", "Government", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_countries = ["Collection", "Archive", "Dataset", "JournalisticBrand", "ScientificPublication"]
    const show_country = ["Parliament", "Organization", "Government", "PoliticalParty"]
    const show_concept = ["Collection", "Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_modal = ["Collection", "Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_subnational_scope = ["Collection", "JournalisticBrand"]
    const show_materials = ["Collection", "Tool"]
    const show_tools = ["Collection", "LearningMaterial", "ScientificPublication"]
    const show_authors = ["Archive", "Dataset", "LearningMaterial", "Tool", "ScientificPublication"]
    const show_url = ["Archive", "Dataset", "Parliament", "Government", "PoliticalParty", "Tool", "ScientificPublication"]
    const show_doi = ["Archive", "Dataset", "Tool", "ScientificPublication"]
    const show_arxiv = ["Archive", "Dataset", "Tool", "ScientificPublication"]
    const show_access = ["Archive", "Dataset", "Tool"]
    const show_text_types = ["Archive", "Dataset", "LearningMaterial", "ScientificPublication"]
    const show_sources_included = ["Archive", "Dataset", "JournalisticBrand", "ScientificPublication"]
    const show_geographic = ["Archive", "Dataset", "Parliament", "Government", "ScientificPublication"]
    const show_fulltext = ["Archive", "Dataset"]
    const show_text_units = ["Archive", "Dataset", "ScientificPublication"]
    const show_meta_variables = ["Archive", "Dataset"]
    const show_file_formats = ["Archive", "Dataset", "Tool"]
    const show_date_published = ["Dataset", "Tool", "ScientificPublication"]
    const show_github = ["Dataset", "Tool"]
    const show_temporal_coverage_start = ["Dataset"]
    const show_temporal_coverage_end = ["Dataset"]
    const show_initial_source = ["Dataset"]
    const show_related_publications = ["Dataset"]
    const show_entry_review_status = ["Dataset"]
    const show_wikidata_id = ["Dataset", "LearningMaterial", "PoliticalParty"]
    const show_ownership = ["Organization"]
    const show_ngo = ["Organization"]
    const show_publishes = ["Organization", "PoliticalParty"]
    const show_owns = ["Organization"]
    const show_subnational_async = ["Government"]
    const show_urls = ["LearningMaterial"]
    const show_method = ["LearningMaterial", "ScientificPublication"]
    const show_dataset = ["LearningMaterial", "ScientificPublication"]
    const show_programming = ["LearningMaterial"]
    const show_channels = ["LearningMaterial", "ScientificPublication"]
    const show_name_abbrev = ["PoliticalParty"]
    const show_color_hex = ["PoliticalParty"]
    const show_parlgov_id = ["PoliticalParty"]
    const show_partyfacts_id = ["PoliticalParty"]

    // ************** Setup Select boxes & initial JSON ****************

    let setupSelectVars = (i, j, predicate, empty=false) => {
        predicate = apiField[predicate]
        let ary = []
        if (empty){
            i[predicate]?.forEach(e => {
                ary.push(e)
            })
        } else {
            i[predicate]?.forEach(e => {
                ary.push(e.uid)
            })
        }
        if (ary.length > 0) {
            j[predicate] = ary
        }
    }


    // ************* Update Initial JSON ****************

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
        fetchData('schema/predicate/', 'programming', 1, true, i, true)

        // channels
        fetchData('schema/predicate/', 'channels', 1, true, i, true)

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
            checkTextField(i,j,'desc')

            // doi
            checkTextField(i,j,'doi')

            // arxiv
            checkTextField(i,j,'arxiv')

            // url
            checkTextField(i,j,'url')

            // github
            checkTextField(i,j,'github')

            // date_published
            if (i[apiField['date_published']]) {
                j[apiField['date_published']] = retDateYear(i[apiField['date_published']], true)
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
            setupSelectVars(i, j, 'programming')

            // channels
            setupSelectVars(i, j, 'channels')

            // *** Creatable *** (D5)

            // alternates
            setupSelectVars(i, j, 'alternates', true)
            setSearchAlternates(setCreatable(i, 'alternates'))

            // urls
            setupSelectVars(i, j, 'urls', true)
            setSearchUrls(setCreatable(i, 'urls'))

            // *** Enums *** (E5)

            // access
            if (i[apiField['access']]) {
                j[apiField['access']] = i[apiField['access']]
                let access_lab = ''
                for (var a of accessList) {
                    if (a[0] === i[apiField['access']]) {
                        access_lab = a[1];
                    }
                }
                setSearchAccess({'value': i[apiField['access']], 'label': access_lab})
            }

            // geographic
            if (i[apiField['geographic']]) {
                j[apiField['geographic']] = i[apiField['geographic']]
                let geographic_lab = ''
                for (var b of geographicList) {
                    if (b[0] === i[apiField['geographic']]) {
                        geographic_lab = b[1];
                    }
                }
                setSearchGeographic({'value': i[apiField['geographic']], 'label': geographic_lab})
            }

            // entry review status
            j[apiField['entry_review_status']] = i[apiField['entry_review_status']]
            let entry_review_status_lab = ''
            for (var c of entryReviewStatusList){
                if (c[0] === i[apiField['entry_review_status']]){
                    entry_review_status_lab = c[1];
                }
            }
            setSearchEntryReviewStatus({'value': i[apiField['entry_review_status']], 'label': entry_review_status_lab})

            // ownership
            if (i[apiField['ownership']]) {
                j[apiField['ownership']] = i[apiField['ownership']]
                let ownership_lab = ''
                for (var b of ownershipList) {
                    if (b[0] === i[apiField['ownership']]) {
                        ownership_lab = b[1];
                    }
                }
                setSearchOwnership({'value': i[apiField['ownership']], 'label': ownership_lab})
            }

            // *** Checkboxes *** (F4)
            checkTextField(i,j, 'fulltext')

            checkTextField(i,j, 'ngo')

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
        // add key and update
        let d = json
        key = apiField[key]
        if (val || val === false){
            d['data'][key] = val
        } else {
            delete d['data'][key]
        }
        console.log(d)
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

    const checkTextField = (i, j, predicate) => {
        if (i[apiField[predicate]]) {
            j[apiField[predicate]] = i[apiField[predicate]]
        }
    }

    const createAltText = (str1, str2) => {
        if (str2){
            return str1 + entity + str2
        } else {
            return str1 + entity + '?'
        }
    }


    // *************** RENDER ************** (A8, B9, T4, D6, E7)

    return (
        <>
            {loggedIn && (
                <>
                    <h1>{uid ? 'Edit' : 'Add'} {entity}</h1>

                    <form id="addEntry" onSubmit={handleSubmitAE}>

                        <div className='add_entry'>
                            <h4><TypeDescription dgraphType={entity} fieldName={apiField['name']}/></h4>
                            <SearchTextField
                                onBlurEvent={updateJSON}
                                fieldName={'name'}
                                fieldValue={entryName}
                                rows='0'
                                req={true}
                            />
                        </div>

                        {checkDisplay(show_alternates) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['alternates']}/></h4>
                                <CreatableSelectBox
                                    handleChangeEntity={handleChangeAlternates}
                                    searchValues={searchAlternates}
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_description) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['desc']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'desc'}
                                    fieldValue={item?.description}
                                    rows="3"
                                    req={false}
                                />
                            </div>
                        }

                        {checkDisplay(show_doi) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['doi']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'doi'}
                                    fieldValue={item?.doi}
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
                                />
                            </div>
                        }

                        {checkDisplay(show_urls) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['urls']}/></h4>
                                <CreatableSelectBox
                                    handleChangeEntity={handleChangeUrls}
                                    searchValues={searchUrls}
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_ownership) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['ownership']} altText={createAltText('Is the ', ' mainly privately owned or publicly owned')} /></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeOwnership}
                                    searchOptions={ownership_options}
                                    searchValues={searchOwnership}
                                    multi={false}
                                    width="100%"
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
                                    req={true}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_publishes) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['publishes']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangePublishes}
                                    searchValues={publishes_details}
                                    types={publishes_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_owns) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['owns']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeOwns}
                                    searchValues={owns_details}
                                    types={owns_types}
                                    width='100%'
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
                                />
                            </div>
                        }

                        {checkDisplay(show_date_published) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['date_published']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'date_published'}
                                    fieldValue={retDateYear(item?.date_published)}
                                    req={false}
                                    type="number"
                                    min="1500"
                                    max="2100"
                                />
                            </div>
                        }

                        {checkDisplay(show_url) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['url']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'url'}
                                    fieldValue={item?.url}
                                    type="url"
                                />
                            </div>
                        }

                        {checkDisplay(show_authors) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['authors']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeAuthors}
                                    searchValues={authors_details}
                                    types={authors_types}
                                    width='100%'
                                    req={true}
                                />
                            </div>
                        }

                        {checkDisplay(show_doi) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['doi']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'doi'}
                                    fieldValue={item?.doi}
                                />
                            </div>
                        }

                        {checkDisplay(show_arxiv) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['arxiv']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'arxiv'}
                                    fieldValue={item?.arxiv}
                                />
                            </div>
                        }

                        {checkDisplay(show_github) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['github']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'github'}
                                    fieldValue={item?.github}
                                    label="If the dataset has a repository on Github you can add it here."
                                />
                            </div>
                        }

                        {checkDisplay(show_access) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['access']} altText={createAltText('How can the user access the ')}/></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeAccess}
                                    searchOptions={access_options}
                                    searchValues={searchAccess}
                                    multi={false}
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_sources_included) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['sources_included']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeSourcesIncluded}
                                    searchValues={sources_included_details}
                                    types={sources_included_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_geographic) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['geographic']} altText={createAltText('What is the geographic scope of the ')}/></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeGeographic}
                                    searchOptions={geographic_options}
                                    searchValues={searchGeographic}
                                    multi={false}
                                    req={true}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_subnational_async) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['subnational_async']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeSubnationalAsync}
                                    searchValues={subnational_async_details}
                                    types={subnational_async_types}
                                    width='100%'
                                    single={true}
                                />
                            </div>
                        }

                        {checkDisplay(show_initial_source) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['initial_source']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeInitialSource}
                                    searchValues={initial_source_details}
                                    types={initial_source_types}
                                    width='100%'
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
                                />
                            </div>
                        }

                        {checkDisplay(show_entries_included) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['entries_included']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeEntriesIncluded}
                                    searchValues={entries_included_details}
                                    types={entries_included_types}
                                    width='100%'
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
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_programming) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['programming']}/></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeProgramming}
                                    searchOptions={programming_options}
                                    searchValues={searchProgramming}
                                    multi={true}
                                    req={false}
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
                                    req={false}
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
                                    req={false}
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
                                    req={false}
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
                                    req={false}
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
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_tools) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['tools']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeTools}
                                    searchValues={tools_details}
                                    types={tools_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_references) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['references']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeReferences}
                                    searchValues={references_details}
                                    types={references_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_dataset) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['dataset']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeDataset}
                                    searchValues={dataset_details}
                                    types={dataset_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_materials) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['materials']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeMaterials}
                                    searchValues={materials_details}
                                    types={materials_types}
                                    width='100%'
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
                                    req={false}
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
                                    req={false}
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
                                    req={false}
                                    width="100%"
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
                                    req={false}
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
                                    req={false}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_related_publications) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['related_publications']}/></h4>
                                <SearchAsyncSelectBox
                                    handleChangeEntity={handleChangeRelatedPublications}
                                    searchValues={related_publications_details}
                                    types={related_publications_types}
                                    width='100%'
                                />
                            </div>
                        }

                        {checkDisplay(show_entry_review_status) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['entry_review_status']} altText={createAltText('Entry Review Status for the ')}/></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeEntryReviewStatus}
                                    searchOptions={entry_review_status_options}
                                    searchValues={searchEntryReviewStatus}
                                    multi={false}
                                    req={true}
                                    width="100%"
                                />
                            </div>
                        }

                        {checkDisplay(show_wikidata_id) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['wikidata_id']}/></h4>
                                <SearchTextField
                                    onBlurEvent={updateJSON}
                                    fieldName={'wikidata_id'}
                                    fieldValue={item?.wikidata_id}
                                />
                            </div>
                        }

                        <div style={{clear:"both", "marginTop":10}}>
                            <md-filled-button id="submitForm" type="submit">{uid ? 'Edit' : 'Add'}&nbsp;{entity}</md-filled-button>&nbsp;
                        </div>

                    </form>

                    <br />

                    <h4>Add JSON</h4>
                    <pre>{JSON.stringify(json, null, 4)}</pre>

                    <br /><br />
                    <h4>Add Response</h4>

                    <pre>{JSON.stringify(addResponse, null, 4)}</pre>

                    <br /><br />
                    <h4>Other Messages</h4>
                    {error}

                </>
            )}
        </>
    )

};

export default AddEntry;
