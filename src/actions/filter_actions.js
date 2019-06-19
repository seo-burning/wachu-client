import { FILTER_BY_TAGS } from './types';

export const filterByTags = tag => {
  return {
    type: FILTER_BY_TAGS,
    payload: tag,
  };
};
