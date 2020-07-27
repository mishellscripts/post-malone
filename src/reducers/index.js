import * as types from '../actions/types';

const initialState = {
  posts: [],
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return { ...state, loading: true };
    case types.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts, loading: false };
    case types.FETCH_POSTS_ERROR:
      return { ...state, error: action.error, loading: false }
    default:
      return state;
  }
};
  
export default reducer;