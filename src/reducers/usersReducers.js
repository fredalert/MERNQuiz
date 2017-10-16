
"use strict"
export function usersReducers(state={user:{isAnswered:false, isCorrect:"unanswered"}}, action){
switch(action.type){
  case "POST_USER":
  return {...state, ...action.payload}
  break;
  case "UPDATE_LECTURE_TO_USER":
  return {...state, loggedInUser:action.payload}
  break;
  case "LOGIN_USER":
  return {...state,
    loggedInUser:action.payload}
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
}
return state;
}
