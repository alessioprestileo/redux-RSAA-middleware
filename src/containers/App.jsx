// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import type { Action, State } from '../types';
import {
  STARTED_FETCHING_USERS,
  FINISHED_FETCHING_USERS,
  UPDATE_USERS_WITH_FETCHED,
} from '../actions/actionTypes';

const App = (props) => {
  const appTitle = 'This is a seed for a React project';

  const dispatchSyncAction = () =>
    props.storeActions.setSampleProp({ sampleProp1: 'newProp1' });
  const dispatchAsyncAction = () => {
    props.storeActions.createRSAA({
      method: 'post',
      path: 'https://jsonplaceholder.typicode.com/posts',
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
      headers: {
        'my-header': 'hello, this is my header',
      },
      startedSendingAction: {
        type: STARTED_FETCHING_USERS,
        payload: null,
      },
      finishedSendingAction: {
        type: FINISHED_FETCHING_USERS,
        payload: null,
      },
      successAction: {
        type: UPDATE_USERS_WITH_FETCHED,
        payload: {},
      },
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">{appTitle}</h1>
      </header>
      <div className="page">Insert the app content here.</div>
      <button onClick={dispatchSyncAction}>DISPATCH SYNCROUNOUS</button>
      <button onClick={dispatchAsyncAction}>DISPATCH ASYNCROUNOUS</button>
    </div>
  );
};

const mapStateToProps = (state: State) => ({ storeState: state });
const mapDispatchToProps = (dispatch: Dispatch<Action>): Object => ({
  storeActions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
