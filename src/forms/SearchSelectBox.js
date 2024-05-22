import React from 'react';
import Select from "react-select";

const SearchSelectBox = ({ handleChangeEntity, searchOptions, searchValues, multi=true, req=false, width=300, special=false }) => {

    // apply styles to select boxes
    const SelectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: width
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
            {multi && !req && !special &&
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
            {multi && req && !special &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={searchOptions}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={"Please choose..."}
                    value={searchValues}
                    isMulti
                    required
                />
            }
            {!multi && !req && !special &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={searchOptions}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={"Please choose..."}
                    value={searchValues}
                />
            }
            {!multi && req && !special &&
                <Select
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    options={searchOptions}
                    clearable={true}
                    closeMenuOnSelect={true}
                    value={searchValues}
                    placeholder={"Please choose..."}
                    required
                />
            }
            {special &&
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