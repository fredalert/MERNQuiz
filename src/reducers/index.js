"use strict";
import {combineReducers} from "redux";
import {booksReducers} from "./booksReducers";
import {cartReducers} from "./cartReducers";
import {usersReducers} from "./usersReducers"
import {lectureReducers} from "./lectureReducers"

export default combineReducers({
  books:booksReducers,
  cart:cartReducers,
  user:usersReducers,
  lectures:lectureReducers,
})
