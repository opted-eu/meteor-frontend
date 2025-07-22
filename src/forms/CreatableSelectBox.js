import React from 'react';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';

const CreateableSelectBox = ({ handleChangeEntity, searchOptions=null, searchValues, req=true, width=300, label = "Please type..." }) => {

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


    return (
        <>
            {req && searchOptions &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={label}
                    value={searchValues}
                    isMulti
                    options={searchOptions}
                    required
                />
            }
            {!req && searchOptions &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={true}
                    placeholder={label}
                    value={searchValues}
                    isMulti
                    options={searchOptions}
                />
            }
            {req && !searchOptions &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={label}
                    value={searchValues}
                    isMulti
                    required
                />
            }
            {!req && !searchOptions &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={true}
                    placeholder={label}
                    value={searchValues}
                    isMulti
                />
            }
        </>
    )
};
export default CreateableSelectBox;