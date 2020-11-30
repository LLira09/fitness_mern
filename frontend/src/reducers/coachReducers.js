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
  COACH_UPDATE_PROFILE_FAIL,
  COACH_LIST_REQUEST,
  COACH_LIST_SUCCESS,
  COACH_LIST_FAIL,
  COACH_CREATE_REVIEW_REQUEST,
  COACH_CREATE_REVIEW_SUCCESS,
  COACH_CREATE_REVIEW_FAIL,
  COACH_CREATE_REVIEW_RESET,
  LIST_COACH_DETAILS_REQUEST,
  LIST_COACH_DETAILS_SUCCESS,
  LIST_COACH_DETAILS_FAIL
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

export const coachListReducer = (state = { coaches: [] }, action) => {
  switch (action.type) {
    case COACH_LIST_REQUEST:
      return { loading: true, coaches: [] }
    case COACH_LIST_SUCCESS:
      return { loading: false, coaches: action.payload }
    case COACH_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const listCoachDetailsReducer = (
  state = { coach: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case LIST_COACH_DETAILS_REQUEST:
      return { loading: true, ...state }
    case LIST_COACH_DETAILS_SUCCESS:
      return { loading: false, coach: action.payload }
    case LIST_COACH_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coachReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COACH_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case COACH_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case COACH_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case COACH_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
