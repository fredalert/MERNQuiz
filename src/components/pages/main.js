"use strict"
import React from "react";
import Menu from "./Menu";
import Footer from "./footer"
import {connect} from "react-redux";


class Main extends React.Component{
  render(){
    return(
      <div>
      <Menu
      itemNumber={this.props.numberOfItems}
      userEmail={this.props.userEmail}/>
      {this.props.children}
      <Footer/>
      </div>
    )
}}

function mapStateToProps(state){
  return {
    numberOfItems:state.cart.totalQuantity,
    userEmail:state.user.email,
  }
}

export default connect(mapStateToProps)(Main);
