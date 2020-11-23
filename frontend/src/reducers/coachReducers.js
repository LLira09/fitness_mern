import {
  COACH_LOGIN_REQUEST,
  COACH_LOGIN_SUCCESS,
  COACH_LOGIN_FAIL,
  COACH_LOGOUT
} from '../constants/coachConstants'

export const coachLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case COACH_LOGIN_REQUEST:
      return { loading: true }
    case COACH_LOGIN_SUCCESS:
      return { loading: false, coachInfo: action.payload }
    case COACH_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case COACH_LOGOUT:
      return {}
    default:
      return state
  }
}
