import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  programListReducer,
  programDetailsReducer
} from './reducers/programReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from './reducers/userReducers'
import {
  coachLoginReducer,
  coachDetailsReducer,
  coachUpdateProfileReducer,
  coachListReducer,
  listCoachDetailsReducer
} from './reducers/coachReducers'
import { orderCreateReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  programList: programListReducer,
  programDetails: programDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  coachLogin: coachLoginReducer,
  coachDetails: coachDetailsReducer,
  coachUpdateProfile: coachUpdateProfileReducer,
  coachList: coachListReducer,
  listCoachDetails: listCoachDetailsReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const coachInfoFromStorage = localStorage.getItem('coachInfo')
  ? JSON.parse(localStorage.getItem('coachInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  coachLogin: { coachInfo: coachInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
