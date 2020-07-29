import {
  FETCH_POSTS,
  UPDATE_POST,
  SEARCH_POSTS
} from './types';

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const updatePost = (post) => ({
  type: UPDATE_POST,
  post,
})

export const searchPosts = (data) => ({
  type: SEARCH_POSTS,
  title: data.title,
});