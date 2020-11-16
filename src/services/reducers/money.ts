import { createReducer } from '@reduxjs/toolkit';
import {
  addInComming,
  addOutComming,
  deleteInComming,
  deleteOutComming,
  updateInComming,
  updateOutComming,
} from '../actions/money';

type MoneyReducer = {
  inComing: any[];
  outComing: any[];
};

const initMoneyState: MoneyReducer = {
  inComing: [],
  outComing: [],
};

const moneyReducer = createReducer(initMoneyState, (builder) => {
  builder
    .addCase(addInComming, (state, action) => {
      state.inComing = [action.payload, ...state.inComing];
    })
    .addCase(updateInComming, (state, action) => {
      state.inComing = state.inComing.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    })
    .addCase(deleteInComming, (state, action) => {
      state.inComing = state.inComing.filter(
        (item) => item.id !== action.payload.id,
      );
    })
    .addCase(addOutComming, (state, action) => {
      state.outComing = [action.payload, ...state.outComing];
    })
    .addCase(updateOutComming, (state, action) => {
      state.outComing = state.outComing.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    })
    .addCase(deleteOutComming, (state, action) => {
      state.outComing = state.outComing.filter(
        (item) => item.id !== action.payload.id,
      );
    });
});

export default moneyReducer;
