import React from 'react';
import '@material/web/checkbox/checkbox.js';

const SearchCheckbox = ({ handleClick, val, name, chk }) => {
    if (chk) {
        return (
            <md-checkbox
                name={name}
                value={val}
                onClick={handleClick}
                checked
            />
        )
    } else {
        return (
            <md-checkbox
                name={name}
                value={val}
                onClick={handleClick}
            />
        )
    }
};
export default SearchCheckbox;