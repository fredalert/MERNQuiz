"use strict"
import axios from "axios";

export function getCart(){
  return function(dispatch){
    axios.get("/api/cart")
    .then(function(response){
      dispatch({type:"GET_CART", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_CART_REJECTED", msg:"Someting went wrong when getting the cart"})
    })
  }
}

export function addToCartAction(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
    .then(function(response){
      dispatch({type:"ADD_TO_CART",
              payload:response.data,
              })
    })
    .catch(function(err){
      dispatch({type:ADD_TO_CART_REJECTED, msg:"ADD T CART rejected"})
    })
  }
}

export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
    .then(function(response){
      dispatch({type:"DELETE_CART_ITEM",
              payload:response.data,
              })
    })
    .catch(function(err){
      dispatch({type:DELETE_CART_REJECTED, msg:"DELETE CART rejected"})
    })
  }
}

export function updateCart(_id, unit, cart){
  var updatedBookArray=cart;
  var indexOfUpdatedBook=updatedBookArray.findIndex(function(book){
    return book._id===_id;
  });
  const updatedBook={...updatedBookArray[indexOfUpdatedBook], quantity:updatedBookArray[indexOfUpdatedBook].quantity+unit};

  let updatedCart= [...updatedBookArray.slice(0, indexOfUpdatedBook), updatedBook, ...updatedBookArray.slice(indexOfUpdatedBook+1)]
return function(dispatch){
    axios.post("/api/cart", updatedCart)
    .then(function(response){
      dispatch({type:"UPDATE_CART", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:UPDATE_TO_CART_REJECTED, msg:"update To CART rejected"})
    })
}

}
