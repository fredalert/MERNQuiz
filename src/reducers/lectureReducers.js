"use strict";

export function lectureReducers(state={lectures:[]}, action){
  switch(action.type){
    case "GET_LECTURES":
    return {...state, lectures:[...action.payload]}
    break;

  case "POST_LECTURE":
  return {...state, currentLecture:action.payload}
  break;


case "UPDATE_LECTURE":
return {...state, lectures:[...action.payload]}
break;
}

  return state;
}
