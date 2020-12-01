import {
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_CREATE_RESET
} from '../constants/workoutConstants'

export const workoutCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_CREATE_REQUEST:
      return {
        loading: true
      }
    case WORKOUT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case WORKOUT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case WORKOUT_CREATE_RESET:
      return {}
    default:
      return state
  }
}
