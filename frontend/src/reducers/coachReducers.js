import {
  COACH_LOGIN_REQUEST,
  COACH_LOGIN_SUCCESS,
  COACH_LOGIN_FAIL,
  COACH_LOGOUT,
  COACH_DETAILS_REQUEST,
  COACH_DETAILS_SUCCESS,
  COACH_DETAILS_FAIL,
  COACH_UPDATE_PROFILE_REQUEST,
  COACH_UPDATE_PROFILE_SUCCESS,
  COACH_UPDATE_PROFILE_FAIL
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

export const coachDetailsReducer = (state = { coach: {} }, action) => {
  switch (action.type) {
    case COACH_DETAILS_REQUEST:
      return { ...state, loading: true }
    case COACH_DETAILS_SUCCESS:
      return { loading: false, coach: action.payload }
    case COACH_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coachUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case COACH_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case COACH_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, coachInfo: action.payload }
    case COACH_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
