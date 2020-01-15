import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from '../../auth/auth.reducer'
import eventStream from '../../eventStream/eventStream.reducer'
import apis from '../../apis/apis.reducer'

export default combineReducers({
    auth,
    eventStream,
    apis,
    form: formReducer,
})

