import axios from 'axios'
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
  LIST_COACH_DETAILS_REQUEST,
  LIST_COACH_DETAILS_SUCCESS,
  LIST_COACH_DETAILS_FAIL
} from '../constants/coachConstants'
import { USER_LIST_RESET } from '../constants/userConstants'

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
  dispatch({ type: USER_LIST_RESET })
}

export const getCoachDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_DETAILS_REQUEST
    })

    const {
      coachLogin: { coachInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${coachInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/coaches/${id}`, config)

    dispatch({
      type: COACH_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COACH_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateCoachProfile = coach => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_UPDATE_PROFILE_REQUEST
    })

    const {
      coachLogin: { coachInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${coachInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/coaches/profile`, coach, config)

    dispatch({
      type: COACH_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COACH_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listCoaches = () => async dispatch => {
  try {
    dispatch({ type: COACH_LIST_REQUEST })

    const { data } = await axios.get('/api/coaches')

    dispatch({ type: COACH_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COACH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listCoachDetails = id => async dispatch => {
  try {
    dispatch({ type: LIST_COACH_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/coaches/coach/${id}`)

    dispatch({ type: LIST_COACH_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LIST_COACH_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createCoachReview = (coachId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COACH_CREATE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/coaches/${coachId}/reviews`, review, config)

    dispatch({ type: COACH_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({
      type: COACH_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
