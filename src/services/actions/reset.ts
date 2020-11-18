import { createAction } from '@reduxjs/toolkit';

export const resetStore = createAction('STORE/RESET', () => {
  return {
    payload: null,
  };
});
