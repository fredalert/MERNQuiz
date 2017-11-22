import React from "react";
import {Row, Modal, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {updateLectureToUserAction, isQuestionAnswered, renderForumModal} from "../../actions/userActions"
import {getLecture} from "../../actions/lectureActions"
import {bindActionCreators} from "redux";
import RenderQuestion from "./sub_components_lecture/renderQuestion"
import RenderProgressBar from "./sub_components_lecture/renderProgressBar"
import RenderVideo from "./sub_components_lecture/renderVideo"
import RenderForum from "./sub_components_lecture/renderForum"



let lectureIndex=0;
let currentQuestionNumber=0;
class Lecture extends React.Component{

constructor(props){
  super(props);
this.props.getLecture(this.props.location.query.id);
this.state={
  isFinished:false,

}
}


//Hitta vilken index föreläsningen har i anvädnarens array av gjorda föreläslningar.
findingIndexFunction(){
  console.log("entering the findingIndexFunction, self.props.currentLecture._id is: ", this.props.currentLecture._id)
  let self=this;
  lectureIndex= this.props.user.lectures.findIndex(function(lecture){
      return lecture.refId==self.props.currentLecture._id
    })

}

settingUpLecture(){
  let self=this;
  let newProgress={currentQuestionNum:0,
                  lectureName:this.props.currentLecture.lecture,
                  refId:this.props.currentLecture._id,
                  progress:[]}
  if(lectureIndex==-1){
    for(let i=0; i<this.props.currentLecture.questions.length;i++){
      if(this.props.currentLecture.questions[i].isVideo){
        newProgress.progress.push({isCorrect:"video"})
      }
      else{
      newProgress.progress.push({isCorrect:"unanswered"});}
    }
    let lecturesToBeUpdated=this.props.user.lectures;
    lecturesToBeUpdated.push(newProgress);
this.props.updateLectureToUserAction(this.props.user._id, lecturesToBeUpdated)

  }
  else{
    currentQuestionNumber=this.props.user.lectures[lectureIndex].currentQuestionNum;
  }

}

renderProgressBar(){
  return(
    <div>

      <RenderProgressBar  lectureIndex={lectureIndex} currentQuestionNumber={this.props.user.lectures[lectureIndex].currentQuestionNum} progress={this.props.user.lectures[lectureIndex].progress}/>

    </div>
  )
}


//VIDEO/QUESTION

renderVideo(){
  this.props.isQuestionAnswered(true)
  return(
  <div>
  <RenderVideo videoUrl={this.props.currentLecture.questions[currentQuestionNumber].videoUrl} currentQuestionNumber={currentQuestionNumber} lectureIndex={lectureIndex}/>
  </div>
)

}

renderQuestion(){
  return(
    <RenderQuestion user={this.props.user} currentLecture={this.props.currentLecture} lectureIndex={lectureIndex} />
  )
}



//BUTTON

//ButtonFunctions


nextHandler(){

  this.props.isQuestionAnswered(false, "unanswered");
console.log("hi next handler")

let lecturesToBeUpdated=this.props.user.lectures;
lecturesToBeUpdated[lectureIndex].currentQuestionNum+=1;
if(lecturesToBeUpdated[lectureIndex].currentQuestionNum>this.props.currentLecture.questions.length-1){

  this.setState({isFinished:true});
  lecturesToBeUpdated[lectureIndex].currentQuestionNum=this.props.currentLecture.questions.length-1;

}
else{

this.props.updateLectureToUserAction(this.props.user._id, lecturesToBeUpdated)
}


}

previousHandler(){
  this.props.isQuestionAnswered(false);
  console.log("hi previousHandler");
  let lecturesToBeUpdated=this.props.user.lectures;
  lecturesToBeUpdated[lectureIndex].currentQuestionNum-=1;
  this.props.updateLectureToUserAction(this.props.user._id, lecturesToBeUpdated);
}

handleForumClick(){
  console.log("handleClickStarted");

  this.props.renderForumModal(true);
}



renderButtons(){
  let self=this;
  console.log("this.props.isAnswered is :", this.props.isAnswered)
  return(
    <div>

  {(currentQuestionNumber>0)?(<Button bsStyle="primary" onClick={this.previousHandler.bind(this)}>FÖRGÅENDE</Button>):(<div></div>)}
  <Button className="openForumButton" onClick={this.handleForumClick.bind(this)}>Öppna disskussionsforum</Button>
  {(this.props.isAnswered===false ||  currentQuestionNumber>=this.props.currentLecture.questions.length)?(<div></div>):(<Button bsStyle="success" className="next-button" onClick={this.nextHandler.bind(this)}>NÄSTA</Button>)}

</div>)
}

renderFinishedLecture(){
  console.log("entering the finished function")

  return(
<div>
    {(this.props.user.lectures[lectureIndex].isCompleted)?(<div>
    <Col>
    <Row>
      <Well>
      <h3>KLAR!</h3>
      <h3>You made it! Your the worlds greatest!</h3>
      <iframe width="100%" height="100%"
 src="https://www.youtube.com/embed/WgcovIu3k9o?autoplay=1&start=37"></iframe>

      </Well>
    </Row>
    </Col>
  </div>):(<div><h6>Du fick {this.props.user.lectures[lectureIndex].percentCorrect} % rätt!  </h6></div>)}
</div>)
}


renderForum(){
  return(
<RenderForum/>)
}

renderLecture(){

  let self=this;
this.findingIndexFunction();
this.settingUpLecture();
return(
  <div>
  {(this.state.isFinished)?(this.renderFinishedLecture())
  :(
    <Col xs={12} className="lecture-main">
      <Row >
      <h6>{this.props.currentLecture.lecture}</h6>
        <Well>
          <Row id="progress">
            <Well>
              <h6>
                {self.renderProgressBar()}
              </h6>
            </Well>
          </Row>
          <Row>
            <Well>
              <h6>
              {(this.props.isForumModal)?(this.renderForum()):(<div></div>)}
              {(self.props.currentLecture.questions[this.props.user.lectures[lectureIndex].currentQuestionNum].isVideo)?(self.renderVideo()):(self.renderQuestion())}
              </h6>
            </Well>
          </Row>
          <Row>
            <Well>
              <h6>
                {self.renderButtons()}
              </h6>
            </Well>
          </Row>
        </Well>
      </Row>
    </Col>

   )
}
  </div>
 )
}



//MAIN RENDER
  render(){


return(
  <Col xs={12}>
    <Row>
     {(this.props.currentLecture!=undefined)?(this.renderLecture()):(<div></div>)}
    </Row>
  </Col>
)
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateLectureToUserAction,
    getLecture,
    isQuestionAnswered,
    renderForumModal
    }, dispatch)
}

function mapStateToProps(state){
  return {
    currentLecture:state.lectures.currentLecture,
    user:state.user.loggedInUser,
    isAnswered:state.user.isAnswered,
    isForumModal:state.user.isForumModal,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
