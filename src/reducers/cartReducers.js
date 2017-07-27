"use strict";


export function cartReducers(state={cart:[]}, action){
  switch(action.type){
    case "GET_CART":
    return {...state,
      cart:action.payload,
      totalAmount:totals(action.payload).amount,
      totalQuantity:totals(action.payload).quantity}
    case "ADD_TO_CART":
    return {...state,
    cart:action.payload,
    totalAmount:totals(action.payload).amount,
    totalQuantity:totals(action.payload).quantity}
    break;
    case "DELETE_CART_ITEM":
    return {...state,
    cart:action.payload,
    totalAmount:totals(action.payload).amount,
    totalQuantity:totals(action.payload).quantity}
    break;
    case "UPDATE_CART":
    return {...state,
      cart:action.payload,
      totalAmount:totals(action.payload).amount,
      totalQuantity:totals(action.payload).quantity}
    }

  return state;
}

export default function totals(bookArr){
const totalAmount= bookArr.map(function(book){
  return book.quantity*book.price;
  }).reduce(function(a, b){
    return a+b
  }, 0);
  const totalQty=bookArr.map(function(book){
    return book.quantity
  }).reduce(function(a, b){
    return a+b
  }, 0);

  return {
    amount:totalAmount,
    quantity:totalQty}
}
