import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;
