"use strict"

//REDUCER
export function booksReducers(state={books:[]}, action){
switch(action.type){
case "GET_BOOKS":
return {...state,books:[...action.payload]}
break;
case "POST_BOOK":
return {...state, books:[...state.books, ...action.payload], msg:"Book saved!, Click to continue!", style:"success"};
break;
case "POST_BOOKS_REJECTED":
return {...state, msg:"Something went wrong when posting a book to the database", style:"danger"};
break;
case "DELETE_BOOK":
var bookArray=[...state.books];
var indexOfBook=bookArray.findIndex(function(book){
return book._id==action.payload
})
return {books:[...bookArray.slice(0, indexOfBook),
...bookArray.slice(indexOfBook+1)]};
break;
case "BUTTON_RESET":
return {...state, msg:null, style:""}
break;
case "UPDATE_BOOK":
var updatedBookArray=[...state.books];
var indexOfUpdatedBook=updatedBookArray.findIndex(function(book){
  return book._id===action.payload._id;
});
var updatedBook={...updatedBookArray[indexOfUpdatedBook], title:action.payload.title};
return [...updatedBookArray.slice(0, indexOfUpdatedBook), updatedBook, ...updatedBookArray.slice(indexOfUpdatedBook+1)]
}
return state;
}
