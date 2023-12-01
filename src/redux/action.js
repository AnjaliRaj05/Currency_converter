// redux/actions.js
export const setExchangeRate = (rate) => ({
    type: 'SET_EXCHANGE_RATE',
    payload: rate,
  });
  
  export const setConvertedValue = (value) => ({
    type: 'SET_CONVERTED_VALUE',
    payload: value,
  });
  