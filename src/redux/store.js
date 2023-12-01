
import {createStore} from 'redux'
import currencyReducer from './reducer'
const store = createStore(currencyReducer);

export default store;
