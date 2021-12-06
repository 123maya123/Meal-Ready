import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from  '../../../Store/CartContext';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const addToCartHandler = (amount) => {
      cartCtx.addItem({
        id:props.id,
        name:props.name,
        amount: amount,
        price: props.price
      })//addItem is defined in CartProvider.js
    }

    return (
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
      </li>
    );
}
export default MealItem;
//you make sure what props.name you are using here later you are gonna use in AvailableMeal.js

//here we are passing onAddToCart prop and a pointer to that prop i.e. addToCartHandler to mealItemForm which i am executing in MealItemform.js