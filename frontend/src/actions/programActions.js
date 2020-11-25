import axios from 'axios'
import {
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  PROGRAM_DETAILS_REQUEST,
  PROGRAM_DETAILS_SUCCESS,
  PROGRAM_DETAILS_FAIL
} from '../constants/programConstants'

export const listPrograms = () => async dispatch => {
  try {
    dispatch({ type: PROGRAM_LIST_REQUEST })

    const { data } = await axios.get('/api/programs')
    dispatch({ type: PROGRAM_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROGRAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listProgramDetails = id => async dispatch => {
  try {
    dispatch({ type: PROGRAM_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/programs/${id}`)

    dispatch({ type: PROGRAM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROGRAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
