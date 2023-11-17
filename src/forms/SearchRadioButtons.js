import React from 'react';
import LogicRadioButton from "./LogicRadioButton";

const SearchRadioButtons = ({ handleChangeLogic, logic_name, current_sel }) => {

    return (
        <span className="radio_buttons">
            <LogicRadioButton
                name={logic_name}
                val={'AND'}
                handleChangeLogic={handleChangeLogic}
                logic={current_sel.slice(-3) === 'AND'}
            />
            &nbsp;<label>and</label>&nbsp;
            <LogicRadioButton
                name={logic_name}
                val={'OR'}
                handleChangeLogic={handleChangeLogic}
                logic={current_sel.slice(-2) === 'OR'}
            />
            &nbsp;<label>or</label>
        </span>
    )
};
export default SearchRadioButtons;