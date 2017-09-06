"use strict"
import React from "react";
import Menu from "./Menu";
import Footer from "./footer"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getCurrentUser} from "../../actions/userActions"


class Main extends React.Component{
componentDidMount(){
  this.props.getCurrentUser();


}

  render(){
    return(
      <div>
      <Menu
      userEmail={this.props.userEmail}
      loggedInUser={this.props.loggedInUser}/>
      {this.props.children}
      <Footer/>
      </div>
    )
}}

function mapStateToProps(state){
  return {

    userEmail:state.user.email,
    loggedInUser:state.user.loggedInUser,
  }
}


    function mapDispatchToProps(dispatch){
      return bindActionCreators(
        {
          getCurrentUser:getCurrentUser,}
        , dispatch)
    }




export default connect(mapStateToProps, mapDispatchToProps)(Main);
