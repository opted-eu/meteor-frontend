import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import { Tooltip } from "@mui/material";
import Select from 'react-select'
import TypeDescription from "../components/TypeDescription";

const AddCheckForm = () => {

    const navigate = useNavigate();
    const [entitiesList, setEntitiesList] = useState([])
    const [entity, setEntity] = useState("");
    const [entryName, setEntryName] = useState("");

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
        let qs = entity

        navigate(
            '/add/check?' + qs + entryName
        )
    }

    const handleChangeEntity = (selectedOption) => {
        let e = selectedOption.value
        //console.log(`Option selected:`, e);
        setEntity('dgraph_type=' + e)
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
        /*
        {
            label: "Linking Entities",
            options: linking_entities_options
        },
        {
            label: "Others",
            options: other_options
        }
        */
    ]

    return (
        <div className="search-form">
            <form onSubmit={handleSubmitS}>

                <div className='search_field'>
                    <h4>Name of New Entry</h4>
                    <md-filled-text-field
                        placeholder="Enter name..."
                        name="entry_name"
                        value={entryName.slice(8)}
                        onBlur={event => {
                            const { value } = event.target;
                            if (value) {
                                setEntryName('&name=' + value)
                            } else {
                                setEntryName('')
                            }
                        }}
                        required
                    />
                </div>

                <div className='search_field'>
                    <h4>Select Entry Type</h4>
                    <Select
                        onChange={handleChangeEntity}
                        styles={SelectStyles}
                        options={entry_type_options}
                        clearable={true}
                        placeholder={"Please choose..."}
                        required
                    />
                </div>

                <div style={{clear:"left", "marginBottom":20}}>
                    <md-filled-button type="submit" id="submitForm">Add New Entry</md-filled-button>
                </div>
            </form>
        </div>
    )
}

export default AddCheckForm;