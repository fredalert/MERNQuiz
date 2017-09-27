import React from "react";
import {Row, Image, Grid, Media, Modal, Badge, Pagination, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getLectures} from "../../actions/lectureActions"
import {getCurrentUser} from "../../actions/userActions"
import axios from "axios";
import {findDOMNode} from "react-dom"



var modalBolean=false;
let counter= 0;
let lectureLength=0;


var currentLecture={}
class Lectures extends React.Component{

constructor(){
  super();
  this.state=({showModal:false,
                answeredQ:false,
                currentLecture:{},
                counter:0,
                selectedAnswer:"",
                comment:"",
                correction:[],
              })
}

componentDidMount(){
  this.props.getLectures();

}

//*************HANDLE START-PAGE FUNCTIONS*****************////

selectLecture(lectureId){
axios.get("api/lectures/"+lectureId)
  .then(function(response){
    this.setState({currentLecture:response.data});
    modalBolean=true;
    this.openModal();
    return response.data }.bind(this))
  .catch(function(err){throw err;})
}
//*************HANDLE MODAL FUNCTIONS*****************////

//1. Opens modal by setting showModal-state to true
//2. Finds out if current user has started a lecture and finds the index of that lecture.
//If lecture is not found, index is -1.

openModal(){
  this.setState({showModal:true,
                  comment:""}
                  )

  let indexOfCurrentLecture=this.props.user.lectures.findIndex(function(lecture){
    return lecture.lectureName==this.state.currentLecture.lecture
  },this)
  if(indexOfCurrentLecture===-1){
    let correctArray=this.state.correction
    correctArray.push({questionNr:i,
                          isCorrect:"unanswered"});

  this.setState({correction:correctArray})
}
else{
  let currentQuestionNum="";
    var progress= this.props.user.lectures[indexOfCurrentLecture].progress;
  currentQuestionNum=this.props.user.lectures[indexOfCurrentLecture].currentQuestionNum;

  this.setState({correction:progress,
                  counter:currentQuestionNum
                })
              }
}

closeModal(){ //Closes lecture Modal

//This part handles the correctionArray. if the lecture exists, the lecture is updated with the updated correction.
//If it doesnt exist, the lecture is added to the user.
let usersLectures  =this.props.user.lectures;
var updatedLectureArray={};
//This function determines the index of the current lecture in the users saved lecture.
//If the lecture is new to the user the index is -1, and the lecture is added to the user.
  let indexOfCurrentLecture=this.props.user.lectures.findIndex(function(lecture){
    return lecture.lectureName==this.state.currentLecture.lecture
  },this)

  if(indexOfCurrentLecture===-1){
    let lectureToBePushed={currentQuestionNum:this.state.counter,
                            lectureName:this.state.currentLecture.lecture,
                            progress:this.state.correction}
usersLectures.push(lectureToBePushed)
updatedLectureArray=usersLectures;

  }
  if(indexOfCurrentLecture>=0){
    let updatedUserLecture={currentQuestionNum:this.state.counter,
                            lectureName:this.state.currentLecture.lecture,
                            progress:this.state.correction}

  updatedLectureArray=[...usersLectures.slice(0, indexOfCurrentLecture), updatedUserLecture, ...usersLectures.slice(indexOfCurrentLecture+1)]

//Adds the updates to the user
axios.put("/api/user/"+this.props.user._id+"/lectures", updatedLectureArray)
.then(function(response){
  return response.data
})
.catch(function(err){
  throw err;
});

this.setState({showModal:false,
                counter:0,
                correction:[]
              })
this.props.getCurrentUser();
  }

}

//***********FUNCTIONS HANDELING CORRECTION*******************//
questionAnswered(){
  this.setState({answeredQ:true});
  let commentText="";
  var selected=this.state.selectedAnswer;

    let currentQuestion={};

    //CORRECT ANSWER//
  if(selected === this.state.currentLecture.questions[this.state.counter].correctAnswer){

      currentQuestion={questionNr:this.state.counter,
                          isCorrect:"correct",
                        }
      commentText="Correct Answer!"
      this.updateCorrection( currentQuestion, commentText);

    }
    //INCORRECT ANSWER//
  else {
    commentText = "Sorry! That was incorrect!, the correct answer is: "+this.state.currentLecture.questions[this.state.counter].correctAnswer;
    currentQuestion={questionNr:this.state.counter,
                        isCorrect:"incorrect",
                      }
    this.updateCorrection( currentQuestion, commentText);

  }
}

//This function updates the bar that keeps track of your progress.
updateCorrection(currentQuestion, commentText){
  var updatedArray= [...this.state.correction.slice(0, this.state.counter), currentQuestion, ...this.state.correction.slice(this.state.counter+1)]
  this.setState({comment:commentText,
                correction:updatedArray})
}

clearQuestioncomments(currentQuestionNum){
  this.setState({counter:currentQuestionNum,
                  answeredQ:false,
                  comment:"",
                });
}
nextQuestion(){

  let currentQuestionNum=this.state.counter+1;
if(currentQuestionNum>=this.state.currentLecture.questions.length){
this.setState({counter:this.state.counter-1})
this.closeModal();

}
else{
  if(this.state.currentLecture.questions[this.state.counter].isVideo){
    let currentQuestion={questionNr:this.state.counter,
                        isCorrect:"correct",
                      }
    this.updateCorrection(currentQuestion, "")
  }
this.clearQuestioncomments(currentQuestionNum);}
}

checkAnswer(answer){
  this.setState({selectedAnswer:answer})
}

//THESE FUNCTION HANDLES THE CORRECTION-BAR//
//If clicked the question number changes. They also change color whether the question was correctly or incorrectly answered//
handleCorrectionButtons(){
  return this.state.correction.map(function(item){
    return(
      <Badge key={item.questionNr} className={(item.isVideo)?("isVideo"):(item.isCorrect)} onClick={this.onCorrectionClick.bind(this, item.questionNr)}>{item.questionNr+1}</Badge>
    )}, this)
}

onCorrectionClick(questionNr){
  this.setState({
    counter:questionNr,
    comment:"",
    answeredQ:false,
  });
}


//////////////////////////////////////////////////////////////////////////
/***********RENDER-FUNCTIONS********************************************/
//////////////////////////////////////////////////////////////////////////


/**************MODAL-PAGE-RENDER-FUNCTIONS*************/
/*****************************************/

/**************MODAL-PAGE-RENDER-MAIN*************/
renderModal(){
var radioButtons= this.state.currentLecture.questions[this.state.counter].answers.map(function( answer, index){
return(  <Radio name="radioGroup" key={index} onClick={this.checkAnswer.bind(this, answer.answer)}>
  <h6 className="answer">{answer.answer}</h6>
  </Radio>)}, this)
  return(
      <div>
      <Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-sm">{currentLecture.lecture}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  <Row>
      <Panel>
        <Col xs={12} sm={12}>
          <Row>
            <PageHeader>
              {this.state.currentLecture.lecture}
              <Image className="headerImage" src={this.state.currentLecture.lectureImage}/>
            </PageHeader>
          </Row>
        </Col>
              <Well>
                {this.handleCorrectionButtons()}
              </Well>
        {(this.state.currentLecture.questions[this.state.counter].isVideo)?(this.renderVideo()):(this.handleQuestion(radioButtons))}
      </Panel>
  </Row>
  </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.closeModal.bind(this)}>Close</Button>
    </Modal.Footer>
  </Modal>
  </div>)
}

/**************MODAL-PAGE-RENDER-VIDEO*************/
renderVideo(){
  return(
    <Row>
    <Media>
      <Row>
        <Col xs={12}>
          <Well>
            <video width="100%" controls onEnded={this.nextQuestion.bind(this)}>
              <source src={this.state.currentLecture.questions[this.state.counter].videoUrl} type="video/mp4"/>
            </video>
          </Well>
        </Col>
      </Row>
      <Well>
        <Button onClick={this.nextQuestion.bind(this)} bsStyle="primary">Continue</Button>
      </Well>
    </Media>
    </Row>
  )
}
/**************MODAL-PAGE-RENDER-QUESTIO************/

handleQuestion(radioButtons){
  return(
<div>
  <Row>
            <Well>
                <h6>{this.state.comment}</h6>
            </Well>
  </Row>
  <Col xs={12} sm={12}>
    <Well>
          <Well>
                <h6>{this.state.currentLecture.questions[this.state.counter].question}</h6>
          </Well>
              {(this.state.currentLecture.questions[this.state.counter].imageUrl==="")?(<div></div>):(<Well><Image src={this.state.currentLecture.questions[this.state.counter].imageUrl} className="questionImage"/></Well>)}
          <Well>
                <FormGroup ref="questionsForm" >
                      {radioButtons}
                </FormGroup>
          </Well>
        <Row>
          <Col xs={6}>
                <Button onClick={this.questionAnswered.bind(this)}bsStyle="primary">Answer</Button>
          </Col >
          <Col xs={6}>
                {(this.state.answeredQ)?(<Button onClick={this.nextQuestion.bind(this)} bsStyle="primary">Continue</Button>):(<div></div>)}
          </Col >
        </Row>
    </Well>
  </Col>
</div>)
}


/**************START-PAGE-RENDER-FUNCTIONS*************/
/*****************************************/

/**************START-PAGE-MAIN-RENDERER*************/
renderStartPage(){

  return (
    <div>
    <Row>
      <Panel>
        <Col xs={12} sm={12}>
            <PageHeader>The Lectures page
              <small>   Where the lectures  are found</small>
            </PageHeader>
        </Col>
        <Col  xs={12} sm={12} md={12} >
          {(this.props.lectures!=null)?(this.renderLectures()):(console.log("wtf!", this.props.lectures))}

        </Col>
    </Panel>
  </Row>
  {(modalBolean)?(this.renderModal()):(<div></div>)}
  </div>
)
}

/**************RENDER LECTURES*************/
renderLectures(){
console.log("this.state.correction is: ", this.state.correction)
  return this.props.lectures.map(function(lecture){
        return(
            <Col  xs={6} md ={4} key={lecture._id} >
              <Media className="lectureThumbnail"   onClick={this.selectLecture.bind(this, lecture._id)}>
                <Media.Left>
                <img src={lecture.lectureImage} className="lectureImage"/>
                </Media.Left>
                <Media.Body>
                <Media.Heading>{lecture.lecture}</Media.Heading>
                <p className="lectureDescription">{lecture.description}</p>
                </Media.Body>
              </Media>
            </Col>)
          }, this
        )
      }

/**************MAIN RENDERER*************/
/****************************************/
render(){
return (
  <Grid>
    <Row>
{this.renderStartPage()}
</Row>
</Grid>
)
}
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getLectures,
    getCurrentUser,
    }, dispatch)
}

function mapStateToProps(state){
  return {
    lectures:state.lectures.lectures,
    user:state.user.loggedInUser,
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
