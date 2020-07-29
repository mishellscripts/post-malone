import {
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
} from '../actions/types';

export const initialState = {
  open: false,
  id: null,
  userId: null,
  title: '',
  body: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return {
        ...state,
        open: true,
        id: action.post.id,
        userId: action.post.userId,
        title: action.post.title,
        body: action.post.body,
      };
    case CLOSE_EDIT_MODAL:
      return initialState;
    default:
      return state;
  }
};
  
export default reducer;