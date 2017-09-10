"use strict";
import React from "react"
import {Row, Well, Label, Col, Panel} from "react-bootstrap";
import {connect} from "react-redux"
import {getCurrentUser} from "../../actions/userActions"

class Profile extends React.Component{

renderProfile(){


let lectures= this.props.loggedInUser.lectures.map(function(lecture, index){
return( <h3 key={index}> <Label bsStyle="primary" className="profileLectures" >{lecture.lectureName}</Label></h3>)
})

let createdLectures= this.props.loggedInUser.createdLectures.map(function(lecture, index){
  return(<h3 key={index}> <Label bsStyle="primary" className="profileLectures" >{lecture.lectureName}</Label></h3>)
})

  return(
    <div >
    <h1>Hi {this.props.loggedInUser.name}</h1>
      <Well><h3>Lectures</h3>
      {lectures}
      </Well>
      <Well>
      <h3>Created Lectures</h3>
        {createdLectures}
      </Well>
    </div>
  )
}

render(){
  console.log("this.props is :", this.props.location)

  return(
  <Panel>
    <Row>
      <Col xs={12} sm={6}>
      {(this.props.loggedInUser!=null)?(this.renderProfile()):(<div><h3>Sorry login did not succed</h3></div>)}
      </Col>
      <Col xs={12} sm={6}>
        <Row>
          <Well>
          {(this.props.loggedInUser!=null)?(<img src={this.props.loggedInUser.imageUrl}/>):(<div></div>)}
          </Well>
        </Row>
      </Col>
    </Row>
  </Panel>
)
}}


function mapStateToProps(state){
  return {
    loggedInUser:state.user.loggedInUser,
  }
}




export default connect(mapStateToProps)(Profile);
