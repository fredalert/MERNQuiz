"use strict";

export function lectureReducers(state={}, action){
  switch(action.type){
    case "GET_LECTURES":
    console.log("action.payload is :", action.payload)
    return {...state,  lectures:[...action.payload]}
    break;
    case "GET_LECTURE":
    console.log("action.payload is :", action.payload)
    return {...state,  currentLecture:action.payload}
    break;

  case "POST_LECTURE":
  return {...state, currentLecture:action.payload}
  break;


case "UPDATE_LECTURE":
return {...state, lectures:[...action.payload]}
break;

case "UPDATE_FORUM":
return {...state, currentLecture:action.payload}
break;
}

  return state;
}
