import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import { Tooltip } from "@mui/material";
import Select from 'react-select'
import TypeDescription from "../components/TypeDescription";

const ReviewFilterForm = ({ searchParams }) => {

    let initialEntity = ''
    let initialCountry = ''
    let initialSearchEntity = ''
    let initialSearchCountry = ''

    let apiField = {}
    apiField['entity'] = 'dgraph_type'
    apiField['country'] = 'country'

    // check searchParams var and assign to 'initial' vars
    for (let param of searchParams) {
        switch (param[0]) {
            // predicates
            case apiField['entity']:
                initialEntity = param[0] + '=' + param[1]
                initialSearchEntity = {value: param[1], label: param[1]}
                break;
            case apiField['country']:
                initialCountry = param[0] + '=' + param[1]
                initialSearchCountry = {value: param[1], label: param[1]}
                break;
        }
    }

    const navigate = useNavigate();
    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [country, setCountry] = useState(initialCountry);
    const [entity, setEntity] = useState(initialEntity);
    const [searchCountry, setSearchCountry] = useState();
    const [searchEntity, setSearchEntity] = useState(initialSearchEntity);

    const fetchItemData = () => {
        // fetch types
        fetch(process.env.REACT_APP_API + "schema/types")
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
        countryAPI = process.env.REACT_APP_API + "schema/predicate/counts/country"
        fetch(countryAPI)
            .then(response => {
                return response.json()
            })
            .then(data => {
                for(var c of data) {
                    // 1. change c.name to c.uid
                    if (c.uid === initialSearchCountry.value) {
                        setSearchCountry({value: c.uid, label: c.name})
                    }
                }
                setCountriesList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
        // add listener for pressing 'Enter' button
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
    }, [])

    const handleSubmitS = (event) => {
        event.preventDefault();
        let qs = ''
        if (entity){
            qs = entity
        }
        if (country){
            if (qs){
                qs = qs + '&' + country
            } else {
                qs = country
            }
        }

        navigate(
            '/review/link?' + qs
        )
    }



    // helper function for selectedOptions
    const getSelectedOptions = (selectedOption, predicate) => {
        var str = ""
        var sel = {}
        if (selectedOption){
            str = apiField[predicate] + "=" + selectedOption.value
            sel = selectedOption
        }
        return [str, sel]
    };

    const handleChangeEntity = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'entity')
        setEntity(sel[0])
        setSearchEntity(sel[1])
    }

    const handleChangeCountry = (selectedOption) => {
        let sel = getSelectedOptions(selectedOption, 'country')
        setCountry(sel[0])
        setSearchCountry(sel[1])
    };

    const SelectStyles = {
        menu: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        option: (styles, {isFocused, isSelected}) => ({
            ...styles,
            background: isFocused
                ? '#0e68b9'
                : isSelected
                    ? 'darkblue'
                    : undefined,
            color: isFocused
                ? 'white'
                : isSelected
                    ? 'white'
                    : undefined,
            zIndex: 1
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
            // 2. change the value from c.name to c.uid
            if (c["dgraph.type"][0] === 'Multinational'){
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

    let resources_options = []
    let actors_options = []
    let linking_entities_options = []
    let other_options = []
    let resources = [
        'Archive',
        'Collection',
        'Dataset',
        'LearningMaterial',
        'Tool',
        'ScientificPublication'
    ]
    let actors = [
        'Government',
        'JournalisticBrand',
        'NewsSource',
        'PoliticalParty',
        'Parliament',
        'Person',
        'Organization'
    ]
    let linking_entities = [
        'Channel',
        'ConceptVariable',
        'Country',
        'Language',
        'MetaVariable',
        'Modality',
        'Multinational',
        'Operation',
        'TextType',
        'Subnational'
    ]

    // function to compare an array of dictionaries
    function compare( a, b ) {
        if ( a.name < b.name ){
            return -1;
        }
        if ( a.name > b.name ){
            return 1;
        }
        return 0;
    }
    entitiesList.sort( compare );

    const labelWithTooltip = (n) => {
        return (
            <Tooltip placement="right" title={<TypeDescription dgraphType={n}/>} arrow>
                <span>{n}</span>
            </Tooltip>
        )
    }

    for (var e of entitiesList){
        if (resources.includes(e.name) ){
            resources_options.push({value: e.name, label: labelWithTooltip(e.name)})
        } else {
            if (actors.includes(e.name) ){
                actors_options.push({value: e.name, label: labelWithTooltip(e.name)})
            } else {
                if (linking_entities.includes(e.name) ){
                    linking_entities_options.push({value: e.name, label: labelWithTooltip(e.name)})
                } else {
                    other_options.push({value: e.name, label: labelWithTooltip(e.name)})
                }
            }
        }
    }
    const entry_type_options = [
        {
            label: "Resources",
            options: resources_options
        },
        {
            label: "Actors & Institutions",
            options: actors_options
        },
        {
            label: "Linking Entities",
            options: linking_entities_options
        },
        {
            label: "Others",
            options: other_options
        }
    ]


    return (
        <div className="search-form">
            <form onSubmit={handleSubmitS}>
                <div className='search_field'>
                    <h4>Filter by Entry Type</h4>
                    <Select
                        onChange={handleChangeEntity}
                        styles={SelectStyles}
                        options={entry_type_options}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Please choose..."}
                        value={searchEntity}
                    />
                </div>
                <div className='search_field country_sel'>
                    <h4>Filter by Country</h4>
                    <Select
                        onChange={handleChangeCountry}
                        styles={SelectStyles}
                        options={country_options}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Please choose..."}
                        value={searchCountry}
                    />
                </div>
                <div style={{clear:"left", "marginBottom":20}}>
                    <md-filled-button type="submit" id="submitForm">Filter</md-filled-button>
                </div>
            </form>
        </div>
    )
}

export default ReviewFilterForm;