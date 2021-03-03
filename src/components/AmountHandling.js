import React from 'react';
import "./AmountHandling.css";

const AmountHandling = ({ amountHandle, amount }) => {
    const handleAmount = (e) => {
        if(e.target.innerText === "-") {
            if (amount - 1 < 0) {
                return;
            }
            return amountHandle(amount - 1);
        }
        return amountHandle(parseInt(amount) + 1)
    }

    return (
        <div>
            <button onClick={handleAmount}>+</button>
            <button onClick={handleAmount}>-</button>
        </div>
    );
};

export default AmountHandling;
