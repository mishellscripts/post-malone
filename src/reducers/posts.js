import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  UPDATE_POST,
  FILTER_POSTS,
} from '../actions/types';


export const initialState = {
  posts: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        loading: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => post.id === action.post.id ? action.post : post),
      };
    case FILTER_POSTS:
      return {
        ...state,
        searchTerm: action.title,
      };
    default:
      return state;
  }
};
  
export default reducer;