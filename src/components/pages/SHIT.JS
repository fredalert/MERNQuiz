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
