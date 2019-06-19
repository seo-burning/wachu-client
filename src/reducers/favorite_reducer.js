import { ADD_FAVORITES, DEL_FAVORITES } from '../actions/types';

const initialState = {
  favorites: [],
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
    default:
      return state;
  }
}
