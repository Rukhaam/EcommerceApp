// import { act } from "react";
// import { current } from "@reduxjs/toolkit";
import UserActionTypes  from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  error : null,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case UserActionTypes.SIGN_SUCCESS:
        return{
          ...state,
          currentUser :action.payload,
          error : null,
        }
        case UserActionTypes.SIGN_OUT_SUCCESS:
          return{
            ...state,
            currentUser : null,
            error :  null
          }
      case UserActionTypes.SIGN_FAIL:
      case UserActionTypes.SIGN_OUT_FAIL:
      case UserActionTypes.SIGN_UP_FAIL:

        return{
          ...state,
          currentUser :action.payload,
        }
     
    default:
      return state;
  }
};
export default userReducer;
