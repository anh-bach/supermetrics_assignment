import { combineReducers } from 'redux';

import userReducer from './userReducer';
import postCreatorReducer from './postCreatorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  postCreators: postCreatorReducer,
});

export default rootReducer;
