"use strict";
import React from "react";
import {InputGroup,Col, Image, Pagination, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {postBookAction, deleteBookAction, getBooks, buttonReset} from "../../actions/bookActions"
import axios from "axios";



class CreateLecture extends React.Component{
constructor(){
  super();
  this.state={activePage:1,
              isVideo:false}
}

renderVideo(){
  return(
    <Panel>
      <Well>
        <h6>VIDEOOO</h6>
      </Well>
    </Panel>
  )
}

chooseVideo(){
this.setState({isVideo:true})

}

renderQuestion(){
  return(

    <Row>
    <Panel>
      <Well>
        <h6>QUESTION</h6>
        <br/>
        <br/>
          <FormGroup controlId="lectureName">
            <ControlLabel>Questiontext</ControlLabel>
            <FormControl
              type="text"
              placeholder="What is 2+2"
              ref="lectureName"
              />
              <ControlLabel>Comment to the question</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="When you have 2 apples and adds 2 more you have 4 apples"
                  ref="lectureDescription"
                  />
          </FormGroup>
          <br/>
          <br/>

          <h6>Please write some alternatives and check the correct answer</h6>
          <br/><br/>
          <FormGroup>
     <InputGroup>
       <InputGroup.Addon>
         <input type="radio" aria-label="..." />
       </InputGroup.Addon>
       <FormControl type="text" />
     </InputGroup>
   </FormGroup>
      </Well>
    </Panel>
    </Row>

  )
}


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
           items={10}
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
      <Button bsStyle="primary">
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
      <Button>
      NEXT
      </Button>
    </Well>
    </Panel>
  </Row>
</Row>
)
}

handlePaginationSelect(eventKey){
this.setState({activePage:eventKey});
}
}


export default CreateLecture;
