import { useState } from "react";
import React from 'react';
import Header from "./Components/LayOut/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [CartIsShown, setCartIsShown] = useState(false)
  
  const ShowCartHandler = () =>{
    setCartIsShown(true);
  }
  const HideCartHandler  = () => {
    setCartIsShown(false);
  }
  //here we wanna call showcartHandler fuction inside Header component
  //for the Header to call showcartHandler fuction so we need to pass a pointer at function down through props
  //the convention of props which holds functions is  start with on
  //when the header cart button is clicked we wanna showcase our Showc
  return (
    <CartProvider>
      {CartIsShown && <Cart onClose = {HideCartHandler}/>}
      <Header onShowCart = {ShowCartHandler}/>
      <main>
        <Meals/>
      </main>
   </CartProvider>
  )
}
//'onShowCart' is our prop so we pointed the fuction'showCartHandler'soThat it will getExecuted inisde Header

export default App;
