import { combineReducers, createStore } from 'redux';
import moneyReducer from './reducers/money';
import notifyReducer from './reducers/notify';

const store = createStore(
  combineReducers({
    money: moneyReducer,
    notify: notifyReducer,
  }),
);

export default store;
