import React from "react";
import {Row, Media, Well, Col} from "react-bootstrap";
import {updateLectureToUserAction} from "../../../actions/userActions"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
class RenderVideo extends React.Component{



render(){
  return(
    <Media>
      <Row>
        <Col xs={12}>
          <Well>
            <video width="100%" controls onEnded={this.handleEndedVideo.bind(this)}>
              <source src={this.props.videoUrl} type="video/mp4"/>
            </video>
          </Well>
        </Col>
      </Row>
    </Media>)
}

handleEndedVideo(){
  console.log("video has ended")
  let lecturesToBeUpdated= this.props.user.lectures;
  lecturesToBeUpdated[this.props.lectureIndex].progress[this.props.currentQuestionNumber].isCorrect="correct";
  console.log("currentProgress is: ", lecturesToBeUpdated);
    this.props.updateLectureToUserAction(this.props.user._id, lecturesToBeUpdated)
}

}



function mapStateToProps(state){
  return {

    user:state.user.loggedInUser,


  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateLectureToUserAction,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(RenderVideo);
