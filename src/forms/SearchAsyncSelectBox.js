import React, {useEffect, useState} from "react";
import AsyncSelect from 'react-select/async';
import SearchIcon from '@mui/icons-material/Search';

const SearchAsyncSelectBox = ({ handleChangeEntity, searchValues, types, width=300, req=false, single=false, predicate=null }) => {

    //console.log(searchValues)

    const [inputValue, setValue] = useState('');

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // load options using API call
    const loadOptions = (inputValue) => {
        if (inputValue.length >= 3) {
            let api = process.env.REACT_APP_API + "lookup?predicate=name&query=" + inputValue
            //api = api + '&dgraph_types=Organization&dgraph_types=PoliticalParty&dgraph_types=NewsSource&dgraph_types=Person'
            for (var t in types){
                api += '&dgraph_types=' + types[t]
                //console.log(iv)
            }
            //console.log(api)
            return fetch(api).then(res => res.json());
        }
    };

    const placeholderComponent = (
        <>
            <SearchIcon /> Please type...
        </>
    );

    const selectStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelectedCountry ? "#ffffff" : state.isSelectedEntity ? "#ffffff" :"#000000",
        }),
        container: provided => ({
            ...provided,
            display: "inline-block",
            width: width
        })
    };

    const optionLabel = (e) => {
        var passed_search = false
        var text = e.name
        //console.log(e.name)
        try {
            if (Array.isArray(text)) {
                text = e.name[0]
            }
        }
        catch (e) {
            console.log(e)
        }
        var shouldBeBold = inputValue
        const textArray = text.split(RegExp(shouldBeBold, "ig"));
        const match = text.match(RegExp(shouldBeBold, "ig"));
        let d_type = e["dgraph.type"]
        let dt = null
        if (!d_type){
            d_type = e.type
            dt = d_type
            passed_search = true
        } else {
            for (var t of d_type){
                if (t !== 'Entry'){
                    dt = t
                    break
                }
            }
        }



        return (
            <span>
                {!passed_search &&
                    <>
                        {textArray.map((item, index) => (
                            <>
                                {item}
                                {index !== textArray.length - 1 && match && (
                                    <b>{match[index]}</b>
                                )}
                            </>
                        ))}
                    </>
                }
                {passed_search &&
                    <>
                        {e.name}
                    </>
                }
                {dt &&
                    <>
                        &nbsp;(Type: {dt})
                    </>
                }
        </span>
        );
    }

    //console.log('searchValues')
    //console.log(searchValues)
    //console.log('loadOptions')
    //console.log(loadOptions)

    return (
        <>
            {req && !single &&
                <AsyncSelect
                    key={e => e.uid}
                    styles={selectStyles}
                    getOptionLabel={e => optionLabel(e)}
                    //getOptionLabel={e => e.name}
                    getOptionValue={e => e.uid}
                    defaultValue={searchValues}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleChangeEntity}
                    placeholder={placeholderComponent}
                    isMulti
                    closeMenuOnSelect={true}
                    required
                />
            }
            {!req && !single &&
                <AsyncSelect
                    key={e => e.uid}
                    styles={selectStyles}
                    getOptionLabel={e => optionLabel(e)}
                    //getOptionLabel={e => e.name}
                    getOptionValue={e => e.uid}
                    defaultValue={searchValues}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleChangeEntity}
                    placeholder={placeholderComponent}
                    isMulti
                    closeMenuOnSelect={true}
                />
            }
            {req && single &&
                <AsyncSelect
                    key={e => e.uid}
                    styles={selectStyles}
                    getOptionLabel={e => optionLabel(e)}
                    //getOptionLabel={e => e.name}
                    getOptionValue={e => e.uid}
                    defaultValue={searchValues}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleChangeEntity}
                    placeholder={placeholderComponent}
                    closeMenuOnSelect={true}
                    required
                />
            }
            {!req && single &&
                <AsyncSelect
                    key={e => e.uid}
                    styles={selectStyles}
                    getOptionLabel={e => optionLabel(e)}
                    //getOptionLabel={e => e.name}
                    getOptionValue={e => e.uid}
                    defaultValue={searchValues}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleChangeEntity}
                    placeholder={placeholderComponent}
                    closeMenuOnSelect={true}
                />
            }
        </>
    )
}

export default SearchAsyncSelectBox;