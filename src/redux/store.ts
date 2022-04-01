import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { usersReducer } from './reducers/users';

const rootReducer = combineReducers({
  users: usersReducer,
});

type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;
