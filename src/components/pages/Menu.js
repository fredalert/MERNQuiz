"use strict"
import React from "react";
import {Navbar, Nav, NavItem, Badge} from "react-bootstrap"

class Menu extends React.Component{

  render(){
    return(
<Navbar inverse fixedTop>
   <Navbar.Header>
     <Navbar.Brand>
       <a href="/lectures">Lecture</a>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>
       <NavItem eventKey={1} href="/about">About</NavItem>
       <NavItem eventKey={2} href="/lectures">Lectures</NavItem>
     </Nav>
     <Nav pullRight>
      {(this.props.loggedInUser!=null)?(<NavItem eventKey={1} href="/logout">logout</NavItem>):(<NavItem eventKey={1} href="/login">Login</NavItem>)}
      {(this.props.loggedInUser!=null)?(""):(<NavItem eventKey={2} href="/register">Register</NavItem>)}
       <NavItem eventKey={4} href="/createlecture">Create Lecture</NavItem>
      {(this.props.loggedInUser!=null)?(<NavItem eventKey={5} href="/profile">{this.props.loggedInUser.name}</NavItem>):("")}

     </Nav>
   </Navbar.Collapse>
 </Navbar>
 )}
 }

 export default Menu;
