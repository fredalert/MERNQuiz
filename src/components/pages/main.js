"use strict"
import React from "react";
import Menu from "./Menu";
import Footer from "./footer"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCart} from "../../actions/addToCartAction";
import {getCurrentUser} from "../../actions/userActions"


class Main extends React.Component{
componentDidMount(){
  this.props.getCart();
  this.props.getCurrentUser();
}

  render(){
    return(
      <div>
      <Menu
      itemNumber={this.props.numberOfItems}
      userEmail={this.props.userEmail}
      loggedInUser={this.props.loggedInUser}/>
      {this.props.children}
      <Footer/>
      </div>
    )
}}

function mapStateToProps(state){
  return {
    numberOfItems:state.cart.totalQuantity,
    userEmail:state.user.email,
    loggedInUser:state.user.loggedInUser,
  }
}


    function mapDispatchToProps(dispatch){
      return bindActionCreators(
        {getCart:getCart,
          getCurrentUser:getCurrentUser,}
        , dispatch)
    }




export default connect(mapStateToProps, mapDispatchToProps)(Main);
