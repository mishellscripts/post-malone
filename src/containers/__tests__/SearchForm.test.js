
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../utils';
import SearchForm from '../SearchForm';


describe('SearchForm' , () => {
  const mockPosts = [
    {
      id: 1,
      userId: 1,
      title: 'Hello',
      body: 'World',
    },
  ];

  it('should render without crashing', () => {
    render(<SearchForm posts={mockPosts} />);
  });

  it('should open autocomplete when there are matching results', () => {
    const initialState = { posts: { posts: mockPosts } };
    const search = render(<SearchForm />, { initialState });
    fireEvent.change(
      search.getByPlaceholderText('Search'),
      {
        target: {
          value: 'h',
        },
      },
    );
    expect(search.queryByRole('listbox')).toBeTruthy();
  });

  it('should be disabled when posts are loading', () => {
    const initialState = { posts: { loading: true, posts: [] } };
    const search = render(<SearchForm />, { initialState });
    expect(
      search.getByPlaceholderText('Search'),
    ).toBeDisabled();
  });

  it('should show clear button when there is a value', () => {
    const search = render(<SearchForm />);
    fireEvent.change(
      search.getByPlaceholderText('Search'),
      {
        target: {
          value: 'h',
        },
      },
    );
    expect(
      search.queryByRole('button', { name: 'Clear search' })
    ).toBeTruthy();
  });

  it('should clear input when clear button is clicked', () => {
    const search = render(<SearchForm />);
    const input = search.getByPlaceholderText('Search');
    fireEvent.change(input, {
      target: {
        value: 'h',
      },
    });
    fireEvent.click(
      search.getByRole('button', { name: 'Clear search' })
    );
    expect(input.value).toEqual('');
  });
});