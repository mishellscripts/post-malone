import React from 'react';
import { createStore } from 'redux'
import { render } from '../../utils';
import Posts from '../Posts';


describe('Posts' , () => {
  const mockPosts = [
    {
      id: 1,
      userId: 1,
      title: 'Title',
      body: 'Body',
    },
  ];

  it('should render without crashing', () => {
    render(<Posts posts={mockPosts} />);
  });

  it('should render loader while fetching', () => {
    const initialState = { posts: { loading: true, posts: [] } };
    const { container } = render(<Posts />, { initialState });
    expect(container.querySelector(['[data-test="loaderComponent"'])).toBeTruthy();
  });

  it('should render posts container when fetch complete', () => {
    const store = createStore(() => ({ posts: { loading: false, posts: mockPosts } }))
    const { container } = render(<Posts />, { store });
    expect(container.querySelector(['[data-test="postsContainer"'])).toBeTruthy();
  });
  
  it('should render error message on error', () => {
    const mockError = {
      status: 404,
      message: 'Not found',
    };
    const { container } = render(<Posts />, {
      initialState: { posts: { error: mockError, posts: [] } },
    });
    expect(container.querySelector(['[data-test="errorMessage"'])).toHaveTextContent(mockError.message);
  });
});