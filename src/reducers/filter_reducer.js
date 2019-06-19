import { FILTER_BY_TAGS } from '../actions/types';
const initialState = {
  filter_style: [],
  filter_age: [],
  filter_TPO: [],
  filter_region: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_BY_TAGS:
      return {
        ...state,
        filter_style: action.payload['style'],
        filter_age: action.payload['age'],
        filter_TPO: action.payload['TPO'],
        filter_region: action.payload['region'],
      };
    default:
      return state;
  }
}
