import { runSaga } from 'redux-saga';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from '../../actions/types';
import * as api from '../../api';
import { fetchPosts } from '../fetchPosts';

describe('fetchPosts', () => {
  it('should call api and dispatch success action', async () => {
    const mockPostsData = [];
    const requestPosts = jest.spyOn(api, 'fetchPosts')
      .mockImplementation(() => Promise.resolve(mockPostsData));
  
    const dispatched = [];
    const result = await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([{ type: FETCH_POSTS_SUCCESS, posts: mockPostsData }]);
  });

  it('should call api and dispatch error action', async () => {
    const mockError = {};
    const requestPosts = jest.spyOn(api, 'fetchPosts')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched = [];
    const result = await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([{ type: FETCH_POSTS_ERROR, error: mockError }]);
  });
});