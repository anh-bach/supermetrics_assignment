import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

//set up redux persist
const persistConfig = {
  key: 'supermetrics',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Set up redux store
const initialState = {};
const middlewares = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };
