// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { RSAAMiddleware } from '../build_npm';
import topReducer from './reducers';
import initialState from './initialState';
import App from './containers/App';
import './styles/appStyles.scss';

const createStoreWithMiddleware = applyMiddleware(RSAAMiddleware)(createStore);
const configureStore = initState =>
  createStoreWithMiddleware(topReducer, initState);
const store = configureStore(initialState);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    // $FlowFixMe
    document.getElementById('root'),
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./containers/App', () => {
    render(require('./containers/App').default); // eslint-disable-line global-require
  });
}
