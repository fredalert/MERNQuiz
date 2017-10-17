import React from "react";
import {Row, Modal, Col,Well, Radio, Image, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {updateLectureToUserAction, isQuestionAnswered} from "../../../actions/userActions"
import {bindActionCreators} from "redux";

let currentQuestion={}
let userLectures=[];
let isCorrect="unanswered";
let isAnswered=false;

class RenderQuestion extends React.Component{
  componentDidMount(){
    this.props.isQuestionAnswered(false, "unanswered")
  }

  constructor(){
    super();
    this.state={
      isAnswered:false,
    }
  }

  handleAnswer(){
    console.log("handleAnswer started")
    this.props.updateLectureToUserAction(this.props.user._id, userLectures)
    this.props.isQuestionAnswered(true, isCorrect);
    isCorrect=this.props.isCorrect;
    isAnswered=this.props.isAnswered;
  }

  checkAnswer(answer){
    userLectures=this.props.user.lectures;

    if(answer===currentQuestion.correctAnswer){
      userLectures[this.props.lectureIndex].progress[this.props.user.lectures[this.props.lectureIndex].currentQuestionNum].isCorrect="correct";

    }
    else{
      userLectures[this.props.lectureIndex].progress[this.props.user.lectures[this.props.lectureIndex].currentQuestionNum].isCorrect="incorrect";
    }
    isCorrect="comment-"+userLectures[this.props.lectureIndex].progress[this.props.user.lectures[this.props.lectureIndex].currentQuestionNum].isCorrect;


  }

render(){
currentQuestion=this.props.currentLecture.questions[this.props.user.lectures[this.props.lectureIndex].currentQuestionNum];

let radioButtons= currentQuestion.answers.map(function( answer, index){
return(  <Radio name="radioGroup" key={index} onClick={this.checkAnswer.bind(this, answer.answer)}>
  <h6 className="answer">{answer.answer}</h6>
  </Radio>)}, this)

  return(
  <div>

    <Row>
      <Well>
        <h6>
          {currentQuestion.question}
        </h6>
      </Well>
    </Row>

    {(currentQuestion.imageUrl=="")?(<div></div>):(<Row>
      <Well>
        <Image src={currentQuestion.imageUrl} className="questionImage"/>
      </Well>
    </Row>)}

    <Row>
    {(this.props.isCorrect=="unanswered")?(<div></div>):
    (<Well id={(this.props.isCorrect!="unanswered")?(this.props.isCorrect):("unanswered")}>

       {(this.props.isCorrect==="comment-correct")?(<h6>Correct! {currentQuestion.comment}</h6>):(<h6>incorrect</h6>)}

    </Well>)}

    </Row>

    <Row>
      <Well>
        {radioButtons}
      </Well>
    </Row>
    <Row>
      <Well>
      {(this.props.isAnswered)?(<div></div>):(<Button onClick={this.handleAnswer.bind(this)}>ANSWER</Button>)}
      </Well>
    </Row>

  </div>
)
}
}

function mapStateToProps(state){
  return {
    currentLecture:state.lectures.currentLecture,
    user:state.user.loggedInUser,
    isAnswered:state.user.isAnswered,
    isCorrect:state.user.isCorrect,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateLectureToUserAction,
    isQuestionAnswered

    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(RenderQuestion);
