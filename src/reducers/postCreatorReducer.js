import { UPLOAD_POST_CREATORS } from '../actions/types';

const postCreatorReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_POST_CREATORS:
      return payload;

    default:
      return state;
  }
};

export default postCreatorReducer;
