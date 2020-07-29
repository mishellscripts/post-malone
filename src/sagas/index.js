import { all } from 'redux-saga/effects';
import { watchFetchPosts } from './fetchPosts';

export default function* rootSaga() {
  yield all([
    watchFetchPosts(),
  ]);
}