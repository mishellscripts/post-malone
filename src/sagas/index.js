import { put, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from '../actions/types';
import { fetchPosts } from '../api';

export function* fetchPostsSaga() {
  try {
    const posts = yield fetchPosts();
    yield put({ type: FETCH_POSTS_SUCCESS, posts });
  } catch (error) {
    yield put({ type: FETCH_POSTS_ERROR, error });
  }
}

function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchPosts(),
  ]);
}