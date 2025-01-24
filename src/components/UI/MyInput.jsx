import React from 'react';

// React 19: you needn't forwardRef
const MyInput = ({ref, label, className, children, ...props}) => {
    return (
        <label className={className}>
            {label}
            <input ref={ref} {...props}/>
            {children}
        </label>
    );
};

export default MyInput;