
"use strict"
export function usersReducers(state={user:{isAnswered:false, isCorrect:"unanswered"}}, action){
switch(action.type){
  case "POST_USER":
  return {...state, errorMessage:null, successMessage:"Registeringen lyckades! Vänligen logga in!", ...action.payload}
  case "POST_USER_REJECTED":
  return{...state, errorMessage:action.payload}
  break;
  case "UPDATE_LECTURE_TO_USER":
  return {...state, loggedInUser:action.payload}
  break;
  case "LOGIN_USER":
  return {...state,
    loggedInUser:action.payload}
  break;
  case "LOGOUT_USER":
  return {...state, loggedInUser:action.payload}
  break;
  case "GET_USER":
  return {...state,
    loggedInUser:action.payload}
  break;
  case "GET_USERS":
  return {...state,
      allUsers:action.payload}
  break;
  case "QUESTION_IS_ANSWERED":
  return {...state, isAnswered:action.payload.bool, isCorrect:action.payload.result}
  break;
  case "RENDER_FORUM":
  return {...state, isForumModal:action.payload.bool}
  break;
}
return state;
}
