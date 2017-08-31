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

export function getLecture(lectureId){
  return function(dispatch){
  axios.get("/api/lectures/"+lectureId)
  .then(function(response){
    dispatch({type:"GET_LECTURE", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"GET_LECTURE_REJECTED", payload:"Something went wrong when getting a lecture, the error is :", err})
  })
  }}



export function postLecture(lecture){

  return function(dispatch){
    axios.post("/api/createlecture/", lecture)
    .then(function(response){
      dispatch({
      type:"POST_LECTURE",
      payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_LECTURE_REJECTED", message:err})
    })
  }
}

export function updateLecture(UserId, lecture){
  return function(dispatch){
    axios.put("/api/updateLecture"+userId, lecture)
    .then(function(response){
      dispatch({
        type:"UPDATE_LECTURE",
        payload:response.data
      })})
    .catch(function(err){
      dispatch({type:"UPDATE_LECTURE_REJECTED", message:err})
    })
    }
  }
