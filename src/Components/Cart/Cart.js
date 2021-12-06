import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';//for outputing cart item we need contex
import CartContext from '../../Store/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';//to render checkout conditionally we need State

const Cart = (props) => {
  const[isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;// o/p it in return statement
  const hasItems = cartCtx.items.length > 0;//check in return

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});//it will trigger dispatchCartAction in cartProvider.js
  }
  const orderHandler = () => {
    setIsCheckOut(true)
  }
  //it will post orderd item n user who ordered details in backend i.e. in this case Firebase
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://foodorderapp-3dda1-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems:cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }
    const CartItems = (
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
          />
        ))}
      </ul>
    );
    const modalActions=<div className={classes.actions}>
    <button className={classes["button--alt"]}onClick={props.onClose}>Close</button>
    {hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>)}
  </div>
    
  const cartModalContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent  = <p>sending order data...</p>

  const didSubmitModalContent = (
  <React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
    <button className={classes.button}onClick={props.onClose}>Close</button>
  </div>
  </React.Fragment>
  )

return (
  <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>
);
}
export default Cart;
//onClose is first declared in App.js
//import it in App