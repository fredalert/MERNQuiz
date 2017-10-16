"use strict";
import React from "react"
import {Row, Badge, Well,Glyphicon,Button, ProgressBar, Label, Col, Panel} from "react-bootstrap";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {getUsers} from "../../actions/userActions"
import axios from "axios";

class Admin extends React.Component{

componentDidMount(){
this.props.getUsers();
}


renderUsers(){
  let users=this.props.users.map(function(user, index){
    return <h6 key={index} >{user.name}</h6>
  })
  return(
    <div>
    {users}
    </div>
  )
}
render(){
return(
<div>
{(this.props.users)?(this.renderUsers()):(<div></div>)}
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
