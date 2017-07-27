export function usersReducers(state={user:{}}, action){
switch(action.type){
  case "POST_USER":
  return {...state, ...action.payload}
  break;
  case "LOGIN_USER":
  return {...state, ...action.payload}
  break;
}
return state;
}
