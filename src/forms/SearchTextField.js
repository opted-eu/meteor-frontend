import React from 'react';

const SearchTextField = ({ onBlurEvent, fieldName, fieldValue, rows="0", req=false, width='100%', type="text", min, max, label }) => {

    const TextStyles = {
        width: width
    };

    let showFieldValue = () => {
        if (fieldValue === 'None'){
            return ''
        }
        return fieldValue
    }

    return (
        <>
            {req && rows === "0" &&
                <md-filled-text-field
                    style={TextStyles}
                    name={fieldName}
                    value={showFieldValue()}
                    onBlur={event => {
                        const {value} = event.target;
                        onBlurEvent(fieldName, value)
                    }}
                    type={type}
                    min={min}
                    max={max}
                    required
                />
            }
            {req && rows !== "0" &&
                <md-filled-text-field
                    style={TextStyles}
                    name={fieldName}
                    value={showFieldValue()}
                    onBlur={event => {
                        const {value} = event.target;
                        onBlurEvent(fieldName, value)
                    }}
                    type="textarea"
                    rows={rows}
                    required
                />
            }
            {!req && rows === "0" &&
                <md-filled-text-field
                    style={TextStyles}
                    name={fieldName}
                    value={showFieldValue()}
                    onBlur={event => {
                        const {value} = event.target;
                        onBlurEvent(fieldName, value)
                    }}
                    type={type}
                    min={min}
                    max={max}
                    placeholder={label}
                />
            }
            {!req && rows !== "0" &&
                <md-filled-text-field
                    style={TextStyles}
                    name={fieldName}
                    value={showFieldValue()}
                    onBlur={event => {
                        const {value} = event.target;
                        onBlurEvent(fieldName, value)
                    }}
                    type="textarea"
                    rows={rows}
                />
            }
        </>
    )
};
export default SearchTextField;