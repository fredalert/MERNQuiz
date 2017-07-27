"use strict"
import React from "react";
import {Modal, Image, Well, Panel, Col, Row, Button, ButtonGroup, Label} from "react-bootstrap";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {deleteCartItem, updateCart, getCart} from "../../actions/addToCartAction"

class Cart extends React.Component{

  componentDidMount(){
    this.props.getCart();
  }

  onIncrement(_id){
    this.props.updateCart(_id, 1, this.props.cart)
  }

  onDecrement(_id, quantity){
    if(quantity>1){
    this.props.updateCart(_id, -1, this.props.cart)}
    else{
      this.onDelete(_id);
    }
  }

  constructor(){
    super();
    this.state={
      showModal:false,
    }
    }

    open(){
      this.setState({
        showModal:true,
      })
    }
    close(){
      this.setState({
        showModal:false,
      })
    }

  onDelete(_id){
    var bookArray=this.props.cart;

    var indexOfBook=bookArray.findIndex(function(bookInCart){
    return bookInCart._id===_id

    })
    let cartAfterDelete= [...bookArray.slice(0, indexOfBook),
    ...bookArray.slice(indexOfBook+1)];

    this.props.deleteCartItem(cartAfterDelete)
  }

  render(){


      if (this.props.cart[0]){

      return  this.renderCart();

      }
      else{

      return  this.renderEmpty()

    }}

      renderEmpty(){
        return( <div></div>)
      }


      renderCart(){
        const cartItemList= this.props.cart.map(function(book){
        return(
          <Panel key={book._id} >
            <Row>
              <Col xs={4} sm={2}>
                <Image src={book.image} responsive/>
              </Col>
              <Col xs={6} sm={4}>
                <h6>{book.title}</h6><span>     </span>
              </Col>
              <Col xs={6} sm={2}>
                <h6>skr. {book.price}</h6>
              </Col>

              <Col xs={6} sm={2}>
                <h6>qty. <Label bsStyle="success">{book.quantity}</Label></h6>
              </Col>
              <Col xs={8} sm={6}>
                <ButtonGroup style={{minWidth:"200px"}}>
                <Button onClick={this.onDecrement.bind(this, book._id, book.quantity)} bsStyle="default">-</Button>
                <Button onClick={this.onIncrement.bind(this, book._id)} bsStyle="default">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, book._id)} bsStyle="danger" bsSize="small">DELETE</Button>

                </ButtonGroup>
              </Col>
            </Row>
          </Panel>
        )}, this)
        return(
          <Panel header="Cart" bsStyle="primary">
            {cartItemList}
          <Row>
            <Col xs={12}>
              <h6>Total amount: {this.props.totalAmount}</h6>
              <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">Proceed to checkout</Button>
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title>Thank you sista!</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <h6>Your order has been saved</h6>
          <p>You will recieve an email confirmation</p>

         </Modal.Body>
         <Modal.Footer>
          <Col xs={6}>
            <h6>Total amount:{this.props.totalAmount} </h6>
          </Col>
           <Button onClick={this.close.bind(this)}>Close</Button>
         </Modal.Footer>
       </Modal>
          </Panel>

        )
      }

}



function mapStateToProps(state){
  return{
    cart:state.cart.cart,
    totalAmount:state.cart.totalAmount,
  }}

  function mapDispatchToProps(dispatch){
    return bindActionCreators(
      {deleteCartItem:deleteCartItem,
      updateCart:updateCart,
      getCart:getCart}
      , dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
