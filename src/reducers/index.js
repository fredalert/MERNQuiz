"use strict";
import {combineReducers} from "redux";


import {usersReducers} from "./usersReducers"
import {lectureReducers} from "./lectureReducers"


export default combineReducers({
  user:usersReducers,
  lectures:lectureReducers,

})
