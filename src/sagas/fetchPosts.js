import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from '../actions/types';
import { fetchPosts as fetchPostsApi } from '../api';

export function* fetchPosts() {
  const { posts, error } = yield fetchPostsApi();
  if (posts) {
    yield put({ type: FETCH_POSTS_SUCCESS, posts });
  } else if (error) {
    yield put({ type: FETCH_POSTS_ERROR, error });
  }
}

export function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS, fetchPosts);
}