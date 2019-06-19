import _ from 'lodash';
// import stores from './stores';

const stores = [];
const nameContains = ({ name }, query) => {
  if (query.includes(name)) {
    return true;
  }
  return false;
};

export const getStores = (query = []) => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(stores, 0));
    } else {
      const results = _.filter(stores, store => {
        return nameContains(store, query);
      });
      resolve(_.take(results, 200));
    }
  });
};

export default getStores;

// let output = _.reject(collections, v => _.includes(ids, v.id));
