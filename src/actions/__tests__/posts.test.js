import { fetchPosts, updatePost, filterPosts } from '../posts';
import { FETCH_POSTS, UPDATE_POST, FILTER_POSTS } from '../types';


describe('Post Actions', () => {
  const mockPostData = {
    id: 1,
    title: 'Hello',
    body: 'Hello world',
  };

  it('fetchPosts should create FETCH_POSTS action', () => {
    expect(fetchPosts()).toEqual({
      type: FETCH_POSTS
    });
  });

  it('updatePost should create UPDATE_POST action', () => {
    expect(
      updatePost(mockPostData)
    ).toEqual({
      type: UPDATE_POST,
      post: mockPostData,
    });
  });
  
  it('filterPosts should create FILTER_POSTS action', () => {
    expect(
      filterPosts('Hello')
    ).toEqual({
      type: FILTER_POSTS,
      title: 'Hello',
    });
  });
});