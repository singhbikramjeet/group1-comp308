import * as actionTypes from '../constants/userConstants'

export const getUserReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REQUEST:
      return {
        profile_loading: true,
        profile: null
      }

    case actionTypes.GET_USER_SUCCESS:
      return {
        profile_loading: false,
        profile: action.payload
      }
    case actionTypes.GET_USER_FAIL:
      return {
        profile_loading: false,
        error: action.payload
      }

    case actionTypes.USER_LOGOUT_SUCCESS:
    case actionTypes.USER_LOGOUT_FAIL:
      return {
        profile_loading: false,
        profile: action.payload
      }

    default:
      return state
  }
}