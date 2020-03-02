import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage';

import reducer from './reducers';

const enhancer = compose(
  persistState()
);

const store = createStore(reducer, enhancer);

export default store;
