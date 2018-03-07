# Redux RSAA Middleware

Redux middleware for handling API-calling actions.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Introduction

This middleware intercepts and handles actions of type ```'RSAA'``` and forwards to the next middleware actions of any other type.

## Installation

To install this package, run:

```npm install redux-rsaa-middleware --save```

## Usage

The middleware can be applied to your Redux store by including the following code in the entry point of your project (for example index.jsx)\
Notice that ```topReducer``` and ```initialState``` need to be defined within your project.

```js

import { createStore, applyMiddleware } from 'redux';
import RSAAMiddleware from 'redux-rsaa-middleware';
import topReducer from './reducers';
import initialState from './initialState';

const createStoreWithMiddleware = applyMiddleware(RSAAMiddleware)(createStore);
const configureStore = initState =>
  createStoreWithMiddleware(topReducer, initState);
const store = configureStore(initialState);

```

The middleware will intercept and handle actions of type ```'RSAA'```, which must respect the following type definition:

```js

{
  type: 'RSAA',
  payload: {
    method?: string,
    path?: string,
    query?: string,
    error?: Object,
    errorTime?: string,
    response?: Object,
    failureAction?: Action,
    successAction?: Action,
    startedSendingAction?: Action,
    finishedSendingAction?: Action,
  },
};

```

When such an action is dispatched, the middleware will attempt to send a request is sent using the values of the payload properties ```method```, ```path``` and ```query```, and dispatch during the process the actions contained in the following properties:

- startedSendingAction

  Is dispatched to let the store know that the process has started.\
  If no value is given to this property, a default action is dispatched, which has type ```'API_CALL_STARTED_SENDING'```, and empty payload.

- successAction

  Is dispatched if the request is successful, to let the store know that the request was successful.\
  The response is inserted into the payload as value of the property ```response```.\
  If no value is given to ```successAction```, a default action is dispatched, which has type ```'API_CALL_SUCCESS'```, and payload as follows:
  ```js
  {
    response: Object
  }
  ```

- failureAction

  Is dispatched if the request fails, to let the store know that the request failed.\
  If no value is given to this property, a default action is dispatched, which has type ```'API_CALL_FAILURE'```, and payload as follows:
  ```js
  {
    error: Object,
    errorTime: string,
  }
  ```

- finishedSendingAction

  Is dispatched to let the store know that the process has ended.\
  If no value is given to this property, a default action is dispatched, which has type ```'API_CALL_FINISHED_SENDING'```, and empty payload.

## Testing

To run the tests included in this package, run from within ```/node_modules/redux-rsaa-middleware```:

```npm install && npm run test```