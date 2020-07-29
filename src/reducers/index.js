import { combineReducers } from 'redux';
import postsReducer from './posts';
import modalReducer from './modal';

const rootReducer = combineReducers({
  posts: postsReducer,
  modal: modalReducer,
});

export default rootReducer;