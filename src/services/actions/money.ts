import { createAction } from '@reduxjs/toolkit';

export const setReportType = createAction('REPORT/SET_TYPE', (payload) => {
  return {
    payload,
  };
});

export const addInComming = createAction('INCOMING/ADD', (payload) => {
  return {
    payload: {
      ...payload,
      incoming: true,
    },
  };
});

export const updateInComming = createAction('INCOMING/UPDATE', (payload) => {
  return {
    payload,
  };
});

export const deleteInComming = createAction('INCOMING/DELETE', (payload) => {
  return {
    payload,
  };
});

export const addOutComming = createAction('OUTCOMING/ADD', (payload) => {
  return {
    payload: {
      ...payload,
      incoming: false,
    },
  };
});

export const updateOutComming = createAction('OUTCOMING/UPDATE', (payload) => {
  return {
    payload,
  };
});

export const deleteOutComming = createAction('OUTCOMING/DELETE', (payload) => {
  return {
    payload,
  };
});
