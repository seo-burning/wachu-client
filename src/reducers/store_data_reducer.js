import { LOAD_STORE_DATA } from '../actions/types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_STORE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
