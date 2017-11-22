"use strict";
import React from "react"
import {Row, Badge, Well,Glyphicon,Button, ProgressBar,Modal, Label, Col, Panel} from "react-bootstrap";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {getUsers} from "../../actions/userActions"
import axios from "axios";

class Admin extends React.Component{

  constructor(){
    super();
    this.state={isModal:false,
                currentUser:""}
  }

componentDidMount(){
this.props.getUsers();

}

userInfo(_id){
  console.log("_id is", _id)
let userIndex=this.props.users.findIndex(function(user){
    return user._id===_id
  })
  console.log("userIndex is :", userIndex)
let thisUser= this.props.users[userIndex];
console.log("clicked user is : ", thisUser )
this.setState({isModal:true,
              currentUser:thisUser})


}


renderUsers(){
  let users=this.props.users.map(function(user, index){
    return <Well key={index} onClick={this.userInfo.bind(this, user._id)}><h6  >{user.name}</h6></Well>
  }, this)
  return(
    <div>
    {users}
    </div>
  )
}
closeModal(){
  this.setState({isModal:false})
}
renderModal(){
  let self=this;
  let completedlectures=this.state.currentUser.lectures.map(function(lecture, index){
      if(lecture.isCompleted){
    return (<Well key={index}>{lecture.lectureName}</Well>)}
  })

  let notCompletedLectures=this.state.currentUser.lectures.map(function(lecture, index){
    if(!lecture.isCompleted){
      return (<Well key={index}>{lecture.lectureName}</Well>)}
    }
  )
  return(
  <div>
  <Modal.Dialog>
      <Modal.Header closeButton onClick={this.closeModal.bind(this)}>
        <Modal.Title>{this.state.currentUser.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <h3>Klarade föreläsningar</h3>
        {completedlectures}
      <h3>Påbörjade föreläsningar</h3>
      {notCompletedLectures}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={self.closeModal.bind(this)}>Close</Button>

      </Modal.Footer>

    </Modal.Dialog>
    </div>)
}
render(){
return(
<div>
<Row>
<Col xs={6}>
<Well>
<h3>ANVÄNDARE</h3>
{(this.props.users)?(this.renderUsers()):(<div></div>)}
</Well>
</Col>
</Row>
<div>
{(this.state.isModal)?(this.renderModal()):(<div></div>)}
</div>
</div>
)
}

}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
      getUsers,
  }, dispatch)
}



function mapStateToProps(state){
  return {
    users:state.user.allUsers,
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Admin);
