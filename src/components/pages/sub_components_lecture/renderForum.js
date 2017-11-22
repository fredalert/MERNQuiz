"use strict"
import React from "react";
import {Row, Modal, Col,Well, Radio, Image, Badge, Button, Glyphicon, PageHeader, Panel, FormGroup, InputGroup, ControlLabel, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import {updateLectureToUserAction, renderForumModal} from "../../../actions/userActions"
import {updateForum} from "../../../actions/lectureActions"
import {bindActionCreators} from "redux";


class RenderForum extends  React.Component{

  constructor(){
    super();
    this.state={
      comment:""
    }
  }

closeModal(){
this.props.renderForumModal(false)
}

handleCommentChange=(action) => (evt)=>{
  let tempComment=this.state.comment;
tempComment=evt.target.value;
this.setState({comment:tempComment})
console.log(this.state.comment)
}

postComment(){
  let tempComments=this.props.currentLecture.forum;
  console.log("tempComments before push", tempComments )
  tempComments.push({comment:this.state.comment,
                    author:this.props.user.name})
  console.log("tempComments after push", tempComments )

    this.props.updateForum(this.props.currentLecture._id, tempComments);
}

render(){
console.log("RenderForum starts")

let comments=this.props.currentLecture.forum.map(function(comment, index){
  return <Well key={index} >
              <h4 className="comment">{comment.comment}</h4>
              <h5>by: {comment.author}</h5>
        </Well>
})

let self=this;
  return(
    <div>
    <Modal.Dialog >
        <Modal.Header closeButton onClick={self.closeModal.bind(this)}>
          <Modal.Title>DISSKUSSIONSFORUM {this.props.currentLecture.lecture}</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <Row>
        {comments}
        </Row>
        <Well>
        <FormGroup controlId="comment">
          <ControlLabel>Lägg till en kommentar</ControlLabel>
          <FormControl
            type="text"
            placeholder="eg. Vad menar du med potäter"
            ref="comment"
            value={this.state.comment}
            onChange={this.handleCommentChange()}
            />
        </FormGroup>
        <Button onClick={this.postComment.bind(this)}>Posta</Button>
        </Well>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={self.closeModal.bind(this)}>Close</Button>

        </Modal.Footer>

      </Modal.Dialog>
      </div>)
}

}


function mapStateToProps(state){
  return {
    currentLecture:state.lectures.currentLecture,
    user:state.user.loggedInUser,
    isModal:state.user.isForumModal,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateLectureToUserAction,
    renderForumModal,
    updateForum


    }, dispatch)
}




export default connect(mapStateToProps, mapDispatchToProps)(RenderForum)
