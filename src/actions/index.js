import * as types from './types';

export const fetchPosts = () => ({
  type: types.FETCH_POSTS,
});

export const filterPosts = (data) => ({
  type: types.FILTER_POSTS,
  title: data.title,
});

export const openEditModal = (data) => ({
  type: types.OPEN_EDIT_MODAL,
  modalData: data.modalData,
});

export const closeEditModal = () => ({
  type: types.CLOSE_EDIT_MODAL,
});

export const updatePost = (post) => ({
  type: types.UPDATE_POST,
  post,
})