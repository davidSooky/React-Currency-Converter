import React from 'react';

const CurrencySelect = ({ currency, currencies, onCurrencyChange }) => {
    const selectoptions = currencies.map((curr) => {
        if (curr === currency) return null;
        return (
            <option key={curr} value={curr}>{curr}</option>
        );
    });

    return (
        <select className="form-select" onChange={onCurrencyChange}>
            <option key={currency} value={currency}>{currency}</option>
            {selectoptions}
        </select>
    );
};

export default CurrencySelect;