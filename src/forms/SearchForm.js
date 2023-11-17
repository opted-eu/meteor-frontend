import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import Select from 'react-select'

const SearchForm = () => {

    const defaultEntityQuery = "dgraph.type=PoliticalParty"
    const defaultEntityValue = {value: 'PoliticalParty', label: 'PoliticalParty'}

    const navigate = useNavigate();
    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [usedforList, setUsedforList] = useState([])
    const [texttypesList, setTexttypesList] = useState([])
    const [countries, setCountries] = useState("");
    const [entity, setEntity] = useState(defaultEntityQuery);
    const [usedfor, setUsedfor] = useState("");
    const [textypes, setTexttypes] = useState("");

    const fetchItemData = () => {
        // fetch types
        fetch("https://meteor.balluff.dev/api/schema/types")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setEntitiesList(data);
            })
            .catch((err) => {
                console.log(err);
            });
        // fetch countries
        let countryAPI
        countryAPI = "https://meteor.balluff.dev/api/query?dgraph.type=Country"
        countryAPI = "https://meteor.balluff.dev/api/schema/predicate/counts/country"
        fetch(countryAPI)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCountriesList(data);
            })
            .catch((err) => {
                console.log(err);
            });
        // fetch user_for
        fetch("https://meteor.balluff.dev/api/schema/predicate/counts/used_for")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUsedforList(data);
            })
            .catch((err) => {
                console.log(err);
            });
        // fetch text_types
        fetch("https://meteor.balluff.dev/api/schema/predicate/counts/text_types")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTexttypesList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
    }, [])

    const handleSubmitS = (event) => {
        event.preventDefault();
        let qs = entity
        if(entity.slice(-4) === 'Tool'){
            qs += usedfor
        } else {
            if(entity.slice(-7) === 'Archive' || entity.slice(-7) === 'Dataset'){
                qs += textypes
            } else {
                qs += countries
            }
        }

        navigate(
            'search?' + qs
        )
    }

    const handleChangeCountry = (selectedOption) => {
        var str = ""
        for (var c in selectedOption){
            str += "&country=" + selectedOption[c].value
        }
        setCountries(str);
    };

    const handleChangeTexttypes = (selectedOption) => {
        var str = ""
        for (var c in selectedOption){
            str += "&text_types=" + selectedOption[c].value
        }
        setTexttypes(str);
    };

    const handleChangeUsedfor = (selectedOption) => {
        var str = ""
        for (var c in selectedOption){
            str += "&used_for=" + selectedOption[c].value
        }
        setUsedfor(str);
    };

    const handleChangeEntity = (selectedOption) => {
        let e = selectedOption.value
        console.log(`Option selected:`, e);
        setEntity('dgraph.type=' + e)
    };

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
    ]

    let entity_options = entitiesList.map(function (e) {
        return {value: e.name, label: e.name};
    })

    let texttypes_options = texttypesList.map(function (t) {
        return {value: t.uid, label: t.name};
    })

    let usedfor_options = usedforList.map(function (u) {
        return {value: u.uid, label: u.name};
    })


    return (
        <>
            <form onSubmit={handleSubmitS}>
                <div className='search_field'>
                    <h4>Select Entity</h4>
                    <Select
                        onChange={handleChangeEntity}
                        styles={SelectStyles}
                        options={entity_options}
                        clearable={true}
                        placeholder={"Please choose..."}
                        required
                        defaultValue={defaultEntityValue}
                    />
                </div>
                {entity.slice(-4) !== 'Tool' && entity.slice(-7) !== 'Dataset' && entity.slice(-7) !== 'Archive' &&
                    <div className='search_field country_sel'>
                        <h4>Select Country</h4>
                        <Select
                            onChange={handleChangeCountry}
                            styles={SelectStyles}
                            options={country_options}
                            clearable={true}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder={"Please choose..."}
                            required
                        />
                    </div>
                }
                {entity.slice(-7) === 'Dataset' &&
                    <div className='search_field texttypes_sel'>
                        <h4>TextTypes</h4>
                        <Select
                            onChange={handleChangeTexttypes}
                            styles={SelectStyles}
                            options={texttypes_options}
                            clearable={true}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder={"Please choose..."}
                            required

                        />
                    </div>
                }
                {entity.slice(-7) === 'Archive' &&
                    <div className='search_field texttypes_sel'>
                        <h4>Select Text Types</h4>
                        <Select
                            onChange={handleChangeTexttypes}
                            styles={SelectStyles}
                            options={texttypes_options}
                            clearable={true}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder={"Please choose..."}
                            required

                        />
                    </div>
                }
                {entity.slice(-4) === 'Tool' &&
                    <div className='search_field usedfor_sel'>
                        <h4>Select Used For</h4>

                            <Select
                            onChange={handleChangeUsedfor}
                            styles={SelectStyles}
                            options={usedfor_options}
                            clearable={true}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder={"Please choose..."}
                            required
                            />
                    </div>
                }
                <div style={{clear:"both", "marginBottom":20}}>
                    <md-filled-button type="submit">Search</md-filled-button> <md-text-button type="button" onClick={() => navigate('search')}>Advanced Search</md-text-button>
                </div>
            </form>
        </>
    )
}

export default SearchForm;