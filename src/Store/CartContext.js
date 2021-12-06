import React from 'react';


const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=> {},
    clearCart: () => {}
})
export default CartContext;
//use it in cartProvider n also in HeadercartButton
//clearCart defined in CartProvider.js