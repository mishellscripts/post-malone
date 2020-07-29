import {
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
} from './types';

export const openEditModal = (post) => ({
  type: OPEN_EDIT_MODAL,
  post,
});

export const closeEditModal = () => ({
  type: CLOSE_EDIT_MODAL,
});