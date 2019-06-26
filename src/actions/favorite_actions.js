import {
  ADD_FAVORITES,
  DEL_FAVORITES,
  ADD_FAVORITES_PRODUCT,
  DEL_FAVORITES_PRODUCT,
} from './types';

export const addFavorite = store => {
  return { type: ADD_FAVORITES, payload: store };
};

export const delFavorite = store => {
  return { type: DEL_FAVORITES, payload: store };
};

export const addFavoriteProduct = product => {
  return { type: ADD_FAVORITES, payload: product };
};

export const delFavoriteProduct = product => {
  return { type: DEL_FAVORITES, payload: product };
};
