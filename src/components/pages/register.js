"use strict"
import React from "react";
import {InputGroup,Col,  Image, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {postUserAction} from "../../actions/userActions"
import axios from "axios";

class Register extends React.Component{

handleSubmit(){
  const user= {
    email:findDOMNode(this.refs.email).value,
    password:findDOMNode(this.refs.password).value,
    passwordval:findDOMNode(this.refs.passwordval).value,
    }
  this.props.postUserAction(user);
  findDOMNode(this.refs.email).value="";
  findDOMNode(this.refs.password).value="";
  findDOMNode(this.refs.passwordval).value="";
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
        <FormGroup controlId="passwordval">
              <ControlLabel>Confirm password</ControlLabel>
              <FormControl
                type="password"
                placeholder="confirm password"
                ref="passwordval"
                />
        </FormGroup>
        <Button onClick={(this.handleSubmit).bind(this)}>Submit</Button>
    </Panel>
  </Col>
</Row>
)
}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postUserAction}, dispatch)

}

export default connect(null, mapDispatchToProps)(Register)
