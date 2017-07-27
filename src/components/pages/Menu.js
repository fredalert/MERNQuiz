"use strict"
import React from "react";
import {Navbar, Nav, NavItem, Badge} from "react-bootstrap"

class Menu extends React.Component{

  render(){
    return(
<Navbar inverse fixedTop>
   <Navbar.Header>
     <Navbar.Brand>
       <a href="/">My fucking cart</a>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>
       <NavItem eventKey={1} href="/about">About</NavItem>
       <NavItem eventKey={2} href="/contact">Contact</NavItem>
     </Nav>
     <Nav pullRight>
      <NavItem eventKey={1} href="/login">Login</NavItem>
      <NavItem eventKey={2} href="/register">Register</NavItem>
       <NavItem eventKey={3} href="/admin">Admin</NavItem>
       {(this.props.itemNumber>0)?(<NavItem eventKey={4} href="/cart">My cart <Badge className="badge">{this.props.itemNumber}</Badge></NavItem>):("")}
      {(this.props.userEmail!="")?(<NavItem eventKey={5} href="/login">{this.props.userEmail}</NavItem>):("")}

     </Nav>
   </Navbar.Collapse>
 </Navbar>
 )}
 }

 export default Menu;
