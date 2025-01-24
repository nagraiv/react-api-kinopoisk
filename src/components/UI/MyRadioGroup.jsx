import React from 'react';
import MyInput from "./MyInput.jsx";

const MyRadioGroup = ({options, groupName, value, onChange}) => {
    return (
        <form onChange={onChange} className="btn-group">
            {
                options.map(option => <MyInput
                    key={option.slug}
                    label={option.name}
                    type={"radio"}
                    name={groupName}
                    value={option.slug}
                    className={value === option.slug ? 'checked' : null}
                />)
            }
        </form>
    );
};

export default MyRadioGroup;