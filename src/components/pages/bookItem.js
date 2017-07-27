import React from "react";
import {Image, Col, Well, Row, Button} from "react-bootstrap"
import {connect} from "react-redux";
import {bindActionCreators} from "redux"
import {addToCartAction, updateCart} from "../../actions/addToCartAction"

class BookItem extends React.Component{
handleCart(){
  const book= [...this.props.cart, {
    _id:this.props._id,
    title:this.props.title,
    description:this.props.description,
    image:this.props.image,
    price:this.props.price,
    quantity:1,
  }]
if(this.props.cart.length>0){
  let _id= this.props._id;
  const indexOfBook= this.props.cart.findIndex(function(cart){
    return cart._id===_id;
  })
  if(indexOfBook<0){
    this.props.addToCartAction(book)
  }
  else{
    this.props.updateCart(_id, 1, this.props.cart);
  }
}
else{
    this.props.addToCartAction(book)
}
}

render(){
  return(
  <Well >
   <Row>
    <Col xs={12} sm={4} >
      <Image src={this.props.image} responsive/>
    </Col>
    <Col xs={6} sm={8}>

          <h6>{this.props.title}</h6>
          <p>{this.props.description}</p>
          <h6>usd. {this.props.price}</h6>
          <Button onClick={this.handleCart.bind(this)}bsStyle="primary">BUY NOW</Button>

    </Col>
  </Row>
</Well >

  )
}
}

function mapStateToProps(state){
  return{
    cart:state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return(
    bindActionCreators({
      addToCartAction:addToCartAction,
      updateCart:updateCart


    }, dispatch))

}


export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
