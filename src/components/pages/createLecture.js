"use strict";
import React from "react";
import {InputGroup,Col, FieldGroup, Radio, Image, Pagination, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {getLectures, postLecture} from "../../actions/lectureActions"
import axios from "axios";
import Dropzone from 'react-dropzone'


let alternativeArray=[];

const handleDropRejected = (...args) => console.log('reject', args)

class CreateLecture extends React.Component{
constructor(props){
  super(props);

  this.state={
              isVideo:false,
              lectureImage:"",
              currentAlternatives:4,
              currentQuestionNum:0,
              lecture:{lecture:"",
                      creator:this.props.user._id,
                      description:"",
                      questions:[{comment:"",
                                  isVideo:false,
                                  videoUrl:"",
                                  imageUrl:"",
                                  question:"",
                                  correctArray:"",
                                  answers:  [{answer:""},
                                             {answer:""},
                                             {answer:""},
                                             {answer:""}]
                                  }]},
              currentAlternativeArray:[],
}
this.handleDrop = this.handleDrop.bind(this)
}

componentDidMount(){
  let self=this;
  this.helpRenderAlternatives();
  let redirectedId=this.props.location.query.id;

  if(redirectedId!=undefined){
    axios.get("/api/lectures/"+redirectedId)
    .then(function(result){
      console.log("result is : ", result.data)
      self.setState({lecture:result.data})

    })
    .catch(function(err){
      console.log(err);
    })
  }


}

//////HELPERFUNCTIONS//////////

addQuestion(updatedLecture){
  let lecturamen=updatedLecture;
  if(1+this.state.currentQuestionNum >=this.state.lecture.questions.length){
    let questionss= updatedLecture.questions.push({comment:"",
                question:"",
                answers:  [{answer:""},
                           {answer:""},
                           {answer:""},
                           {answer:""}]
  })
}
return lecturamen;
}

nextButtonHandler(){
  console.log("this.state.lecture._id is :", this.state.lecture._id)

let self=this;
console.log("self.state.lecture.questions is: ", self.state.lecture.questions)
  let newnumber = this.state.currentQuestionNum+1;
    if(this.state.lecture._id==undefined){
      let updatedLecture;
      console.log("entered the post next-handler")
    axios.post("/api/createlecture", this.state.lecture)
    .then(function(result){
      updatedLecture=result.data;
      let addedQuestionLecture= self.addQuestion(updatedLecture);

      self.setState({lecture:addedQuestionLecture,
                      currentQuestionNum:newnumber})
    })

    .then(function(){

      let currentUserCreatedLectures=self.props.user.createdLectures;
      currentUserCreatedLectures.push(updatedLecture);

      console.log("currentUserCreatedLectures is :", currentUserCreatedLectures)
      let currentUserId=self.props.user._id

    axios.put("/api/user/"+currentUserId+"/createdLectures", currentUserCreatedLectures).then(
        function(result){

          console.log("The result after api is : ", result.data)
        }
      )})
      .catch(function(err){
        console.log(err);
      })
      }

else{


  axios.put("/api/updatelecture/"+this.state.lecture._id, this.state.lecture)
  .then(function(result){
    let updatedLecture=result.data;
    let addedQuestionLecture= self.addQuestion(updatedLecture);
    self.setState({lecture:addedQuestionLecture,
                    currentQuestionNum:newnumber})

  })
  .catch(function(err){
    console.log(err);
  })
 }

}

////RENDERING FUNCTIONS///////////

handleDrop=(action) => (files) =>{
  console.log(action)
  const formData= new FormData();
  let file= files[0];
  formData.append("file", file);
  let self=this;
  let lect=this.state.lecture;
switch(action){
  case "video":
  axios.post("/api/fileupload", formData)
  .then(function(response){
    lect.questions[self.state.currentQuestionNum].isVideo=true;
    lect.questions[self.state.currentQuestionNum].videoUrl=response.data.thePath;
    self.setState({lecture:lect})
      })
  .catch(function(err){
    console.log(err)
  })
  break;
  case "question.image":
  axios.post("/api/fileupload", formData)
  .then(function(response){

    lect.questions[self.state.currentQuestionNum].imageUrl=response.data.thePath;
    self.setState({lecture:lect})
      })
  .catch(function(err){
    console.log(err)
  })
  break;
  case "lecture.image":
  axios.post("/api/fileupload", formData)
  .then(function(response){
    lect.lectureImage=response.data.thePath;
    self.setState({lecture:lect})
  })
  .catch(function(err){
    console.log(err)
  })
}


}

renderVideo(){
  let self=this;
  return(
    <Panel>
    <Dropzone onDrop={ this.handleDrop("video")} accept="video/mp4" multiple={ false } onDropRejected={ handleDropRejected }>
        Drag a file here or click to upload.

      </Dropzone>
      <Well>
      <video width="100%">
        <source src={self.state.lecture.questions[self.state.currentQuestionNum].videoUrl} type="video/mp4" />
      </video>
      </Well>
    </Panel>
  )
}

helpRenderAlternatives(){
  let alternatives= [];
  for(let i = 1; i<=this.state.currentAlternatives; i++){
    alternatives.push({answer:"",
                                                     })
  }
  this.setState({currentAlternativeArray:alternatives})
return alternatives;
}

handleTextChange=(action, qindex, aindex) => (evt)=>{
let lect=this.state.lecture;
switch(action){
  case "lecture":
  lect.lecture=evt.target.value;
  break;
  case "description":
  lect.description=evt.target.value;
  break;
  case "questions.comment":
  lect.questions[qindex].comment=evt.target.value;
  break;
  case "questions.question":
  lect.questions[qindex].question=evt.target.value;
  break;
  case "questions.correctAnswer":
  lect.questions[qindex].correctAnswer=evt.target.value;
  break;
  case "questions.answers":
  const newAlternatives = lect.questions[qindex].answers.map((answer, stateindex) => {
          if (aindex !== stateindex) return answer;
          return { ...answer, answer: evt.target.value };
        });
  lect.questions[qindex].answers=newAlternatives;

}
this.setState({lecture:lect})
}

renderQuestion(){
const mappedAlternatives=this.state.lecture.questions[this.state.currentQuestionNum].answers.map((alternative, index)=>{
 return(
    <div key={index}>
    <Radio inline
     name="radioGroup"
     value={alternative.answer}
     onChange={this.handleTextChange("questions.correctAnswer", this.state.currentQuestionNum, index)}>
      </Radio>
      <ControlLabel >{index+1}</ControlLabel>
      <FormControl
        type="text"
        placeholder={alternative.answer}
        value={this.state.lecture.questions[this.state.currentQuestionNum].answers[index].answer}
        onChange={this.handleTextChange("questions.answers", this.state.currentQuestionNum, index)}
        />
</div>

  )
}, this)

return(
    <Row>
    <Panel>
      <Well>
        <h6>FRÅGA</h6>
        <br/>
        <br/>
          <FormGroup controlId="Question">
            <ControlLabel>Questiontext</ControlLabel>
            <FormControl
              type="text"
              value={this.state.lecture.questions[this.state.currentQuestionNum].question}
              placeholder="Vad är Sveriges huvudstad?"
              onChange={this.handleTextChange("questions.question", this.state.currentQuestionNum)}
              />
              <ControlLabel>Kommentar till frågan</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Stockholm är Sveriges huvudstad sedan 1708"
                  value={this.state.lecture.questions[this.state.currentQuestionNum].comment}
                  onChange={this.handleTextChange("questions.comment", this.state.currentQuestionNum)}
                />
              <Dropzone onDrop={ this.handleDrop("question.image", )} accept="image/jpg, image/jpeg" multiple={ false } onDropRejected={ handleDropRejected }>
                  Klicka här för att lägga till en bild
                  <Image className="questionImage" src={this.state.lecture.questions[this.state.currentQuestionNum].imageUrl}/>
              </Dropzone>
          </FormGroup>
          <br/>
          <br/>

          <h6>Skriv några alternativ. Checka det alternativ som är rätt svar.</h6>
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
let self=this;
  console.log("this.state.lecture is: ", this.state.lecture)
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
              placeholder="Nazistföreläsningen"
              value={this.state.lecture.lecture}
              onChange={this.handleTextChange("lecture")}
              />
              <ControlLabel>Description of the lecture</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="En föreläsning om nazisterna och deras illdåd"
                  onChange={this.handleTextChange("description")}
                />
                <Dropzone onDrop={ this.handleDrop("lecture.image")} accept="image/jpg, image/jpeg" multiple={ false } onDropRejected={ handleDropRejected }>
                    Drag a picture here or click to upload.
                    {(self.state.lecture.lectureImage=="")?(<div></div>):(<img src={self.state.lecture.lectureImage} className="selectLectureImage"/>)}
                  </Dropzone>


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
           items={this.state.lecture.questions.length}
           activePage={this.state.currentQuestionNum+1}
           onSelect={this.handlePaginationSelect.bind(this)} />
          <br />
        </Well>
      </Col>
    </Panel>
  </Row>
  <Row>
    <Panel>
    <Well>
      <h6>Fråga nummer {this.state.activePage}</h6>
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
      NÄSTA
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
this.setState({currentQuestionNum:eventKey-1});
}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postLecture, getLectures}, dispatch)
}

function mapStateToProps(state){
  return {
    user:state.user.loggedInUser,
    currentLecture:state.lectures.currentLecture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLecture);
