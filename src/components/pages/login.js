"use strict"
import React from "react";
import {InputGroup,Col,  Image, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {loginUserAction} from "../../actions/userActions"
import axios from "axios";

class Login extends React.Component{

handleLogin(){
  const user= {
    email:findDOMNode(this.refs.email).value,
    password:findDOMNode(this.refs.password).value,
    }
  this.props.loginUserAction(user);
}

render(){
return(
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
              placeholder="Enter password"
              ref="password"
              />
        </FormGroup>


        <Button onClick={(this.handleLogin).bind(this)}>Login</Button>
    </Panel>
  </Col>
</Row>
)
}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginUserAction}, dispatch)

}

export default connect(null, mapDispatchToProps)(Login)
