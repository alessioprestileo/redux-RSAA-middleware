# Redux RSAA Middleware

Redux middleware for handling API-calling actions.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contribute to the Project](#contribute-to-the-project)
  - [Initialize the Project](#initialize-the-project)
  - [Available Scripts](#available-scripts)
    - [npm start](#npm-start)
    - [npm run build:dev](#npm-run-build-dev)
    - [npm run build:prod](#npm-run-build-prod)
    - [npm run flow](#npm-run-flow)
    - [npm run flow-typed-install](#npm-run-flow-typed-install)
    - [npm run initialize-project](#npm-run-initialize-project)
    - [npm run lint:fix](#npm-run-lint-fix)
    - [npm run lint:log](#npm-run-lint-log)
    - [npm run precommit](#npm-run-precommit)
    - [npm run serve:dev](#npm-run-serve-dev)
    - [npm run serve:prod](#npm-run-serve-prod)
    - [npm run test](#npm-run-test)

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
import { RSAAMiddleware } from 'redux-rsaa-middleware';
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

When such an action is dispatched, the middleware will attempt to send a request using the values of the payload properties ```method```, ```path``` and ```query```, and dispatch during the process the actions contained in the following properties:

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

## Contribute to the Project

- ## Initialize the Project

  In order to install the dependencies needed by this project and the types needed to perform static type checking with flow, run the following command from within the project directory:\
  `npm run initialize-project`

- ## Available Scripts

  In the project directory, you can run:

  - <a id="npm-start"></a>`npm start`

    Alias for `npm run serve:dev`.

  - <a id="npm-run-build-dev"></a>`npm run build:dev`

    Runs all tests, linting and static type checking, then creates a development build of the app.\
    The resulting build can be found in the directory "build_dev".

  - <a id="npm-run-build-prod"></a>`npm run build:prod`

    Runs all tests, linting and static type checking, then creates a production build of the app.\
    The resulting build can be found in the directory "build_prod".

  - <a id="npm-run-flow"></a>`npm run flow`

    Performs statyc type checking on all files annotated with "// @flow".

  - <a id="npm-run-flow-typed-install"></a>`npm run flow-typed-install`

    Installs available flow types for all project dependencies. Creates stub flow types of type "any" when flow types are not available.

  - <a id="npm-run-initialize-project"></a>`npm run initialize-project`

    Runs `npm install` to install all the npm dependencies, and then `npm run flow-typed-install`.

  - <a id="npm-run-lint-fix"></a>`npm run lint:fix`

    Runs eslint on all files within the project, as specified in .eslintrc.json and .eslintignore.\
    Fixes the problems found.

  - <a id="npm-run-lint-log"></a>`npm run lint:log`

    Runs eslint on all files within the project, as specified in .eslintrc.json and .eslintignore.\
    Logs the results.

  - <a id="npm-run-precommit"></a>`npm run precommit`

    Runs all tests, formatting, linting and static type checking.\
    It is run automatically by husky on `git commit`.

  - <a id="npm-run-serve-dev"></a>`npm run serve:dev`

    Runs all tests, linting and static type checking, then builds and runs the app in development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
    The page will reload if you make edits.\
    You will also see any lint errors in the console.

  - <a id="npm-run-serve-prod"></a>`npm run serve:prod`

    Runs all tests, linting and static type checking, then builds and runs the app in production mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  - <a id="npm-run-test"></a>`npm run test`

    Finds all files with extension ".test.js" and ".test.jsx" within the project and runs the tests they contain.