import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  programListReducer,
  programDetailsReducer
} from './reducers/programReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from './reducers/userReducers'
import { coachLoginReducer } from './reducers/coachReducers'

const reducer = combineReducers({
  programList: programListReducer,
  programDetails: programDetailsReducer,
  userLogin: userLoginReducer,
  coachLogin: coachLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const coachInfoFromStorage = localStorage.getItem('coachInfo')
  ? JSON.parse(localStorage.getItem('coachInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  coachLogin: { coachInfo: coachInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
