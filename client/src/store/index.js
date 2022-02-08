import {createStore, combineReducers, applyMiddleware} from 'redux';
import { userReducer } from './user/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import { fetchMiddleWare } from '../middleWare';
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

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(fetchMiddleWare))
)

// export const persistedStore = persistStore(store)