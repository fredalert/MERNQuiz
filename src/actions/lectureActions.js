"use strict"
import axios from "axios"

export function getLectures(){
  return function(dispatch){
  axios.get("/api/lectures")
  .then(function(response){
    dispatch({type:"GET_LECTURES", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"GET_LECTURES_REJECTED", payload:"Aomething went wrong when getting the lectures"})
  })
}}
