import {
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  PROGRAM_DETAILS_REQUEST,
  PROGRAM_DETAILS_SUCCESS,
  PROGRAM_DETAILS_FAIL
} from '../constants/programConstants'

export const programListReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case PROGRAM_LIST_REQUEST:
      return { loading: true, programs: [] }
    case PROGRAM_LIST_SUCCESS:
      return { loading: false, programs: action.payload }
    case PROGRAM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const programDetailsReducer = (
  state = { program: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PROGRAM_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PROGRAM_DETAILS_SUCCESS:
      return { loading: false, program: action.payload }
    case PROGRAM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
