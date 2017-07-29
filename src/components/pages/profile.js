"use strict";
import React from "react"
import {Row, Well, Col, Panel} from "react-bootstrap";
import {connect} from "react-redux"
import {getCurrentUser} from "../../actions/userActions"
class Profile extends React.Component{




render(){

  return(
  <Panel>
    <Row>
      <Col xs={12} sm={6}>
          <Well>
            <h3>{(this.props.loggedInUser!=null)?(this.props.loggedInUser.email):("")}</h3>

          </Well>
      </Col>
    </Row>
  </Panel>
)
}
}






function mapStateToProps(state){
  return {
    loggedInUser:state.user.loggedInUser,
  }
}




export default connect(mapStateToProps)(Profile);
