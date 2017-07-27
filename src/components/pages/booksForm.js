"use strict"
import React from "react";
import {InputGroup,Col,  Image, DropdownButton, Row, MenuItem, FormGroup, Well, ControlLabel, Panel, FormControl, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {findDOMNode} from "react-dom"
import {postBookAction, deleteBookAction, getBooks, buttonReset} from "../../actions/bookActions"
import axios from "axios";


class BookForm extends React.Component{

  constructor(){
    super();
    this.state={
      imageArray:[{}],
      imgPath:""
    }}

  componentDidMount(){
      this.props.getBooks();
      axios.get("api/images")
      .then(
        function(response){
          this.setState({imageArray:response.data});
        }.bind(this)
      )
      .catch(function(err){
        this.setState({imageArray:"error loading images in componentDidMount", imgPath:""})
      }.bind(this))
    }

onDelete(){
  let id= findDOMNode(this.refs.delete).value;
this.props.deleteBookAction(id)
}
handleSelect(img){
  this.setState({imgPath:"/images/"+img})
}

handleSubmit(){
  const book= [{
    image:findDOMNode(this.refs.image).value,
    title:findDOMNode(this.refs.title).value,
    description:findDOMNode(this.refs.description).value,
    price:findDOMNode(this.refs.price).value,}]
  this.props.postBookAction(book )
}

resetButton(){
  this.props.buttonReset();
  findDOMNode(this.refs.title).value="";
  findDOMNode(this.refs.description).value="";
  findDOMNode(this.refs.price).value="";
  this.setState({img:""});
}

  render(){
    const bookSelectList = this.props.books.map(function(book){
      return <option value={book._id} key={book._id}>{book.title} </option>
    })

    const imageList=this.state.imageArray.map(function(img, i){
    return(  <MenuItem key={i} eventKey={img.name} onClick={this.handleSelect.bind(this, img.name)}>{img.name}</MenuItem>)
  }, this)

    return(
        <Well>
          <Row>
            <Col xs={12} sm={6}>
              <Panel>

                  <InputGroup>
                    <FormControl type="text" ref="image" value={this.state.imgPath}/>
                    <DropdownButton
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title="Select an image"
                      bsStyle="primary"
                    >
                      {imageList}
                    </DropdownButton>
                  </InputGroup>
                  <Image src={this.state.imgPath} responsive/>

              </Panel>
            </Col>
            <Col xs={12} sm={6}>
              <Panel>
                <FormGroup controlId="title">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter title"
                    ref="title"
                    />
                </FormGroup>
                <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter description"
                      ref="description"
                      />
                </FormGroup>
                <FormGroup controlId="price">
                      <ControlLabel>Price</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Enter price"
                        ref="price"
                        />
                </FormGroup>
                <Button
                onClick={(!this.props.msg)?(this.handleSubmit).bind(this):(this.resetButton).bind(this)}
                bsStyle={(!this.props.style)?("primary"):(this.props.style)}

                >{(!this.props.msg)?("Save book"):(this.props.msg)}</Button>
                </Panel>
                <Panel style={{marginTop:"55px"}}>
                <FormGroup controlId="deleteSelectedBook">
                  <ControlLabel>Select Book</ControlLabel>
                  <FormControl ref="delete" componentClass="select" placeholder="select a book">
                    <option value="select">select</option>
                    {bookSelectList}
                  </FormControl>
                  </FormGroup>
                  <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete Book</Button>
              </Panel>
            </Col>
          </Row>
        </Well>
      )
  }}



function mapStateToProps(state){
  return{
    books: state.books.books,
    msg:state.books.msg,
    style:state.books.style,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postBookAction, deleteBookAction, getBooks, buttonReset}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm)
