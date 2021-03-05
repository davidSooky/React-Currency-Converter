import React, { useState, useEffect } from 'react';
import InputField from "./components/InputField";
import CurrencySelect from "./components/CurrencySelect";
import Header from "./components/Header";
import AmountHandling from "./components/AmountHandling";
import CurrencyChart from "./components/CurrencyChart";
import Loader from "./components/Loader";
import { handleDate } from "./utilities/utilities";
import axios from "axios";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("HUF");

  // To calculate result from based on selected currency rate
  let result;
  // Dates to dynamically fetch data for given interval
  const currentDate = handleDate(false);
  const previousDate = handleDate();

  const BASE_URL = "https://api.exchangeratesapi.io/history";

  useEffect(() => {
    const getRates =  async () => {
        const { data } = await axios.get(BASE_URL, {
          params: {
            base: fromCurrency,
            start_at: previousDate,
            end_at: currentDate
          }
        });
        
        setRawData(data.rates);
        setCurrencies(Object.keys(data.rates[currentDate]).sort());
        setTimeout(() => {
          setRates(data.rates[currentDate]);
        }, 2000);
    };

    getRates();

    // Cleanup function, if not defined then currencies does not swap properly
    return () => {
      setRates([]);
    }
  }, [fromCurrency, currentDate]);

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
    <Loader text={"Getting currency rates..."} />
  );
};

export default App;