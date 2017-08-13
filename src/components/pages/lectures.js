import React from "react";
import {Row, Image, Media, Modal, Badge, Pagination, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getLectures} from "../../actions/lectureActions"
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
//*************HANDLE MODAL FUNCTIONS*****************////
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

openModal(){ //Opens Lecture Modal
  console.log("modal opens and the counter is: ", counter)
  this.setState({showModal:true})
  let correctArray=this.state.correction
  lectureLength=this.state.currentLecture.questions.length;
  if(correctArray.length<1){
  for(let i=0; i<lectureLength; i++){
    correctArray.push({questionNr:i,
                          isCorrect:""});
  }
  this.setState({correction:correctArray})}
  console.log("OPEN MODAL:correction in state is: ", this.state.correction)
}

closeModal(){ //Closes lecture Modal
  this.setState({showModal:false,
                correction:[],
                counter:0,
                })}

//***********FUNCTIONS HANDELING CORRECTION*******************//
questionAnswered(){
  this.setState({answeredQ:true});
  let commentText="";
  var selected=this.state.selectedAnswer;
    console.log("QUESTIONS ANSWERED: selected item was ", selected );
    let currentQuestion={};

    //CORRECT ANSWER//
  if(selected === this.state.currentLecture.questions[this.state.counter].correctAnswer){
      console.log("answer correct!")
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
    console.log("current question is: ", currentQuestion)
  }
}

updateCorrection(currentQuestion, commentText){
  var updatedArray= [...this.state.correction.slice(0, this.state.counter), currentQuestion, ...this.state.correction.slice(this.state.counter+1)]
  console.log("counter is: ", this.state.counter)
  console.log("updatedArray is: ", updatedArray)
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
  var currentQuestionNum=this.state.counter+=1;

this.clearQuestioncomments(currentQuestionNum);
}

checkAnswer(answer){
  this.setState({selectedAnswer:answer})
}

//THESE FUNCTION HANDLES THE CORRECTION-BAR//
//If clicked the question number changes. They also change color whether the question was correctly or incorrectly answered//
handleCorrectionButtons(){
  return this.state.correction.map(function(item){
    return(
      <Badge key={item.questionNr} className={item.isCorrect} onClick={this.onCorrectionClick.bind(this, item.questionNr)}>{item.questionNr+1}</Badge>
    )}, this)
}

onCorrectionClick(questionNr){
  this.setState({
    counter:questionNr,
    comment:"",
    answeredQ:false,
  });
}
/**************************/

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
            <PageHeader>
              {this.state.currentLecture.lecture}
            </PageHeader>
        </Col>

          <Row>
              <Well>
                {this.handleCorrectionButtons()}
              </Well>
          </Row>
        {(this.state.currentLecture.questions[this.state.counter].isVideo)?(<Media><Row><Col xs={12}><Well><video width="100%" controls><source src="/images/S2-Connect-React-to-Store.mp4" type="video/mp4"/> </video></Well></Col></Row></Media>):(this.handleQuestion(radioButtons))}
      </Panel>
  </Row>


  </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.closeModal.bind(this)}>Close</Button>

    </Modal.Footer>
  </Modal>
  </div>)}


//////////////////////////////////////////////////////////////////////////
//HANDLES LECTURE_STARTPAGE///////

selectLecture(lectureId){
axios.get("api/lectures/"+lectureId)
  .then(function(response){

    this.setState({currentLecture:response.data});
    console.log("first question is lecture is: ", this.state.currentLecture)
    modalBolean=true;
    this.openModal();
    return response.data }.bind(this))
  .catch(function(err){throw err;})
}

renderLectures(){

console.log("this.state.correction is: ", this.state.correction)
  return this.props.lectures.map(function(lecture){
        return(
            <Col  xs={12} sm={6} md ={4} key={lecture._id} >
              <Well onClick={this.selectLecture.bind(this, lecture._id)}>
                <h3>{lecture.lecture}</h3>
              </Well>
            </Col>)}, this
        )
}

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
        <Col xs={12} sm={12} md={12} >
          {(this.props.lectures!=null)?(this.renderLectures()):(console.log("wtf!", this.props.lectures))}

        </Col>
    </Panel>
  </Row>
  {(modalBolean)?(this.renderModal()):(<div></div>)}
  </div>
)
}

render(){

return (
this.renderStartPage()
)
}
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getLectures,
    }, dispatch)
}

function mapStateToProps(state){
  return {
    lectures:state.lectures.lectures
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
