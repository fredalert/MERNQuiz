"use strict"
import axios from "axios";

export function getBooks(){
 return function(dispatch){
 axios.get("/api/books")
 .then(function(response){
 dispatch({type:"GET_BOOKS",
payload:response.data})
 })
 .catch(function(err){
 dispatch({type:"GET_BOOKS_REJECTED",
payload:err})
 })
 }}


export function postBookAction(book){
return function(dispatch){
  axios.post("/api/books", book)
  .then(function(response){
    dispatch({type:"POST_BOOK", payload:response.data})
  })
  .catch(function(err){
    dispatch({type:"POST_BOOK_REJECTED", payload:"Could not post book to database"})
  })
}}

export function buttonReset(){
return function(dispatch){

dispatch({type:"BUTTON_RESET"})
  }

}


export function deleteBookAction(id){
return function(dispatch){
  axios.delete("/api/books/"+id)
  .then(function(respone){
    dispatch({type:"DELETE_BOOK", payload:id})
  })
  .catch(function(err){
    dispatch({type:"DELETE_BOOK_REJECTED", payload:"Sorry, connecting to the dataabase went wrong"})
  })
}
}
