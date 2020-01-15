import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import {applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

import awsExports from './aws-exports'
import reducer from './app/reducers'
import middlewares, {sagaMiddleware} from './app/middleware'
import App from './App'
import appSaga from "./app/app.saga";
// import {authSaga} from "./auth/auth.saga";

Amplify.configure(awsExports)

const store = createStore(reducer, applyMiddleware(...middlewares))

sagaMiddleware.run(appSaga)
// sagaMiddleware.run(authSaga)

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ), document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
