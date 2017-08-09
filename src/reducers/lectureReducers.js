"use strict";

export function lectureReducers(state={lecture:[]}, action){
  switch(action.type){
    case "GET_LECTURES":
    return {...state,
      lectures:[...action.payload],
      }
    break;
}

  return state;
}
