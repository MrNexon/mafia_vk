import { applyMiddleware, combineReducers, createStore } from 'redux';
import { AuthReducer } from '../Auth/AuthReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserReducer } from '../User/UserReducer';

export const rootStore = createStore(
  combineReducers({
    Auth: AuthReducer,
    User: UserReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
