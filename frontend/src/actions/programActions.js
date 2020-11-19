import axios from 'axios'
import {
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL
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
