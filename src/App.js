import React, { useState, useEffect } from 'react';
import InputField from "./components/InputField";
import CurrencySelect from "./components/CurrencySelect";
import Header from "./components/Header";
import AmountHandling from "./components/AmountHandling";
import CurrencyChart from "./components/CurrencyChart";
import Loader from "./components/Loader";
import axios from "axios";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("HUF");

  // To calculate result from currency rate
  let result;
  // Date to dynamically fetch data from current date
  const splitDate = new Date().toLocaleDateString().split("/");
  const currentDate = `${splitDate[2]}-${checkDateFormat(splitDate[0])}-${checkDateFormat(splitDate[1])}`;
  const previousDate = `${splitDate[2] - 1}-${checkDateFormat(splitDate[0])}-${checkDateFormat(splitDate[1])}`;
  const url = `https://api.exchangeratesapi.io/history?start_at=${previousDate}&end_at=${currentDate}`;

  // Insert 0 before day and month index, if they are 1 digit numbers
  function checkDateFormat(input) {
    if(input[1] === undefined) {
      return `0${input}`;
    }
    return input;
  }

  useEffect(() => {
    const getRates =  async () => {
        const { data } = await axios.get(url, {
          params: {
            base: fromCurrency
          }
        });
        
        setRawData(data.rates);
        setCurrencies(Object.keys(data.rates[currentDate]).sort());
        setTimeout(() => {
          setRates(data.rates[currentDate]);
        }, 2000);
    };

    getRates();

    return () => {
      setRates([]);
    }
  }, [fromCurrency, currentDate, url]);

  result = (amount * rates[toCurrency]).toFixed(3);

  return (
    rates.length === undefined ?
    <div className="container">
      <Header date={currentDate} />
      <section className="currency from-currency">
        <InputField amount={amount} onInputChange={setAmount} disabled={false} />
        <p className="select-text">Click to select currency:</p>
        <CurrencySelect currency={fromCurrency} currencies={currencies} onCurrencyChange={(e) => setFromCurrency(e.target.value)} />
      </section>
      <section className="increase-decrease">
        <AmountHandling 
          amountHandle={setAmount}
          amount={amount}
          changeFromCurrency={setFromCurrency}
          changeToCurrency={setToCurrency}
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
        />
      </section>
      <section className="currency to-currency">
        <InputField amount={result} disabled={true} />
        <p className="select-text">Click to select currency:</p>
        <CurrencySelect currency={toCurrency} currencies={currencies} onCurrencyChange={(e) => setToCurrency(e.target.value)}  />
      </section>
      <CurrencyChart rawData={rawData} toCurrency={toCurrency} />
    </div>
    : 
    <Loader />
  );
};

export default App;