import { createAction } from '@reduxjs/toolkit';

export const resetStore = createAction('STORE/RESET', () => {
  return {
    payload: null,
  };
});

export const setLoading = createAction('APP/LOADING', (payload: boolean) => {
  return {
    payload,
  };
});
