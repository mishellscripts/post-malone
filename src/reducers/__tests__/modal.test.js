import modal from '../modal';
import { initialState } from '../modal';
import { OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL } from '../../actions/types';


describe('Modal Reducer', () => {
  const mockPostData = {
    id: 1,
    userId: 1,
    title: 'Hello',
    body: 'Hello world',
  };

  it('Should handle an initial state', () => {
    expect(modal(undefined, {})).toEqual(initialState);
  });

  it('Should handle OPEN_EDIT_MODAL', () => {
    expect(modal(initialState, {
      type: OPEN_EDIT_MODAL,
      post: mockPostData,
    })).toEqual({
      ...mockPostData,
      open: true,
    });
  });

  it('Should handle CLOSE_EDIT_MODAL', () => {
    expect(modal({
      ...mockPostData,
      open: true,
    }, { type: CLOSE_EDIT_MODAL })).toEqual(initialState);
  });
  
});