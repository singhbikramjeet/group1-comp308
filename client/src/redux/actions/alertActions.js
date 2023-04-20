import * as actionTypes from '../constants/alertConstants'
import axios from 'axios'

export const getAlerts = () => (dispatch) => {
  axios.defaults.withCredentials = true

  dispatch({ type: actionTypes.GET_ALERTS_REQUEST })

  axios.get('http://localhost:5000/api/nurse/getAlerts')
  .then(({data}) => {
    dispatch({
      type: actionTypes.GET_ALERTS_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    if (err.response.data.msg) {
      // alert(err.response.data.msg);
      dispatch({
        type: actionTypes.GET_ALERTS_FAIL,
        payload: err.response.data.msg
      })
    } else{
      dispatch({
        type: actionTypes.GET_ALERTS_FAIL,
        payload: 'GET ALERTS FAIL'
      })
    }
  })
}