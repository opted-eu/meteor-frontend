import React from 'react';
import Select from "react-select";

const SearchSelectBox = ({ handleChangeEntity, searchOptions, searchValues }) => {

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


    return (
        <Select
            onChange={handleChangeEntity}
            styles={SelectStyles}
            options={searchOptions}
            clearable={true}
            isMulti
            closeMenuOnSelect={false}
            placeholder={"Please choose..."}
            value={searchValues}
        />
    )
};
export default SearchSelectBox;