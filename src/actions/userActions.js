"use strict"
import axios from "axios";

export function getCurrentUser(){
  return function(dispatch){
  axios.get("/api/user")
  .then(function(response){

    dispatch({type:"GET_USER", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"GET_USER_REJECTED", payload:"Aomething went wrong when getting the user"})
  })
}}

export function getUsers(){
  return function(dispatch){
  axios.get("/api/users")
  .then(function(response){

    dispatch({type:"GET_USERS", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"GET_USERS_REJECTED", payload:"Aomething went wrong when getting the users"})
  })
}}

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

export function addCreatedLectureToUserAction(_id){
  return function(dispatch){
    axios.post("/api/user/createdLectures", _id)
      .then(function(response){
        dispatch({type:"POST_CREATED_LECTURE_TO_USER", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"POST_CREATED_LECTURE_TO_USER_REJECTED", payload:response.data})
      })

  }
}




export function addLectureToUserAction(lecture){
  return function(dispatch){
    axios.post("/api/user/lectures", lecture)
      .then(function(response){
        dispatch({type:"POST_LECTURE_TO_USER", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"POST_LECTURE_TO_USER_REJECTED", payload:response.data})
      })

  }
}

export function updateLectureToUserAction(_id, lecture){
let updatedLecture=lecture;
  return function(dispatch){

    axios.put("/api/user/"+_id+"/lectures/", updatedLecture)
    .then(function(response){
      dispatch({type:"UPDATE_LECTURE_TO_USER", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"UPDATE_LECTURE_TO_USER_REJECTED", payload:response.data})
    })

    }
  }

  export function lastModifiedLecture(number){

    return function(dispatch){
      axios.put("/api/user/lectures/"+ id)


      .catch(function(err){
        dispatch({type:"UPDATE_LECTURE_TO_USER_REJECTED", payload:response.data})
      })

      }
    }


export function isQuestionAnswered(bool, result){
  return function(dispatch){
  dispatch({type:"QUESTION_IS_ANSWERED", payload:{bool, result}})}
}
