"use strict";
import {combineReducers} from "redux";
import {booksReducers} from "./booksReducers";
import {cartReducers} from "./cartReducers";
import {usersReducers} from "./usersReducers"

export default combineReducers({
  books:booksReducers,
  cart:cartReducers,
  user:usersReducers,
})
