import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {
  getUserReducer
} from './reducers/userReducers'
import {
  getAlertReducer
} from './reducers/alertReducers'

const reducer = combineReducers({
  user: getUserReducer,
  alert: getAlertReducer
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store