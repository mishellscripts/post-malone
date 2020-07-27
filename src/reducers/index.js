import * as types from '../actions/types';

const initialState = {
  initialPosts: [], //cache the initial api post in case user resets the search 
  posts: [],
  loading: false,
  error: false,
  modalData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return { ...state, loading: true };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        initialPosts: action.posts,
        posts: action.posts,
        loading: false
      };
    case types.FETCH_POSTS_ERROR:
      return { ...state, error: true, loading: false };
    case types.FILTER_POSTS:
      return {
        ...state,
        posts: action.title === '' ? state.posts : state.posts.filter((post) => post.title.includes(action.title)),
      };
    case types.OPEN_EDIT_MODAL:
      return {
        ...state,
        modalData: action.modalData,
      };
    case types.CLOSE_EDIT_MODAL:
      return {
        ...state,
        modalData: null,
      }
    case types.UPDATE_POST:
      const posts = state.posts.map((post) => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      });
      return {
        ...state,
        posts,
        initialPosts: posts,
      };
    default:
      return state;
  }
};
  
export default reducer;