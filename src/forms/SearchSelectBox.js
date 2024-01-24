import React from 'react';
import Select from "react-select";

const SearchSelectBox = ({ handleChangeEntity, searchOptions, searchValues, multi=true, req=true }) => {

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

    const SelectStyles2 = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: 150
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
            {!multi && req &&
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
            {!multi && !req &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles2}
                    options={searchOptions}
                    closeMenuOnSelect={true}
                    value={searchValues}
                    placeholder={""}
                />
            }
        </>
    )
};
export default SearchSelectBox;