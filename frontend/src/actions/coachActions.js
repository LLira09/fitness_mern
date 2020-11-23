import axios from 'axios'
import {
  COACH_LOGIN_REQUEST,
  COACH_LOGIN_SUCCESS,
  COACH_LOGIN_FAIL,
  COACH_LOGOUT
} from '../constants/coachConstants'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: COACH_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/coaches/login',
      { email, password },
      config
    )

    dispatch({
      type: COACH_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('coachInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: COACH_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const coachLogout = () => dispatch => {
  localStorage.removeItem('coachInfo')
  dispatch({ type: COACH_LOGOUT })
}
