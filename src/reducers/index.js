import { combineReducers } from 'redux';
import postsReducer, { postsInitialState } from './posts';
import modalReducer, { modalInitialState } from './modal';

export const initialState = {
  posts: postsInitialState,
  modal: modalInitialState,
};

const rootReducer = combineReducers({
  posts: postsReducer,
  modal: modalReducer,
});

export default rootReducer;