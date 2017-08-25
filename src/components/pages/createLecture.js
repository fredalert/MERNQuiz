"use strict";
import React from "react";
import {InputGroup,Col, FieldGroup, Radio, Image, Pagination, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {getLectures, postLecture} from "../../actions/lectureActions"
import axios from "axios";


let alternativeArray=[];

class CreateLecture extends React.Component{
constructor(props){
  super(props);
  this.state={activePage:1,
              isVideo:false,
              currentAlternatives:4,
              lectureArray:[],
              currentAlternativeArray:[],


}
this.handleAlternativeTextChange = this.handleAlternativeTextChange.bind(this);

}

componentDidMount(){

  this.helpRenderAlternatives();
}

//////HELPERFUNCTIONS//////////

//This function adds or updates a question in the questionArray
//It needs the current Question Array, and the updated question.
//If the updated question does not excist in the array, it adds it, otherwise it updates the question.
//It returns the new array of questions.
updateQuestion(updatedQuestion, questions){
  var arrayToBeUpdated=questions;
  let updatedQuestionArray=[];
if(updatedQuestion._id===""){
  updatedQuestionArray=questions.push(updatedQuestion)
}
  else{
    var indexOfQuestionToBeUpdated=arrayToBeUpdated.findIndex(function(question){
      return question._id===updatedQuestion._id;
    });
  updatedQuestionArray= [...arrayToBeUpdated.slice(0, indexOfQuestionToBeUpdated), updatedQuestion, ...arrayToBeUpdated.slice(indexOfQuestionToBeUpdated+1)]
}
return updatedQuestionArray;
}


nextButtonHandler(){



  const currentQuestion={
        isVideo:this.state.isVideo,
        videoUrl:"",
        question:findDOMNode(this.refs.question).value,
        correctAnswer:"",
        comment: findDOMNode(this.refs.questionComment).value,
        image: "",
        answers: []
  }


  const lecture= {
    lecture:findDOMNode(this.refs.lectureName).value,
    description:findDOMNode(this.refs.lectureDescription).value,
    creator:this.props.user._id,
    isPublished:false,
    questions:[]
    }
    let numberOfQuestions= lecture.questions.length;
  console.log("nextButtonHandler opens, lecture is", lecture  )
  console.log("currentQuestion is :", currentQuestion)

}

////RENDERING FUNCTIONS///////////

renderVideo(){
  return(
    <Panel>
      <Well>
        <form method="post" enctype="multipart/form-data" action="api/createlecture/file-upload">
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <input type="file" name="thumbnail"/>
        <input type="submit"/>
      </form>
      </Well>
    </Panel>
  )
}

helpRenderAlternatives(){
  let alternatives= [];
  for(let i = 1; i<=this.state.currentAlternatives; i++){
    alternatives.push({alternativeName:"Alternative"+i,
                              alternativeNumber:i                          })
  }
  this.setState({currentAlternativeArray:alternatives})
return alternatives;
}



handleAlternativeTextChange=(index) => (evt)=>{

  const newAlternatives = this.state.currentAlternativeArray.map((alternative, stateindex) => {
        if (index !== stateindex) return alternative;
        return { ...alternative, alternativeName: evt.target.value };
      });
this.setState({currentAlternativeArray:newAlternatives})
evt.preventDefault();
console.log("alternativeArray is , ", alternativeArray)

}

renderQuestion(){

const mappedAlternatives=this.state.currentAlternativeArray.map(function(alternative, index){

  return(
    <div key={alternative.alternativeName}>
    <Radio inline name="radioGroup">
      </Radio>
      <ControlLabel >{alternative.alternativeNumber}</ControlLabel>
      <FormControl
        type="text"
        placeholder={alternative.alternativeName}
        
        inputRef={ref => { this.input = ref; }}
        />
</div>

  )
}, this)


return(
    <Row>
    <Panel>
      <Well>
        <h6>QUESTION</h6>
        <br/>
        <br/>
          <FormGroup controlId="Question">
            <ControlLabel>Questiontext</ControlLabel>
            <FormControl
              type="text"
              placeholder="What is 2+2"
              ref="question"
              />
              <ControlLabel>Comment to the question</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="When you have 2 apples and adds 2 more you have 4 apples"
                  ref="questionComment"
                  />
          </FormGroup>
          <br/>
          <br/>

          <h6>Please write some alternatives and check the correct answer</h6>
          <br/><br/>
          <form>
          <FormGroup>

            {mappedAlternatives}
         </FormGroup>
         </form>
      </Well>
    </Panel>
    </Row>
  )
}

//MAIN RENDER
render(){
  return(
<Row className="createLectureContainer">

<Row>
<Panel>
    <Col xs={12} sm={6}>
      <Well>
          <FormGroup controlId="lectureName">
            <ControlLabel>Name of the lecture</ControlLabel>
            <FormControl
              type="text"
              placeholder="The nazi lecture"
              ref="lectureName"
              />
              <ControlLabel>Description of the lecture</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="A lecture about the nazis and their shortcomings"
                  ref="lectureDescription"
                  />
          </FormGroup>
      </Well>
      </Col>
    </Panel>
  </Row>

  <Row>
    <Panel>
      <Col xs={12}>
        <Well>
        <Pagination
           bsSize="large"
           items={this.state.lectureArray.length+1}
           activePage={this.state.activePage}
           onSelect={this.handlePaginationSelect.bind(this)} />
          <br />
        </Well>
      </Col>
    </Panel>
  </Row>
  <Row>
    <Panel>
    <Well>
      <h6>Question number {this.state.activePage}</h6>
      <br/>
      <br/>
      <Button bsStyle="primary" onClick={this.chooseVideo.bind(this)}> Add video </Button>
      <br/>
      <br/>
      <Button bsStyle="primary" onClick={this.chooseQuestion.bind(this)}>
        Add question
      </Button>
      <br/>
      <br/>
      {(this.state.isVideo)?(this.renderVideo()):(this.renderQuestion())}
    </Well>
    </Panel>
  </Row>
  <Row>
    <Panel>
    <Well>
      <Button onClick={this.nextButtonHandler.bind(this)}>
      NEXT
      </Button>
    </Well>
    </Panel>
  </Row>
</Row>
)
}

chooseVideo(){ //Handles a click on the addVideo button
this.setState({isVideo:true})

}

chooseQuestion(){ //Handles a click on the addQuestio button
  this.setState({isVideo:false})
}


handlePaginationSelect(eventKey){
this.setState({activePage:eventKey});
}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postLecture, getLectures}, dispatch)

}

function mapStateToProps(state){
  return {
    user:state.user.loggedInUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLecture);
