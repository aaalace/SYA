import {createStore, combineReducers, applyMiddleware} from 'redux';
import { userReducer } from './user/reducer';
import { postsReducer } from './profilePosts/reducer';
import { currentPostReduser } from './currentPost/reducer';
import { openedProfileReducer } from './openedProfile/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainPagePostsReducer } from './MainPagePosts';
import { AllPagePostsReducer } from './AllPostsPage/reducer';
import { rolledMediaRuducer } from './rolledMedia/reducer';
import { ForumReducer } from './Forum';
import { UsersReducer } from './usersData';
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
    profilePosts: postsReducer,
    current_post: currentPostReduser,
    opened_profile: openedProfileReducer,
    mainPagePosts: mainPagePostsReducer,
    allPagePosts: AllPagePostsReducer,
    rolledMedia: rolledMediaRuducer,
    forum: ForumReducer,
    users: UsersReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

// export const persistedStore = persistStore(store)