import React from 'react';
import { screen } from '@testing-library/dom'
import { fireEvent } from '@testing-library/react';
import { render } from '../../utils';
import EditPostModal from '../EditPostModal';


describe('EditPostModal' , () => {
  const mockPost = {
    id: 1,
    userId: 1,
    title: 'Title',
    body: 'Body',
  };

  it('Should render without crashing', () => {
    render(<EditPostModal />);
  });

  it('Should update form input when props are passed', () => {
    const initialState = { modal: { open: true, ...mockPost } };
    const modal = render(<EditPostModal />, { initialState });
    expect(modal.getByLabelText('Title').value).toEqual(mockPost.title);
    expect(modal.getByLabelText('Body').value).toEqual(mockPost.body);
  });

  it('should be closed when editing is complete', () => {
    const initialState = { modal: { open: true, ...mockPost } };
    const modal = render(<EditPostModal />, { initialState });
    fireEvent.click(
      modal.getByRole('button', { name: 'Edit' })
    );
    expect(screen.queryByRole('presentation')).toBeNull();
  });

  it('should be closed when close button is clicked', () => {
    const initialState = { modal: { open: true } };
    const modal = render(<EditPostModal />, { initialState });
    fireEvent.click(
      modal.getByRole('button', { name: 'Close Modal' })
    );
    expect(screen.queryByRole('presentation')).toBeNull();
  });

  it('should show errors if empty title and body are submitted', () => {
    const initialState = { modal: { open: true } };
    const modal = render(<EditPostModal />, { initialState });
    fireEvent.click(
      modal.getByRole('button', { name: 'Edit' })
    );
    expect(modal.queryByText('Title cannot be empty')).not.toBeNull();
    expect(modal.queryByText('Body cannot be empty')).not.toBeNull();
  });
});