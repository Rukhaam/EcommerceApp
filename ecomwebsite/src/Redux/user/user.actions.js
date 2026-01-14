import  UserActionTypes  from "./user.types";


  export const googleSignInStart = ()=>({
       type : UserActionTypes.GOOGLE_SIGN_START
     
  })
  export const SignInSuccess = (user)=>({
       type : UserActionTypes.SIGN_SUCCESS,
       payload : user,
     
  })
  export const SignInFail = (error)=>({
       type : UserActionTypes.SIGN_FAIL,
       payload : error
     
  })
  export const EmailSignInStart = (email,password)=>({
       type : UserActionTypes.EMAIL_SIGN_START,
       payload: { email, password },
     
  })
  export const signOutStart =()=>({
         type : UserActionTypes.SIGN_OUT_START
  })
  export const signOutSuccess =()=>({
         type : UserActionTypes.SIGN_OUT_SUCCESS
  })
  export const signOutFail =(error)=>({
         type : UserActionTypes.SIGN_OUT_FAIL,
         payload : error
  })
export const checkUserSession = ()=>({
      type : UserActionTypes.CHECK_USER_SESSION,
})
export const signUpStart =(userCredentials)=>({
      type : UserActionTypes.SIGN_UP_START,
      payload : userCredentials
})
export const signUpSuccess =({user,additionalData})=>({
      type : UserActionTypes.SIGN_SUCCESS,
      payload :{user,additionalData}
})

export const signUpFail =(error)=>({
      type : UserActionTypes.SIGN_UP_FAIL,
      payload : error
})