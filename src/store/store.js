

import { toyReducer } from './toy/toyReducer'
import { userReducer } from './user/userReducer'
import {legacy_createStore as createStore, compose, combineReducers} from 'redux'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store