import { openEditModal, closeEditModal } from '../modal';
import { OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL } from '../types';


describe('Modal Actions', () => {
  const mockPostData = {
    id: 1,
    title: 'Hello',
    body: 'Hello world',
  };

  it('openEditModal should create OPEN_EDIT_MODAL action', () => {
    expect(openEditModal(mockPostData)).toEqual({
      type: OPEN_EDIT_MODAL,
      post: mockPostData,
    });
  });

  it('closeEditModal should create CLOSE_EDIT_MODAL action', () => {
    expect(closeEditModal()).toEqual({
      type: CLOSE_EDIT_MODAL,
    });
  });
});