import CartContext from './CartContext';
import React from 'react';
import { useReducer } from 'react';
//both useState n useReducer allow us to manage state here we are gonna with useReducer as we hv to check
//if meal is part of cart or not bcoz its complex logic hence useReducer to manage state
const defaultCartSate = {
  items: [],
  totalAmount:0
};

const cartReducer = (state, action) => {
  if(action.type === 'ADD'){
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
 
    //before i deraived updatedItems i wanna check if item is part of cart or not
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    //the function inside findeindex returns true if item matches else false n this fun. will executed for evey item in cart

   const existingCartItem = state.items[existingCartItemIndex]//this will only work if we hv that item already
   //if we try to add something that is not there existingCartItem will return null
   let updatedItems;

   if (existingCartItem) {
     const updatedItem = {
       ...existingCartItem, amount: existingCartItem.amount + action.item.amount
     }
     updatedItems = [...state.items];
     updatedItems[existingCartItemIndex] = updatedItem;//here we are overriding with updatedItem
   }else{
     updatedItems = state.items.concat(action.item);
      //concat is builtin method in JS but unlike push it doesnt edit the existing array in 
      //memorybut returns new array
   }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id);
    }else{
      const updatedItem = {...existingItem, amount:existingItem.amount-1}
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  //to clear the cart after ordering 
  if(action.type === 'CLEAR'){
    return defaultCartSate;
  }
  return defaultCartSate;
}
const CartProvider = (props) => {
  const[cartState, dispatchCartAction]=useReducer(cartReducer, defaultCartSate);
  //useReducer returns array with exactly 2 elements hence we can use array destructing to pull out element
  //and store them in separate constates.our 1st one is cartState
    const addItemToCartHandler = (item) => {dispatchCartAction({type: 'ADD', item: item})};
    const removeItemFromCartHandler = (id) =>{dispatchCartAction({type: 'REMOVE', id: id})};
    
    const clearCartHandler = () => {
     dispatchCartAction({type:'CLEAR'});
    };

    const cartContext ={
        items: cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,//inorder to execute this we need to go to MealItemForm
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler,//go to cart.js n add cartCtx.clearCart();
    };
    return (
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    );
}
export default CartProvider
//use this CartProvider in app.js as a warping component
