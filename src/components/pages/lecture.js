import React from "react";
import {Row, Modal, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";


class Lecture extends React.Component{

constructor(){
  super()
  this.setState=({showModal:false})
}


openModal(){
  this.setState({showModal:true})
}

closeModal(){
  this.setState({showModal:false})
}

  render(){

    return(
      <div>

      <Modal bsSize="large" show={this.state.showModal.bind(this)} onHide={this.closeModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    <Row>
        <Panel>
          <Col xs={12} sm={12}>
              <PageHeader>{this.props.lecture}

              </PageHeader>
          </Col>
          <Col xs={12} sm={12}>
          <Well>
            <Well>
              <h6>So the fucking question is is this cool?</h6>
            </Well>
            <Well>
              <FormGroup>
                    <Radio name="radioGroup" >
                    <h6>My man</h6>
                    </Radio>

                    <Radio name="radioGroup" >
                    <h6>Down with the ball</h6>
                    </Radio>

                    <Radio name="radioGroup">
                    <h6>If something is wrong</h6>
                      </Radio>
              </FormGroup>
            </Well>
            <Well>
              <Button bsStyle="primary">Answer</Button>
            </Well>
            </Well>
          </Col>
      </Panel>
    </Row>
    </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.closeModal.bind(this)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>


    )
  }}


export default Lecture;
