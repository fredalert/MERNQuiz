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
  case "klinik":
  tempUser.klinik=evt.target.value
  break;
  case "yrke":
  tempUser.yrke=evt.target.value
  break;

}
this.setState({user:tempUser})
console.log("this.state.user is :", this.state.user)
}


render(){
console.log("this.props is: ", this.props)
return(
  <div>
<Row>
  <Col xs={12} sm={6}>
    <Panel>
    <h3>Registrering</h3>



    <FormGroup controlId="name" validationState={(this.state.user.name.length<2)?("error"):("success")}>
          <ControlLabel>Ditt namn </ControlLabel>
          <FormControl
            type="text"
            placeholder="eg. Fredrik"
            ref="name"
            value={this.state.user.name}
            onChange={this.handleTextChange("name")}
            />
            <FormControl.Feedback />
    </FormGroup>
        <FormGroup controlId="email" validationState={(this.state.user.email.indexOf("@")>2)?("success"):("error")}>
          <ControlLabel>E-mail</ControlLabel>
          <FormControl
            type="email"
            placeholder="fredr.blomberg@liv.se"
            ref="email"
            value={this.state.user.email}
            onChange={this.handleTextChange("email")}
            />
        </FormGroup>
        <FormGroup controlId="yrkesroll">
      <ControlLabel>Yrke</ControlLabel>
      <FormControl componentClass="select" onChange={this.handleTextChange("yrke")}  placeholder="select">
        <option value="Läkare">Läkare</option>
        <option value="Sköterska">Sköterska</option>
        <option value="Administratör">Administratör</option>
      </FormControl>
        </FormGroup>

        <FormGroup controlId="Klinik">
      <ControlLabel>Yrke</ControlLabel>
      <FormControl componentClass="select" onChange={this.handleTextChange("klinik")} placeholder="select">
        <option value="Västerstrand">Västerstrand</option>
        <option value="Herrhagen">Herrhagen</option>
        <option value="Likenäs">Likenäs</option>
      </FormControl>
        </FormGroup>

        <FormGroup controlId="password" validationState={(this.state.user.password.length<2)?("error"):("success")}>
            <ControlLabel>Lösenord</ControlLabel>
            <FormControl
              type="password"
              placeholder="Skriv in ditt lösenord"
              value={this.state.user.password}
              ref="password"
              onChange={this.handleTextChange("password")}
              />
        </FormGroup>
        <FormGroup controlId="passwordval" validationState={(this.state.user.passwordval===this.state.user.password && this.state.user.password.length>0)?("success"):("error")}>
              <ControlLabel>Konfirmera lösenord</ControlLabel>
              <FormControl
                type="password"
                placeholder="Konfirmera ditt lösenord"
                ref="passwordval"
                value={this.state.user.passwordval}
                onChange={this.handleTextChange("passwordval")}
                />
        </FormGroup>
        <Well>
          <Checkbox
          onChange={this.handleTextChange("admin")}>
          Administratör?
          </Checkbox>
        </Well>
        <Button bsStyle="primary" onClick={(this.handleSubmit).bind(this)}>Skicka in</Button>
    </Panel>
  </Col>
  <Col xs={12} sm={6}>
    <Row>
      <Well>
        <h6>Lägg till en profilbild</h6>
        <Dropzone onDrop={ this.handleDrop("bajs")} accept="image/jpg, image/jpeg" multiple={ false } onDropRejected={ this.handleDropRejected }>
          Klicka här för att lägga till en bild!
          {(this.state.user.imageUrl=="")?(<div></div>):(<img src={this.state.user.imageUrl} className="register-image"/>)}
        </Dropzone>
      </Well>
    </Row>
  </Col>
</Row>
{(this.props.user.errorMessage==undefined||null)?(<div></div>):(<Well><h6>{this.props.user.errorMessage}</h6></Well>)}
{(this.props.user.successMessage==undefined)?(<div></div>):(<Well><h6>Din registering lyckades! Vänligen logga in!</h6></Well>)}
</div>
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

function mapStateToProps(state){
  return {
    user:state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
