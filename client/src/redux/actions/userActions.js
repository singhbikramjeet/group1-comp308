import * as actionTypes from '../constants/userConstants'
import axios from 'axios'

export const getUser = () => (dispatch) => {
  axios.defaults.withCredentials = true

  dispatch({ type: actionTypes.GET_USER_REQUEST })

  axios.get('http://localhost:5000/api/user/userinfo')
  .then(({data}) => {
    dispatch({
      type: actionTypes.GET_USER_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    if (err.response.data.msg) {
      // alert(err.response.data.msg);
      dispatch({
        type: actionTypes.GET_USER_FAIL,
        payload: err.response.data.msg
      })
    } else{
      dispatch({
        type: actionTypes.GET_USER_FAIL,
        payload: 'GET USER FAIL'
      })
    }
  })
}

export const logout = () => (dispatch) => {
  axios.defaults.withCredentials = true

  dispatch({ type: actionTypes.USER_LOGOUT_REQUEST })

  axios.get('http://localhost:5000/api/user/logout')
    .then(() => {
      dispatch({
        type: actionTypes.USER_LOGOUT_SUCCESS,
        payload: null
      })
    })
    .catch(err => {
      if (err.response.data.msg) {
        alert(err.response.data.msg);
        dispatch({
          type: actionTypes.USER_LOGOUT_FAIL,
          payload: err.response.data.msg
        })
      } else {
        dispatch({
          type: actionTypes.USER_LOGOUT_FAIL,
          payload: 'USER LOGOUT FAIL'
        })
      }
    })
}