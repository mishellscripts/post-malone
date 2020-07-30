import {
  FETCH_POSTS,
  UPDATE_POST,
  FILTER_POSTS,
} from './types';

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const updatePost = (post) => ({
  type: UPDATE_POST,
  post,
})

export const filterPosts = (title) => ({
  type: FILTER_POSTS,
  title,
});