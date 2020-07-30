import posts from '../posts';
import { initialState } from '../posts';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  UPDATE_POST,
  SEARCH_POSTS,
} from '../../actions/types';


describe('Posts Reducer', () => {
  const mockPostsData = [
    {
      id: 1,
      title: 'Hello',
      body: 'Hello world',
    },
    {
      id: 2,
      title: 'Hello',
      body: 'This is a second post',
    },
  ];
  
  it('Should handle an initial state', () => {
    expect(posts(undefined, {})).toEqual(initialState);
  });

  it('Should handle FETCH_POSTS_SUCCESS', () => {
    expect(posts(initialState, {
      type: FETCH_POSTS_SUCCESS,
      posts: mockPostsData,
    })).toEqual({
      posts: mockPostsData,
      searchTerm: '',
      loading: false,
      error: null,
    });
  });

  it('Should handle FETCH_POSTS_ERROR', () => {
    const mockError = {
      status: 404,
      message: 'Not Found',
    };
    expect(posts(initialState, {
      type: FETCH_POSTS_ERROR,
      error: mockError,
     })).toEqual({
       posts: [],
       searchTerm: '',
       loading: false,
       error: mockError,
     });
  });

  it('Should handle UPDATE_POST', () => {
    const mockPostData = {
      id: 1,
      title: 'Bye',
      body: 'Bye world',
    }
    expect(posts({
      ...initialState,
      posts: mockPostsData,
    }, {
      type: UPDATE_POST,
      post: mockPostData,
    })).toEqual({
      ...initialState,
      posts: [
        {
          id: 1,
          title: 'Bye',
          body: 'Bye world',
        },
        {
          id: 2,
          title: 'Hello',
          body: 'This is a second post',
        },
      ],
    });
  });

  it('Should handle SEARCH_POSTS', () => {
    expect(posts(initialState, {
      type: SEARCH_POSTS,
      title: 'Hello',
    })).toEqual({
      ...initialState,
      searchTerm: 'Hello',
    });
  });
});