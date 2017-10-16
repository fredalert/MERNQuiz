"use strict";
import React from "react"
import {Row, Badge, Well,Glyphicon,Button, ProgressBar, Label, Col, Panel} from "react-bootstrap";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {getCurrentUser} from "../../actions/userActions"
import axios from "axios";

class Profile extends React.Component{

createdLectureEditClick(_id){
  this.props.router.push("/createlecture?id="+_id)
}

createdLectureDeleteClick(_id){
  let self=this;
axios.delete("/api/createlecture/"+_id)
.then(function(){
  console.log("cool done")
  self.props.getCurrentUser();
})
.catch(function(err){
  console.log(err)
})
}


clickLecture(_id){
  this.props.router.push("/lecture?id="+_id)
}


renderProfile(){

let self=this;
let lectures= this.props.loggedInUser.lectures.map(function(lecture, index){
return(
          <Well key={index} onClick={this.clickLecture.bind(this, lecture.refId)}>
            <h3 > {lecture.lectureName}</h3>
            <p>Progress</p>
            <ProgressBar bsStyle="success" now={lecture.percentCorrect} label={`${lecture.percentCorrect}%`}/>
            {(lecture.isCompleted)?(<div className="done"><Glyphicon bsStyle="success" glyph="ok"  /><p> Done!</p></div>):(<div></div>)}
          </Well>)
}, this)

let createdLectures= this.props.loggedInUser.createdLectures.map(function(lecture, index){
  return(<div  key={index}><Well><h3> {lecture.lecture}</h3>
  <Badge className="editBadge" onClick={this.createdLectureEditClick.bind(this, lecture._id)}> Edit</Badge>
  <Badge className="deleteBadge" bsStyle="danger" onClick={this.createdLectureDeleteClick.bind(this, lecture._id)}> Delete</Badge></Well></div>)
}, this)

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

  console.log("this.props.loggedInUser is: ", this.props.loggedInUser)

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
}


}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

    getCurrentUser,

    }, dispatch)
}



function mapStateToProps(state){
  return {
    loggedInUser:state.user.loggedInUser,
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile);
