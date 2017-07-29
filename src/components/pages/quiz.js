import React from "react";
import {Row, Col,Well, Radio, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";


class Quiz extends React.Component{
  render(){
    return(

    <Row>
        <Panel>
          <Col xs={12} sm={12}>
              <PageHeader>The quiz page
                <small>Where the quizzes are found</small>
              </PageHeader>
          </Col>
          <Col xs={12} sm={12}>
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
          </Col>
      </Panel>
    </Row>


    )
  }}


export default Quiz;
