"use strict"
import React from "react";
import {InputGroup,Col, Checkbox,  Row,  FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {postUserAction} from "../../actions/userActions"
import axios from "axios";
import Dropzone from 'react-dropzone';

class Register extends React.Component{
constructor(){
  super();
  this.state={
    user:{
      password:"",
      passwordval:"",
      name:"",
      email:"",
      imageUrl:"",
      admin:false}
  }
}


handleSubmit(){
  this.props.postUserAction(this.state.user);
  findDOMNode(this.refs.email).value="";
  findDOMNode(this.refs.password).value="";
  findDOMNode(this.refs.passwordval).value="";
  findDOMNode(this.refs.name).value="";
}

handleTextChange=(action) => (evt)=>{
  let tempUser=this.state.user;
switch(action){
  case "email":
  tempUser.email=evt.target.value;
  break;
  case "password":
  tempUser.password=evt.target.value;
  break;
  case "passwordval":
  tempUser.passwordval=evt.target.value;
  break;
  case "name":
  tempUser.name=evt.target.value;
  break;
  case "admin":
  tempUser.admin=evt.target.checked;
  break;

}
this.setState({user:tempUser})
console.log("this.state.user is :", this.state.user)
}


render(){
return(
<Row>
  <Col xs={12} sm={6}>
    <Panel>
    <h3>Registration form</h3>
    <FormGroup controlId="name">
          <ControlLabel>Your name </ControlLabel>
          <FormControl
            type="text"
            placeholder="eg. Fredrik"
            ref="name"
            value={this.state.user.name}
            onChange={this.handleTextChange("name")}
            />
    </FormGroup>
        <FormGroup controlId="email">
          <ControlLabel>E-mail</ControlLabel>
          <FormControl
            type="email"
            placeholder="fredr.blomberg@liv.se"
            ref="email"
            value={this.state.user.email}
            onChange={this.handleTextChange("email")}
            />
        </FormGroup>
        <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={this.state.user.password}
              ref="password"
              onChange={this.handleTextChange("password")}
              />
        </FormGroup>
        <FormGroup controlId="passwordval">
              <ControlLabel>Confirm password</ControlLabel>
              <FormControl
                type="password"
                placeholder="confirm password"
                ref="passwordval"
                value={this.state.user.passwordval}
                onChange={this.handleTextChange("passwordval")}
                />
        </FormGroup>
        <Well>
          <Checkbox
          onChange={this.handleTextChange("admin")}>
          Admin
          </Checkbox>
        </Well>
        <Button onClick={(this.handleSubmit).bind(this)}>Submit</Button>
    </Panel>
  </Col>
  <Col xs={12} sm={6}>
    <Row>
      <Well>
        <h6>Add profile picture</h6>
        <Dropzone onDrop={ this.handleDrop("bajs")} accept="image/jpg, image/jpeg" multiple={ false } onDropRejected={ this.handleDropRejected }>
          Click here drop a pic here. Drop it like its freaking hot!
          {(this.state.user.imageUrl=="")?(<div></div>):(<img src={this.state.user.imageUrl} className="register-image"/>)}
        </Dropzone>
      </Well>
    </Row>
  </Col>
</Row>
)
}

handleDrop= (action) => (files) =>{
  const formData= new FormData();
  let file= files[0];
  let self=this;
  let user =this.state.user;
  formData.append("file", file);
  axios.post("/api/fileupload", formData)
  .then(function(response){
    user.imageUrl=response.data.thePath;
    self.setState({user:user})
  })
  .catch(function(err){
    console.log(err)
  })
}

handleDropRejected(){
  console.log("drop rejected")
}
}



function mapDispatchToProps(dispatch){
  return bindActionCreators({postUserAction}, dispatch)

}

export default connect(null, mapDispatchToProps)(Register)
