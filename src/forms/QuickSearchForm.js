import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import AsyncSelect from 'react-select/async';
import SearchIcon from '@mui/icons-material/Search';

const QuickSearchForm = () => {

    const navigate = useNavigate();
    const [inputValue, setValue] = useState('');

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChangeQS = value => {
        navigate("/detail/link/" + value.uid);
    }

    // load options using API call
    const loadOptions = (inputValue) => {
        if (inputValue.length >= 3) {
            return fetch(`https://meteor.balluff.dev/api/quicksearch?term=${inputValue}`).then(res => res.json());
        }
    };

    const placeholderComponent = (
        <>
            <SearchIcon /> Search Everything
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
            width: 300
        })
    };

    const optionLabel = (e) => {
        var text = e.name
        var shouldBeBold = inputValue
        const textArray = text.split(RegExp(shouldBeBold, "ig"));
        const match = text.match(RegExp(shouldBeBold, "ig"));
        return (
            <span>
                {textArray.map((item, index) => (
                  <>
                      {item}
                      {index !== textArray.length - 1 && match && (
                          <b>{match[index]}</b>
                      )}
                  </>
                ))}
                &nbsp;(Type: {e.type})
            </span>
            );
        }



        return (
        <>
            <AsyncSelect
                styles={selectStyles}
                getOptionLabel={e => optionLabel(e)}
                getOptionValue={e => e.uid}
                value={null}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChangeQS}
                placeholder={placeholderComponent}
            />
        </>
    )
}

export default QuickSearchForm;