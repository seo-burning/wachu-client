import {
  ADD_FAVORITES,
  DEL_FAVORITES,
  ADD_FAVORITES_PRODUCT,
  DEL_FAVORITES_PRODUCT,
} from '../actions/types';

const initialState = {
  favorites: [],
  favoritesProdoct: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.concat(action.payload),
      };
    case DEL_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item !== action.payload),
      };
    case ADD_FAVORITES_PRODUCT:
      return {
        ...state,
        favoritesProdoct: state.favoritesProdoct.concat(action.payload),
      };
    case DEL_FAVORITES_PRODUCT:
      return {
        ...state,
        favoritesProdoct: state.favoritesProdoct.filter(
          item => item !== action.payload,
        ),
      };
    default:
      return state;
  }
}
