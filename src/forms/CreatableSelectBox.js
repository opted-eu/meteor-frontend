import React from 'react';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';

const CreateableSelectBox = ({ handleChangeEntity, searchValues, req=true, width=300 }) => {

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
            {req &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={false}
                    placeholder={"Please type..."}
                    value={searchValues}
                    isMulti
                    required
                />
            }
            {!req &&
                <CreatableSelect
                    onChange={handleChangeEntity}
                    styles={SelectStyles}
                    clearable={true}
                    closeMenuOnSelect={true}
                    placeholder={"Please type..."}
                    value={searchValues}
                    isMulti
                />
            }
        </>
    )
};
export default CreateableSelectBox;