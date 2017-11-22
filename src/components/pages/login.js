"use strict"
import React from "react";
import {InputGroup,Col,  Image, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {loginUserAction} from "../../actions/userActions"
import axios from "axios";
import { withRouter } from 'react-router';

let isSent=false;
class Login extends React.Component{

  constructor(){
    super();
    this.state={
      isSent:false
    }
  }

handleLogin(){
  this.setState({isSent:true});
  const user= {
    email:findDOMNode(this.refs.email).value,
    password:findDOMNode(this.refs.password).value,
    }
  this.props.loginUserAction(user);




}

render(){
  

if(this.props.user!=undefined){

  this.props.router.push("/Profile")
}
return(
  <div>
<Row>
  <Col xs={12} sm={6}>
    <Panel>
        <FormGroup controlId="email">
          <ControlLabel>E-mail</ControlLabel>
          <FormControl
            type="email"
            placeholder="fredr.blomberg@liv.se"
            ref="email"
            />
        </FormGroup>
        <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Ange ditt lösenord"
              ref="password"
              />
        </FormGroup>



        <Button onClick={(this.handleLogin).bind(this)}>Login</Button>

    </Panel>
  </Col>
</Row>
<div>
{(this.state.isSent)?(<Well><h6>Sorry log in failed</h6></Well>):(<div></div>)}
</div>
</div>
)
}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginUserAction}, dispatch)

}

function mapStateToProps(state){
  return {
    user:state.user.loggedInUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
