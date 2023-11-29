import React, {useEffect, useState} from "react";
import '../assets/css/search.css'
import Select from "react-select";
import AdvancedResults from "./AdvancedResults";

const AdvancedSearch = () => {

    const [entitiesList, setEntitiesList] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [countries, setCountries] = useState("");
    const [entity, setEntity] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);

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
        fetch(process.env.REACT_APP_API + "schema/predicate/counts/country")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCountriesList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchItemData()
    }, [])

    const handleChangeCountry = (selectedOption) => {
        setSelectedCountry(selectedOption);
        console.log(`Option selected:`, selectedOption);
        setCountries(JSON.stringify(selectedOption));
        console.log(`Countries:`, countries);
    };

    const handleChangeEntity = (selectedOption) => {
        setSelectedEntity(selectedOption);
        console.log(`Option selected:`, selectedOption.value);
        setEntity(selectedOption.value)
        console.log('entity: ' + entity)
    };

    const SelectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelectedCountry ? "#ffffff" : state.isSelectedEntity ? "#ffffff" :"#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: 300
        })
    };

    let country_options = countriesList.map(function (country) {
        return { value: country.uid, label: country.name };
    })

    let entity_options = entitiesList.map(function (entity) {
        return {value: entity.name, label: entity.name};
    })

    return (
        <>
            <h1>Advanced Search</h1>
            <div style={{"marginBottom":10}}>
                <h4>Entity</h4>
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={entity_options}
                    clearable={true}
                    placeholder={"Please choose..."}
                    required
                />
            </div>
            <div style={{"marginBottom":10}}>
                <h4>Country</h4>
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
            <h1>Results</h1>
            {entity && <AdvancedResults
                entity={entity}
            />}
        </>
    )
};

export default AdvancedSearch;
