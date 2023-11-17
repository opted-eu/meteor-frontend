import React from 'react';
import '@material/web/radio/radio.js';

const LogicRadioButton = ({ handleChangeLogic, val, name, logic }) => {
    if (logic) {
        return (
            <md-radio
                name={name}
                value={val}
                onClick={handleChangeLogic}
                checked
            />
        )
    } else {
        return (
            <md-radio
                name={name}
                value={val}
                onClick={handleChangeLogic}
            />
        )
    }
};
export default LogicRadioButton;