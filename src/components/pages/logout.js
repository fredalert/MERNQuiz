"use strict"
import React from "react";
import axios from "axios";
import {Well, Row, Col } from "react-bootstrap"

class Logout extends React.Component{
  render(){
    axios.get("/api/user/logout");
    return(
      <Well>
        <Row>
        <Col>
          <h3>You have succesfully logged out</h3>
        </Col>
        </Row>
      </Well>
    )
  }}

export default Logout;