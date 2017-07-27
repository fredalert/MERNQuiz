"use strict";

import React from "react";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {getBooks} from "../../actions/bookActions";
import {Grid, Col, Row, Button} from "react-bootstrap"
import BookItem from "./bookItem"
import BookForm from "./booksForm"
import Cart from "./cart"


class BooksList extends React.Component{
  componentDidMount(){
     this.props.getBooks()
  }

render(){
  const bookList= this.props.books.map(function(book){
    return(
    <Col xs={12} sm={6} md={4} key={book._id}>
      <BookItem
          _id={book._id}
          title={book.title}
          description={book.description}
          price={book.price}
          image={book.image}
        />
    </Col>
  )
  });
  return (
  <Grid>
  <Row>
    <Cart/>
  </Row>

    <Row>

      {bookList}
    </Row>
  </Grid>
    )
}}



function mapStateToProps(state){
  return{
    books:state.books.books
  }
}

function mapDispatchToProps(dispatch){
return bindActionCreators({getBooks}, dispatch
)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
