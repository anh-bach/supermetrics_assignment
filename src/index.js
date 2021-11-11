import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import { store, persistor } from './redux-persist/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
