import axios from 'axios'
import {
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_CREATE_RESET,
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_LIST_RESET
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

export const listMyWorkouts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_LIST_REQUEST
    })
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/workouts`, config)

    dispatch({
      type: WORKOUT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: WORKOUT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
