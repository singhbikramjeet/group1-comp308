import * as actionTypes from '../constants/alertConstants'

export const getAlertReducer = (state = { alerts: null }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALERTS_REQUEST:
      return {
        alerts_loading: true,
        alerts: null
      }

    case actionTypes.GET_ALERTS_SUCCESS:
      return {
        alerts_loading: false,
        alerts: action.payload
      }
    case actionTypes.GET_ALERTS_FAIL:
      return {
        alerts_loading: false,
        error: action.payload
      }

    default:
      return state
  }
}