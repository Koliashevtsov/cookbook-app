import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { recipes, auth } from './reducers';

const enhancer = compose(
    applyMiddleware(thunk),
    persistState()
)
const rootReducer = combineReducers({
    auth,
    recipes
})

const store = createStore(rootReducer, enhancer);

export default store;
