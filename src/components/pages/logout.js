"use strict"
import React from "react";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {logoutUserAction} from "../../actions/userActions"
import {Well, Row, Col } from "react-bootstrap"



class Logout extends React.Component{
componentDidMount(){
this.props.logoutUserAction();

}
  render(){
    console.log(this.props.loggedInUser)

    return(
      <Well>
        <Row>
        <Col>
          <h3>Du har nu loggat ut!</h3>
        </Col>
        </Row>
      </Well>
    )
  }}


  function mapDispatchToProps(dispatch){
    return bindActionCreators({

      logoutUserAction,

      }, dispatch)
  }



  function mapStateToProps(state){
    return {
      loggedInUser:state.user.loggedInUser,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
