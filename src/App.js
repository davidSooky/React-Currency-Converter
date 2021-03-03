import React, { useState, useEffect } from 'react';
import InputField from "./components/InputField";
import CurrencySelect from "./components/CurrencySelect";
import Header from "./components/Header";
import AmountHandling from "./components/AmountHandling";
import CurrencyChart from "./components/CurrencyChart";
import axios from "axios";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("HUF");

  let result;
  const url = "https://api.exchangeratesapi.io/latest";
  // const url = "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2020-02-28";

  useEffect(() => {
    const getRates =  async () => {
        const { data } = await axios.get(url, {
          params: {
            base: fromCurrency
          }
        });
        console.log(Object.keys(data.rates).length);
        setCurrencies(Object.keys(data.rates));
        setRates(data.rates);
    };

    getRates();
  }, [fromCurrency]);

  result = (amount * rates[toCurrency]).toFixed(3);
  return (
    <div className="container">
      <Header />
      <section className="currency from-currency">
        <InputField amount={amount} onInputChange={setAmount} disabled={false} />
        <p className="select-text">Click to select currency:</p>
        <CurrencySelect currency={fromCurrency} currencies={currencies} onCurrencyChange={(e) => setFromCurrency(e.target.value)} />
      </section>
      <section className="increase-decrease">
        <AmountHandling amountHandle={setAmount} amount={amount}/>
      </section>
      <section className="currency to-currency">
        <InputField amount={result} disabled={true} />
        <p className="select-text">Click to select currency:</p>
        <CurrencySelect currency={toCurrency} currencies={currencies} onCurrencyChange={(e) => setToCurrency(e.target.value)}  />
      </section>
      <CurrencyChart />
    </div>
  );
};

export default App;