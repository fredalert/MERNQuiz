import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import React from "react";
import {render} from "react-dom"
import {Provider} from "react-redux"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import thunk from "redux-thunk"


import reducers from "./reducers/index";
import {addToCartAction} from "./actions/addToCartAction";
import {getBookAction, updateBookAction, postBookAction, deleteBookAction} from "./actions/bookActions"


//STORE
const middleware= applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware); //

import BooksList from "./components/pages/bookslist";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/booksForm";
import Main from "./components/pages/main";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Profile from "./components/pages/profile"
import Lectures from "./components/pages/lectures"
import Logout from "./components/pages/logout"
import Lecture from "./components/pages/lecture"



//ACTIONS



const Routes =(
<Provider store={store}>
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList}/>
        <Route path="/admin" component={BooksForm}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/about" component={BooksForm}/>
        <Route path="/register" component ={Register}/>
        <Route path="/login" component ={Login}/>
        <Route path="/logout" component ={Logout}/>
        <Route path="/profile" component ={Profile}/>
        <Route path="/lectures" component ={Lectures}/>
        <Route path="/lecture" component ={Lecture}/>
      </Route>
    </Router>

  </div>

</Provider>);


render(

  Routes, document.getElementById("app")
)
