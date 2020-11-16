import { createAction } from '@reduxjs/toolkit';

export const addInComming = createAction('INCOMING/ADD', (payload) => {
  return {
    payload,
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
    payload,
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
