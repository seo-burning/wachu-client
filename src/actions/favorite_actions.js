import { ADD_FAVORITES, DEL_FAVORITES } from './types';

export const addFavorite = store => {
  return { type: ADD_FAVORITES, payload: store };
};

export const delFavorite = store => {
  return { type: DEL_FAVORITES, payload: store };
};
