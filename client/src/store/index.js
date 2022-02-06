import {createStore, combineReducers, applyMiddleware} from 'redux';
import { userReducer } from './user/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage';
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user']
// }

const rootReducer = combineReducers({
    user: userReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const fetchMiddleWare = store => next => action => {
//     console.log(action)
// }

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

// export const persistedStore = persistStore(store)