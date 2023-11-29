import React from 'react';
import Select from "react-select";

const SearchSelectBox = ({ handleChangeEntity, searchOptions, searchValues, multi=true }) => {

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
        <>
            {multi &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={searchOptions}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={"Please choose..."}
                    value={searchValues}
                    isMulti
                />
            }
            {!multi &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={searchOptions}
                    clearable={true}
                    closeMenuOnSelect={true}
                    placeholder={"Please choose..."}
                    value={searchValues}
                    required
                />
            }
        </>
    )
};
export default SearchSelectBox;