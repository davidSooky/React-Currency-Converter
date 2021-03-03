import React from 'react';

const InputField = ({ amount, onInputChange, disabled }) => {
    
    return (
        <input className="form-control" type="number"
            value={amount}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={disabled}
        />
    );
};

export default InputField;