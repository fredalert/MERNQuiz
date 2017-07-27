"use strict"
import axios from "axios";

export function postUserAction(user){
return function(dispatch){
  axios.post("/api/user", user)
  .then(function(response){
    dispatch({type:"POST_USER", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"POST_USER_REJECTED", payload:"Could not post user to database"})
  })
}}

export function loginUserAction(user){
return function(dispatch){
  axios.post("api/user/login", user)
    .then(function(response){
      dispatch({type:"LOGIN_USER", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"LOGIN_USER_REJECTED", payload:"Could not login user"})
    })
}}
