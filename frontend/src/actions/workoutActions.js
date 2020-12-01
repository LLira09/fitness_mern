import axios from 'axios'
import {
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_CREATE_RESET
} from '../constants/workoutConstants'

export const createUserWorkout = (userId, workout) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: WORKOUT_CREATE_REQUEST })
    const {
      coachLogin: { coachInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${coachInfo.token}`
      }
    }

    await axios.post(`/api/workouts/${userId}/newworkout`, workout, config)

    dispatch({ type: WORKOUT_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: WORKOUT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
