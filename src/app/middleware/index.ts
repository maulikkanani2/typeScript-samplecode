import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware()

const middlewares = [
    thunk,
    // logger,
    sagaMiddleware
]

export default middlewares
