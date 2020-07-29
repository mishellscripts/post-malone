import { fetchPosts, updatePost, searchPosts } from '../posts';
import { FETCH_POSTS, UPDATE_POST, SEARCH_POSTS } from '../types';


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
  
  it('searchPosts should create SEARCH_POSTS action', () => {
    expect(
      searchPosts({ title: 'Hello' })
    ).toEqual({
      type: SEARCH_POSTS,
      title: 'Hello',
    });
  });
});