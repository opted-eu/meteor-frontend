import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import Select from 'react-select'
import LogicRadioButton from "./LogicRadioButton";
import '@material/web/textfield/filled-text-field.js'
import SearchSelectBox from "./SearchSelectBox";
import SearchRadioButtons from "./SearchRadioButtons";


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

    let initialEntities = ''
    let initialCountries = ''
    let initialCountriesLogic = ''
    let initialText = ''
    let initialChannels = ''
    let initialLanguages = ''
    let initialLanguagesLogic = ''
    let initialTexttypes = ''
    let initialTexttypesLogic = ''

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
            default:
                break;
        }
    }

    const navigate = useNavigate();

    // state vars - 2. add each search field

    // predicate option lists
    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [channelsList, setChannelsList] = useState([])
    const [languagesList, setLanguagesList] = useState([])
    const [texttypesList, setTexttypesList] = useState([])

    // previous predicate search params
    const [searchCountries, setSearchCountries] = useState();
    const [searchEntities, setSearchEntities] = useState();
    const [searchChannels, setSearchChannels] = useState();
    const [searchLanguages, setSearchLanguages] = useState();
    const [searchTexttypes, setSearchTexttypes] = useState();

    // current predicate search choices
    const [countries, setCountries] = useState(initialCountries);
    const [entities, setEntities] = useState(initialEntities);
    const [freeText, setFreeText] = useState(initialText);
    const [channels, setChannels] = useState(initialChannels);
    const [languages, setLanguages] = useState(initialLanguages);
    const [texttypes, setTexttypes] = useState(initialTexttypes);

    // current logic choices
    const [countriesLogic, setCountriesLogic] = useState(initialCountriesLogic);
    const [languagesLogic, setLanguagesLogic] = useState(initialLanguagesLogic);
    const [texttypesLogic, setTexttypesLogic] = useState(initialTexttypesLogic);

    const fetchItemData = () => {

        // 3. add each predicate here

        // types
        fetchData('types', 'entity', 0)

        // countries
        fetchData('predicate/counts/', 'country', 1)

        // channels
        fetchData('predicate/counts/', 'channel', 1)

        // languages
        fetchData('predicate/counts/', 'languages', 1)

        // texttypes
        fetchData('predicate/counts/', 'text_types', 1)

    }

    // helper fetch function
    const fetchData = (fetchURL, predicate, val) => {
        // construct API URL
        let fullURL = 'https://meteor.balluff.dev/api/schema/'
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
        // 4. add each predicate here
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
            default:
                break;
        }
    }

    // run after each re-render
    useEffect(() => {
        fetchItemData()
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
    // end

    // helper function for selectedOptions
    const getSelectedOptions = (selectedOption, predicate) => {
        var str = ""
        var sel = []
        for (var e in selectedOption){
            str += "&" + apiField[predicate] + "=" + selectedOption[e].value
            sel[sel.length] = selectedOption[e]
        }
        return [str, sel]
    };

    // generic code to handle change in logic operator
    const handleChangeLogic = (event) => {
        let q = ''
        q = '&' + apiField[event.target.name] + '=' + event.target.value
        // 7. add each logic field here
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

    // create predicate options - 8. add for each predicate
    let multinational_options = []
    let individual_country_options = []
    for (var c of countriesList){
        if(c.opted_scope){
            if (c.name === 'Europe' || c.name === 'European Union' || c.name === 'Global Scope'){
                multinational_options[multinational_options.length] = {value: c.uid, label: c.name}
            } else {
                individual_country_options[individual_country_options.length] = {value: c.uid, label: c.name}
            }
        }
    }
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
    // end

    return (
        <>
            <form onSubmit={handleSubmitAS}>

                <div className='adv_search_field'>
                    <h4>Free-text search</h4>
                    <md-filled-text-field placeholder="Enter keywords..." name="free_text" value={freeText.slice(8)} onBlur={event => {
                        const { value } = event.target;
                        if (value) {
                            setFreeText('&_terms=' + value)
                        } else {
                            setFreeText('')
                        }
                    }} />
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

                <div style={{clear:"both", "marginBottom":20}}>
                    <md-filled-button type="submit">Search</md-filled-button>
                </div>

            </form>
        </>
    )
}

export default AdvancedSearchForm;