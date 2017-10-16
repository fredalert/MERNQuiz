import React from "react";
import {Row, Badge, Well} from "react-bootstrap";
import {connect} from "react-redux";
import {updateLectureToUserAction, isQuestionAnswered} from "../../../actions/userActions"
import {bindActionCreators} from "redux";

class RenderProgressBar extends React.Component{


  paginationChoice(index){
    let lecturesToBeUpdated=this.props.user.lectures;
    lecturesToBeUpdated[this.props.lectureIndex].currentQuestionNum=index;
    this.props.isQuestionAnswered(false, "unanswered");
    this.props.updateLectureToUserAction(this.props.user._id, lecturesToBeUpdated)

  }


render(){
  let self=this;
  let progress=this.props.progress.map(function(answer, index){
    return( <Badge key={index} id={(self.props.currentQuestionNumber==index)?("currentQuestion"):("")} onClick={this.paginationChoice.bind(this, index)} className={answer.isCorrect}>{index+1}</Badge>
  )}, this)
  return(
    <div >
    <Well>
    <h6>Question number {this.props.currentQuestionNumber+1}</h6>
    <div id="progressbadges">{progress}</div>
    </Well>
    </div>

  )

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
    isQuestionAnswered,


    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderProgressBar);
