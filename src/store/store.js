import { combineReducers, compose, legacy_createStore as createStore } from "redux";
import { toyReducer } from "./toy/toyReducer";



const rootReducer = combineReducers({
    toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

 export const store = createStore(rootReducer, composeEnhancers())

 window.gStore = store
