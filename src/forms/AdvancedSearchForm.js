import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js'
import SearchSelectBox from "./SearchSelectBox";
import SearchRadioButtons from "./SearchRadioButtons";
import SearchAsyncSelectBox from "./SearchAsyncSelectBox";

const AdvancedSearchForm = ({ searchParams }) => {

    // get all api fields - 1. add each search field
    let apiField = {}
    apiField['countries_logic'] = 'country*connector'
    apiField['entity'] = 'dgraph.type'
    apiField['country'] = 'country'
    apiField['free_text'] = '_terms'
    apiField['channel'] = 'channel'
    apiField['languages'] = 'languages'
    apiField['languages_logic'] = 'languages*connector'
    apiField['text_types'] = 'text_types'
    apiField['texttypes_logic'] = 'text_types*connector'
    apiField['sources_included'] = 'sources_included'
    apiField['sources_included_logic'] = 'sources_included*connector'
    apiField['subunits'] = 'subnational_scope'
    apiField['subunits_logic'] = 'subnational_scope*connector'


    let initialEntities = ''
    let initialCountries = ''
    let initialCountriesLogic = ''
    let initialText = ''
    let initialChannels = ''
    let initialLanguages = ''
    let initialLanguagesLogic = ''
    let initialTexttypes = ''
    let initialTexttypesLogic = ''
    let initialSourcesIncluded = ''
    let initialSearchSourcesIncluded = []
    let initialSourcesIncludedLogic = ''
    let initialSubunits = []
    let initialSubunitsLogic = ''

    for (let param of searchParams) {
        switch (param[0]){
            // predicates
            case apiField['entity']:
                initialEntities += '&' + param[0] + '=' + param[1]
                break;
            case apiField['country']:
                initialCountries += '&' + param[0] + '=' + param[1]
                break;
            case apiField['free_text']:
                initialText += '&' + param[0] + '=' + param[1]
                break;
            case apiField['channel']:
                initialChannels += '&' + param[0] + '=' + param[1]
                break;
            case apiField['languages']:
                initialLanguages += '&' + param[0] + '=' + param[1]
                break;
            case apiField['text_types']:
                initialTexttypes += '&' + param[0] + '=' + param[1]
                break;
            case apiField['subunits']:
                initialSubunits += '&' + param[0] + '=' + param[1]
                break;
            case apiField['sources_included']:
                initialSourcesIncluded += '&' + param[0] + '=' + param[1]
                initialSearchSourcesIncluded[initialSearchSourcesIncluded.length] = {name: "Country"+initialSearchSourcesIncluded.length , uid: param[1]}
                break;

            // logic
            case apiField['countries_logic']:
                initialCountriesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['languages_logic']:
                initialLanguagesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['texttypes_logic']:
                initialTexttypesLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['sources_included_logic']:
                initialSourcesIncludedLogic += '&' + param[0] + '=' + param[1]
                break;
            case apiField['subunits_logic']:
                initialSubunitsLogic += '&' + param[0] + '=' + param[1]
                break;
            default:
                break;
        }
    }

    const navigate = useNavigate();

    // state vars - 2. add each search field

    // 2a. predicate option lists
    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [channelsList, setChannelsList] = useState([])
    const [languagesList, setLanguagesList] = useState([])
    const [texttypesList, setTexttypesList] = useState([])
    const [subunitsList, setSubunitsList] = useState([])

    // 2b. previous predicate search params
    const [searchCountries, setSearchCountries] = useState();
    const [searchEntities, setSearchEntities] = useState();
    const [searchChannels, setSearchChannels] = useState();
    const [searchLanguages, setSearchLanguages] = useState();
    const [searchTexttypes, setSearchTexttypes] = useState();
    const [searchSourcesIncluded, setSearchSourcesIncluded] = useState(initialSearchSourcesIncluded);
    const [searchSubunits, setSearchSubunits] = useState();

    // 2c. current predicate search choices
    const [countries, setCountries] = useState(initialCountries);
    const [entities, setEntities] = useState(initialEntities);
    const [freeText, setFreeText] = useState(initialText);
    const [channels, setChannels] = useState(initialChannels);
    const [languages, setLanguages] = useState(initialLanguages);
    const [texttypes, setTexttypes] = useState(initialTexttypes);
    const [sourcesIncluded, setSourcesIncluded] = useState(initialSourcesIncluded);
    const [subunits, setSubunits] = useState(initialSubunits);

    // 2d. current logic choices
    const [countriesLogic, setCountriesLogic] = useState(initialCountriesLogic);
    const [languagesLogic, setLanguagesLogic] = useState(initialLanguagesLogic);
    const [texttypesLogic, setTexttypesLogic] = useState(initialTexttypesLogic);
    const [sourcesIncludedLogic, setSourcesIncludedLogic] = useState(initialSourcesIncludedLogic);
    const [subunitsLogic, setSubunitsLogic] = useState(initialSubunitsLogic);

    // 2e. Extra data
    const [sourcesIncludedDetails, setSourcesIncludedDetails] = useState([])
    const [sourcesIncludedDetailsLoaded, setSourcesIncludedDetailsLoaded] = useState(false)

    // fetch all data needed for this page from API
    const fetchItemData = () => {

        // 3a. add each predicate here (not async)

        // types
        fetchData('schema/types', 'entity', 0)

        // countries
        fetchData('schema/predicate/counts/', 'country', 1)

        // channels
        fetchData('schema/predicate/counts/', 'channel', 1)

        // languages
        fetchData('schema/predicate/counts/', 'languages', 1)

        // texttypes
        fetchData('schema/predicate/counts/', 'text_types', 1)

        // subunits
        fetchData('query?_max_results=50&_page=1&dgraph.type=Subnational&countries=0x15&countries=0x1b&countries%2Aconnector=OR', 'subunits', 1)

        // get extra data for 'Sources Included'
        fetchAsyncDetails('sources_included', initialSearchSourcesIncluded)

    }

    // function to get details of initial selections from async select boxes
    const fetchAsyncDetails = (predicate, uids) => {
        const p = [];
        uids.forEach(b => {
            p.push(
                fetch(process.env.REACT_APP_API + "view/uid/" + b.uid)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        //console.log(data)
                        return data;
                    })
            )
        });
        Promise.all(p)
            .then((d) => {
                switch (predicate){
                    // 3b. Add for each Async predicate
                    case 'sources_included':
                        setSourcesIncludedDetails(prevDetails => [...prevDetails, ...d])
                        setSourcesIncludedDetailsLoaded(true)
                        break
                    default:
                        break
                }
            });
    }

    // helper fetch function
    const fetchData = (fetchURL, predicate, val) => {
        // construct API URL
        let fullURL = process.env.REACT_APP_API
        fullURL += fetchURL
        if (fullURL.slice(-1) === '/'){
            fullURL += predicate
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
                for (var d of data){
                    for (let param of searchParams) {
                        if (val === 1) {
                            if(param[0] === apiField[predicate] && param[1] === d.uid) {
                                s[s.length] = {value: d.uid, label: d.name};
                            }
                        } else {
                            if(param[0] === apiField[predicate] && param[1] === d.name) {
                                s[s.length] = {value: d.name, label: d.name};
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

    // set state vars after fetch
    const setStateVars = (predicate, data, s) => {
        // 4. add each predicate here (not async)
        switch (predicate){
            case 'country':
                setCountriesList(data);
                setSearchCountries(s);
                break;
            case 'entity':
                setEntitiesList(data);
                setSearchEntities(s);
                break;
            case 'channel':
                setChannelsList(data);
                setSearchChannels(s);
                break;
            case 'languages':
                setLanguagesList(data);
                setSearchLanguages(s);
                break;
            case 'text_types':
                setTexttypesList(data);
                setSearchTexttypes(s);
                break;
            case 'subunits':
                setSubunitsList(data);
                setSearchSubunits(s);
                break;
            default:
                break;
        }
    }

    // run after each re-render
    useEffect(() => {
        fetchItemData()

        // add listener for pressing 'Enter' button
        /*
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                let my_button = document.getElementById("submitForm")
                my_button.click()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
        */

    }, [])

    // create querystring for search
    const handleSubmitAS = (event) => {
        event.preventDefault();
        //create querystring
        let qs = ''

        // 5. add each search term here
        //predicates
        qs += entities
        qs += countries
        qs += freeText
        qs += channels
        qs += languages
        qs += texttypes
        qs += sourcesIncluded
        qs += subunits

        //logic
        if(countries) {
            qs += countriesLogic
        }
        if(languages) {
            qs += languagesLogic
        }
        if(texttypes) {
            qs += texttypesLogic
        }
        if(sourcesIncluded) {
            qs += sourcesIncludedLogic
        }
        if(subunits) {
            qs += subunitsLogic
        }

        // remove first &
        qs = qs.slice(1)

        navigate(
            '/search/link?' + qs
        )
    }

    // select box handle - 6. need one for each predicate
    const handleChangeCountry = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'country')
        setCountries(sel[0]);
        setSearchCountries(sel[1])
    };
    const handleChangeEntity = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'entity')
        setEntities(sel[0]);
        setSearchEntities(sel[1])

        // check if need to empty any search strings due to select boxes being hidden
        // 7. need one for each 'extra' predicate
        if (!checkDisplay(show_sources_included, sel[0])){
            setSearchSourcesIncluded('')
            setSourcesIncluded('')

        }
        if (!checkDisplay(show_subunits, sel[0])){
            setSearchSubunits('')
            setSubunits('')
        }
    };
    const handleChangeChannel = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'channel')
        setChannels(sel[0]);
        setSearchChannels(sel[1])
    };
    const handleChangeLanguages = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'languages')
        setLanguages(sel[0]);
        setSearchLanguages(sel[1])
    };
    const handleChangeTexttypes = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'text_types')
        setTexttypes(sel[0]);
        setSearchTexttypes(sel[1])
    };
    const handleChangeSourcesIncluded = (selectedOption) => {
        let sel = getSelectedOptionsAsync(selectedOption, 'sources_included')
        //console.log(sel[1])
        setSourcesIncluded(sel[0]);
        setSearchSourcesIncluded(sel[1])
    };
    const handleChangeSubunits = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'subunits')
        setSubunits(sel[0]);
        setSearchSubunits(sel[1])
    };
    // end

    // helper function for selectedOptions
    const getSelectedOptions = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        //console.log("sel_option")
        //console.log(selectedOption)
        for (var e in selectedOption){
            //console.log(selectedOption[e])
            str += "&" + apiField[predicate] + "=" + selectedOption[e].value
            sel[sel.length] = selectedOption[e]
        }
        return [str, sel]
    };

    // helper function for Async selectedOptions
    const getSelectedOptionsAsync = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        //console.log("sel_option")
        //console.log(selectedOption)
        for (var e in selectedOption){
            //console.log(selectedOption[e])
            str += "&" + apiField[predicate] + "=" + selectedOption[e].uid
            sel[sel.length] = selectedOption[e]
            //sel[sel.length] = {value: selectedOption[e].uid, label: selectedOption[e].name}
        }
        return [str, sel]
    };

    // generic code to handle change in logic operator
    const handleChangeLogic = (event) => {
        let q = ''
        q = '&' + apiField[event.target.name] + '=' + event.target.value
        // 8. add each logic field here
        switch (event.target.name){
            case 'countries_logic':
                setCountriesLogic(q)
                break;
            case 'languages_logic':
                setLanguagesLogic(q)
                break;
            case 'texttypes_logic':
                setTexttypesLogic(q)
                break;
            case 'sources_included_logic':
                setSourcesIncludedLogic(q)
                break;
            case 'subunits_logic':
                setSubunitsLogic(q)
                break;
            default:
                break;
        }
    };

    // apply styles to select boxes
    const SelectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: 300
        })
    };

    // create predicate options
    let multinational_options = []
    let individual_country_options = []
    for (var c of countriesList){
        if(c.opted_scope){
            if (c["dgraph.type"][0] === 'Multinational'){
                multinational_options[multinational_options.length] = {value: c.uid, label: c.name}
            } else {
                individual_country_options[individual_country_options.length] = {value: c.uid, label: c.name}
            }
        }
    }
    // 9. add for each predicate (not async)
    const country_options = [
        {
            label: "Multinational",
            options: multinational_options
        },
        {
            label: "Country",
            options: individual_country_options
        }
    ];
    let entity_options = entitiesList.map(function (p) {
        return {value: p.name, label: p.name};
    })

    let channel_options = channelsList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let languages_options = languagesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let texttypes_options = texttypesList.map(function (p) {
        return {value: p.uid, label: p.name};
    })

    let austria_options = []
    let germany_options = []
    for (var s of subunitsList){
        if (s.country.name === 'Austria'){
            austria_options.push({value: s.uid, label: s.name})
        } else {
            germany_options.push({value: s.uid, label: s.name})        }
    }
    const subunits_options = [
        {
            label: "Austria",
            options: austria_options
        },
        {
            label: "Germany",
            options: germany_options
        }
    ];
    // end

    // 10. Add for each predicate
    // access to different sections
    const show_sources_included = ["JournalisticBrand"]
    const show_subunits = ["JournalisticBrand"]


    const checkDisplay = (ary, ents) => {
        for (var x of ary){
            if (ents.indexOf(x) >= 0){
                return true
            }
        }
        return false
    }

    // 11. Add for each asyncselect
    let sources_included_details = []
    if (searchSourcesIncluded) {
        searchSourcesIncluded.forEach(b => {
            const res = sourcesIncludedDetails.find(c => c.uid === b.uid);
            if (res) {
                let dt = res["dgraph.type"]
                let d = ''
                for (var i = 0; i < dt.length; i++) {
                    if (dt[i] !== 'Entry') {
                        d = dt[i];
                        break;
                    }
                }
                let ch = res.channel
                let chan = ''
                if (ch){
                    chan = ch.name
                }
                let n = chan + ' ' + res.name
                sources_included_details.push({name: n, uid: res.uid, type: d})
            }
        })
    }

    return (
        <>
            <form id="advSearch" onSubmit={handleSubmitAS}>

                <div className='adv_search_field'>
                    <h4>Free-text search</h4>
                    <md-filled-text-field
                        placeholder="Enter keywords..."
                        name="free_text"
                        value={freeText.slice(8)}
                        onBlur={event => {
                            const { value } = event.target;
                            if (value) {
                                setFreeText('&_terms=' + value)
                            } else {
                                setFreeText('')
                            }
                        }}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Entity</h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeEntity}
                        searchOptions={entity_options}
                        searchValues={searchEntities}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Countries
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'countries_logic'}
                            current_sel={countriesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeCountry}
                        searchOptions={country_options}
                        searchValues={searchCountries}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Channel</h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeChannel}
                        searchOptions={channel_options}
                        searchValues={searchChannels}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Languages
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'languages_logic'}
                            current_sel={languagesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeLanguages}
                        searchOptions={languages_options}
                        searchValues={searchLanguages}
                    />
                </div>

                <div className='adv_search_field'>
                    <h4>Text Types
                        <SearchRadioButtons
                            handleChangeLogic={handleChangeLogic}
                            logic_name={'texttypes_logic'}
                            current_sel={texttypesLogic}
                        />
                    </h4>
                    <SearchSelectBox
                        handleChangeEntity={handleChangeTexttypes}
                        searchOptions={texttypes_options}
                        searchValues={searchTexttypes}
                    />
                </div>

                {checkDisplay(show_sources_included, entities) &&
                    <div className='adv_search_field'>
                        <h4>Sources Included
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'sources_included_logic'}
                                current_sel={sourcesIncludedLogic}
                            />
                        </h4>
                        {sourcesIncludedDetailsLoaded &&
                            <SearchAsyncSelectBox
                                handleChangeEntity={handleChangeSourcesIncluded}
                                searchValues={sources_included_details}
                            />
                        }
                    </div>
                }

                <div style={{clear:"both", "marginBottom":20}}>
                    <md-filled-button id="submitForm" type="submit">Search</md-filled-button>
                </div>

                {checkDisplay(show_subunits, entities) &&
                    <div className='adv_search_field'>
                        <h4>Subunits
                            <SearchRadioButtons
                                handleChangeLogic={handleChangeLogic}
                                logic_name={'subunits_logic'}
                                current_sel={subunitsLogic}
                            />
                        </h4>
                        <SearchSelectBox
                            handleChangeEntity={handleChangeSubunits}
                            searchOptions={subunits_options}
                            searchValues={searchSubunits}
                        />
                    </div>
                }

            </form>
        </>
    )
}

export default AdvancedSearchForm;