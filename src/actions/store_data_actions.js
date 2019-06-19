import { LOAD_STORE_DATA } from './types';

export const loadStoreData = data => {
  return {
    type: LOAD_STORE_DATA,
    payload: data,
  };
};
