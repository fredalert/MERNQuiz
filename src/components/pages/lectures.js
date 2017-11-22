import React from "react";
import {Row, Image, Grid, Media, Modal, Badge, Pagination, Col,Well, Radio, Button, PageHeader, Panel, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getLectures, getLecture} from "../../actions/lectureActions"
import {getCurrentUser} from "../../actions/userActions"
import axios from "axios";
import {findDOMNode} from "react-dom"




class Lectures extends React.Component{

constructor(){
  super();
  this.state={
    currentQuestion:0,
    currentLecture:{},
}
}

componentDidMount(){
  this.props.getLectures();
}

selectLecture(_id){
this.props.getLecture(_id)
this.props.router.push("/lecture?id="+_id);
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

/**************START-PAGE-MAIN-RENDERER*************/
      renderStartPage(){
        return (
          <div>
          <Row>
            <Panel>
              <Col xs={12} sm={12}>
                  <PageHeader>Föreläsningssidan
                    <small>   Där du hittar föreläsningarna</small>
                  </PageHeader>
              </Col>
              <Col  xs={12} sm={12} md={12} >
                {(this.props.lectures)?(this.renderLectures()):(console.log("wtf!", this.props.lectures))}

              </Col>
          </Panel>
        </Row>

        </div>
      )
      }


/**************MAIN RENDERER*************/
/****************************************/
render(){
  console.log("this.props.lectures is :", this.props.lectures)
return (
  <Grid>
    <Row>
{this.renderStartPage()}
</Row>
</Grid>
)}
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getLectures,
    getCurrentUser,
    getLecture,
    }, dispatch)
}

function mapStateToProps(state){
  return {
    lectures:state.lectures.lectures,
    user:state.user.loggedInUser,
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
