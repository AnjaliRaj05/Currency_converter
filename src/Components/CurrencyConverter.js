
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExchangeRate, setConvertedValue } from '../redux/action';
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.css';

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.exchangeRate);
  const convertedValue = useSelector((state) => state.convertedValue);

  const [sourceCurrency, setSourceCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('AED');
  const [sourceValue, setSourceValue] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  
  useEffect(() => {

    
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
       `http://apilayer.net/api/live?access_key=865b1040ef445b8269f84799d35acc41&currencies=${targetCurrency}&source=${sourceCurrency}&format=1`
        );

        const rate = response.data.quotes[`${sourceCurrency}${targetCurrency}`];
        dispatch(setExchangeRate(rate));
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      } 
    };

    fetchExchangeRate();
  }, [sourceCurrency, targetCurrency, dispatch]);

  const handleConvert = () => {
    const converted = sourceValue * exchangeRate;
    dispatch(setConvertedValue(converted.toFixed(2)));
  };
  const handleSwitchCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };
  return (
    <div className="box">
      <h1 className="h" data-aos="fade-right">Currency Converter</h1>
      <div className='main-container' data-aos="fade-out">
        <div className='i-lbl'>
        <label>
            Amount :
            <input
              type="number"
              value={sourceValue}
              onChange={(e) => setSourceValue(e.target.value)}
            />
          </label>
       
          <label>
            Source Currency:
            <select
              value={sourceCurrency}
              onChange={(e) => setSourceCurrency(e.target.value)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="ALL">ALL</option>
              <option value="AED">AED</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="PKR">PKR</option>
              <option value="ZAR">ZAR</option>
            </select>
          </label>
          <div className="icon" onClick={handleSwitchCurrencies}>

          < MdOutlineSwapHorizontalCircle />
            </div>
        
          <label>
            Target Currency:
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="AED">AED</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="PKR">PKR</option>
              <option value="ZAR">ZAR</option>
              <option value="ALL">ALL</option>
             
            </select>
          </label>
          
        </div>
        <div className='btn-box' style={{ textAlign: 'center' }}>
       
          <button onClick={handleConvert}>Convert</button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>Converted Value: {convertedValue}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;