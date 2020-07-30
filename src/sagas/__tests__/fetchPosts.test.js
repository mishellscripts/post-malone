import { runSaga } from 'redux-saga';
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from '../../actions/types';
import * as api from '../../api';
import { fetchPosts } from '../fetchPosts';

describe('fetchPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should call api and dispatch success action', async () => {
    const mockPostsData = [];
    const requestPosts = jest.spyOn(api, 'fetchPosts')
      .mockImplementation(() => Promise.resolve(mockPostsData));
  
    const dispatched = [];
    const result = await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      { type: FETCH_POSTS_SUCCESS, posts: mockPostsData },
    ]);
  });

  it('should call api and dispatch error action', async () => {
    const mockError = {
      status: 404,
      message: 'Not found',
    };
    const requestPosts = jest.spyOn(api, 'fetchPosts')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched = [];
    const result = await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      { type: FETCH_POSTS_ERROR, error: mockError },
    ]);
  });
});