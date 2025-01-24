import React from 'react';

const MySelect = ({options, defaultValue, label, value, onChange, children}) => {
    return (
        <label>
            {label}
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option disabled value="">{defaultValue}</option>
                {
                    options.map(option =>
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    )
                }
            </select>
            {children}
        </label>
    );
};

export default MySelect;