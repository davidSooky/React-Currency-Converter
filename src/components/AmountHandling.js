import React from 'react';
import "./AmountHandling.css";

const AmountHandling = ({ amountHandle, amount, changeFromCurrency, changeToCurrency, fromCurrency, toCurrency }) => {
    const handleAmount = (e) => {
        if(e.target.innerText === "-") {
            if (amount - 1 === 0) {
                return;
            }
            return amountHandle(amount - 1);
        }
        return amountHandle(parseInt(amount) + 1)
    };

    const handleCurrency = () => {
        const initialValue = fromCurrency;
        changeFromCurrency(toCurrency);
        changeToCurrency(initialValue);
    };

    return (
        <div className="handling">
            <div>
                <button onClick={handleAmount}>+</button>
                <button onClick={handleAmount}>-</button>
            </div>
            <div>
                <button className="exchange" onClick={handleCurrency}><i className="fas fa-exchange-alt"></i></button>
            </div>
        </div>
    );
};

export default AmountHandling;
