// redux/reducers.js
const initialState = {
    exchangeRate: 1, // Default to 1 for the same currency conversion
    convertedValue: '',
  };
  
  const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EXCHANGE_RATE':
        return {
          ...state,
          exchangeRate: action.payload,
        };
      case 'SET_CONVERTED_VALUE':
        return {
          ...state,
          convertedValue: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default currencyReducer;
  