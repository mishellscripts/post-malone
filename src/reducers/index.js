import { combineReducers } from 'redux';
import postsReducer, { initialState as postsInitialState } from './posts';
import modalReducer, { initialState as modalInitialState } from './modal';

export const initialState = {
  posts: postsInitialState,
  modal: modalInitialState,
};

const rootReducer = combineReducers({
  posts: postsReducer,
  modal: modalReducer,
});

export default rootReducer;