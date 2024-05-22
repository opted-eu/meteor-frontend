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
    apiField['subnational'] = 'subnational_scope'
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
    // subnational
    const [subnationalList, setSubnationalList] = useState([])
    const [searchSubnational, setSearchSubnational] = useState();
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

    // Creatable (D2)
    // Alternates
    const [searchAlternates, setSearchAlternates] = useState();

    // Enum (E2)
    // Access
    const [accessList, setAccessList] = useState([['NA', 'NA / Unknown'], ['free', 'Free'], ['registration', 'Registration Required'], ['request', 'Upon Request'], ['purchase', 'Purchase']])
    const [searchAccess, setSearchAccess] = useState();
    // Geographic
    const [geographicList, setGeographicList] = useState([['multinational', 'Multinational'], ['national', 'National'], ['subnational', 'Subnational']])
    const [searchGeographic, setSearchGeographic] = useState();

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
    const fetchData = (fetchURL, predicate, val, list, itemdata, detailed=false) => {
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
            case 'subnational':
                setSubnationalList(data);
                setSearchSubnational(s);
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
        //console.log(search)
        //console.log(details)
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
    let entries_included_details = createSearchDetails(searchEntriesIncluded, entriesIncludedDetails)
    let tools_details = createSearchDetails(searchTools, toolsDetails)
    let references_details = createSearchDetails(searchReferences, referencesDetails)
    let authors_details = createSearchDetails(searchAuthors, authorsDetails, 'Author')
    let sources_included_details = createSearchDetails(searchSourcesIncluded, sourcesIncludedDetails)
    let materials_details = createSearchDetails(searchMaterials, materialsDetails)

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

    const handleChangeSubnational = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchSubnational(sel[1])
        updateJSON('subnational', sel[0])
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

    // *** creatable *** (D3)

    const handleChangeAlternates = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption)
        setSearchAlternates(sel[1])
        updateJSON('alternates', sel[0])
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

    // *** checkboxes *** (F2)

    const handleClickFulltext = (event) => {
        let chk = event.target.checked
        if(chk) {
            updateJSON('fulltext', false)
        } else {
            updateJSON('fulltext', true)
        }

    };

    // ************** Submit ****************

    const handleSubmitAE = async e => {
        e.preventDefault();
        if (1===1) {
            let resp = null
            if (uid) {
                //edit
                resp = await editRecord(
                    uid,
                    json,
                    token
                );
            } else {
                //add
                resp = await addRecord(
                    entity,
                    json,
                    token
                );
            }
            if (resp.status === 200) {
                setAddResponse(resp);
                setError(null)
                //navigate('/detail/' + resp.uid)
            } else {
                setError(resp.message)
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
    let sources_included_types = ['NewsSource', 'Government', 'Parliament' , 'PoliticalParty', 'Organization']
    let materials_types = ['LearningMaterial']

    // *** all *** (A6, B5, C1, T2, D4, E4, F3)
    const show_alternates = ["Collection", "Archive", "Dataset"]
    const show_description = ["Collection", "Archive", "Dataset"]
    const show_references = ["Collection"]
    const show_entries_included = ["Collection"]
    const show_languages = ["Collection", "Archive", "Dataset"]
    const show_countries = ["Collection", "Archive", "Dataset"]
    const show_concept = ["Collection", "Archive", "Dataset"]
    const show_modal = ["Collection", "Archive", "Dataset"]
    const show_subnational = ["Collection"]
    const show_materials = ["Collection"]
    const show_tools = ["Collection"]
    const show_authors = ["Archive", "Dataset"]
    const show_url = ["Archive", "Dataset"]
    const show_doi = ["Archive", "Dataset"]
    const show_arxiv = ["Archive", "Dataset"]
    const show_access = ["Archive", "Dataset"]
    const show_text_types = ["Archive", "Dataset"]
    const show_sources_included = ["Archive", "Dataset"]
    const show_geographic = ["Archive", "Dataset"]
    const show_fulltext = ["Archive", "Dataset"]
    const show_text_units = ["Archive", "Dataset"]
    const show_meta_variables = ["Archive", "Dataset"]
    const show_file_formats = ["Archive", "Dataset"]
    const show_date_published = ["Dataset"]
    const show_github = ["Dataset"]
    const show_temporal_coverage_start = ["Dataset"]
    const show_temporal_coverage_end = ["Dataset"]

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

        // subnational
        fetchData('schema/predicate/counts/', 'subnational', 1, true, i)

        // text types
        fetchData('schema/predicate/counts/', 'text_types', 1, true, i)

        // text units
        fetchData('schema/predicate/counts/', 'text_units', 1, true, i)

        // meta variables
        fetchData('schema/predicate/counts/', 'meta_variables', 1, true, i)

        // file formats
        fetchData('schema/predicate/', 'file_formats', 1, true, i, true)

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
            j[apiField['desc']] = i[apiField['desc']]

            // doi
            j[apiField['doi']] = i[apiField['doi']]

            // arxiv
            j[apiField['arxiv']] = i[apiField['arxiv']]

            // url
            j[apiField['url']] = i[apiField['url']]

            // github
            j[apiField['github']] = i[apiField['github']]

            // date_published
            j[apiField['date_published']] = retDateYear(i[apiField['date_published']], true)

            // temporal_coverage_start
            j[apiField['temporal_coverage_start']] = i[apiField['temporal_coverage_start']]

            // temporal_coverage_end
            j[apiField['temporal_coverage_end']] = i[apiField['temporal_coverage_end']]

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

            // *** List *** (B7)

            // languages
            setupSelectVars(i, j, 'languages')

            // countries
            setupSelectVars(i, j, 'countries')

            // concept
            setupSelectVars(i, j, 'concept')

            // modal
            setupSelectVars(i, j, 'modal')

            // subnational
            setupSelectVars(i, j, 'subnational')

            // text types
            setupSelectVars(i, j, 'text_types')

            // text units
            setupSelectVars(i, j, 'text_units')

            // meta variables
            setupSelectVars(i, j, 'meta_variables')

            // file formats
            setupSelectVars(i, j, 'file_formats')

            // *** Creatable *** (D5)

            // alternates
            setupSelectVars(i, j, 'alternates', true)
            setSearchAlternates(setCreatable(i, 'alternates'))

            // *** Enums *** (E5)

            // access
            j[apiField['access']] = i[apiField['access']]
            let access_lab = ''
            for (var a of accessList){
                if (a[0] === i[apiField['access']]){
                    access_lab = a[1];
                }
            }
            setSearchAccess({'value': i[apiField['access']], 'label': access_lab})

            // geographic
            j[apiField['geographic']] = i[apiField['geographic']]
            let geographic_lab = ''
            for (var a of geographicList){
                if (a[0] === i[apiField['geographic']]){
                    geographic_lab = a[1];
                }
            }
            setSearchGeographic({'value': i[apiField['geographic']], 'label': geographic_lab})

            // *** Checkboxes *** (F4)
            //console.log(i[apiField['fulltext']])
            j[apiField['fulltext']] = i[apiField['fulltext']]

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
    let subnational_options = subnationalList.map(function (p) {
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

    // *** enums ***

    let access_options = accessList.map(function (p) {
        return {value: p[0], label: p[1]};
    })
    let geographic_options = geographicList.map(function (p) {
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
        if (val){
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
                                    req={true}
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
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['access']} altText='How can the user access the '/></h4>
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
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['geographic']} altText='What is the geographic scope of the '/></h4>
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

                        {checkDisplay(show_subnational) &&
                            <div className='add_entry'>
                                <h4><TypeDescription dgraphType={entity} fieldName={apiField['subnational']}/></h4>
                                <SearchSelectBox
                                    handleChangeEntity={handleChangeSubnational}
                                    searchOptions={subnational_options}
                                    searchValues={searchSubnational}
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
