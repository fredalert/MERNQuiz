import React from "react";
import {Row, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";


class Lecture extends React.Component{
  render(){
    return(

    <Row>
        <Panel>
          <Col xs={12} sm={12}>
              <PageHeader>The Lectures page
                <small>  Where the lectures  are found</small>
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


    )
  }}


export default Lecture;
