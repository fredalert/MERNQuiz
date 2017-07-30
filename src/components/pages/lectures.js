import React from "react";
import {Row, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getLectures} from "../../actions/lectureActions"
import axios from "axios";





class Lectures extends React.Component{
componentDidMount(){

  this.props.getLectures();


}

renderLectures(){

  return this.props.lectures[0].lectures.map(function(lecture){
            return(

            <Col  xs={12} sm={6} md ={4} key={lecture._id} >
              <Well>
                <h3>{lecture.lecture}</h3>
              </Well>
            </Col>)})
}


render(){

console.log("lecture in render is: ", this.props.lectures[0])



    return(

    <Row>
        <Panel>
          <Col xs={12} sm={12}>
              <PageHeader>The Lectures page
                <small>   Where the lectures  are found</small>
              </PageHeader>
          </Col>
          <Col xs={12} sm={12} md={12} >
            {(this.props.lectures[0]!=null)?(this.renderLectures()):(console.log("wtf!"))}

          </Col>
      </Panel>
    </Row>


    )
  }}

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
