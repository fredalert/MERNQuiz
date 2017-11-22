"use strict"
import React from "react";
import {Navbar, Nav, NavItem, Badge} from "react-bootstrap"

class Menu extends React.Component{

  render(){
    return(
<Navbar inverse fixedTop>
   <Navbar.Header>
     <Navbar.Brand>
       <a href="/about">Om</a>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>

       {(this.props.loggedInUser!=null)?(<NavItem eventKey={2} href="/lectures">Föreläsningar</NavItem>):("")}
       {(this.props.loggedInUser!=null)?(<NavItem eventKey={4} href="/createlecture">Skapa föreläsning</NavItem>):("")}
     </Nav>
     <Nav pullRight>
      {(this.props.loggedInUser!=null)?(<NavItem eventKey={1} href="/logout">Logga ut</NavItem>):(<NavItem eventKey={1} href="/login">Logga in</NavItem>)}
      {(this.props.loggedInUser!=null)?(""):(<NavItem eventKey={2} href="/register">Registrera dig</NavItem>)}
      {(this.props.loggedInUser!=null)?(<NavItem eventKey={5} href="/admin">Admin</NavItem>):("")}

      {(this.props.loggedInUser!=null)?(<NavItem eventKey={5} href="/profile">{this.props.loggedInUser.name}</NavItem>):("")}

     </Nav>
   </Navbar.Collapse>
 </Navbar>
 )}
 }

 export default Menu;
