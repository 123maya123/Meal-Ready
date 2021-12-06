import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState} from "react";//all these needed for animation i.e. bump
import CartContext from "../../Store/CartContext";

const HeaderCartButton = (props) =>{
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce( (curNumber, item)=>{
        return curNumber + item.amount;
    }, 0 );
    //here we have to use reduce() instead of length bcoz reduce() allows us to transform array of data to 
    //a single value, number in this case
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;//''means no extra css class
useEffect(() => {
  if (items.length === 0) {
    return;
  }
  setBtnIsHighlighted(true);
  const timer = setTimeout(() => {
    setBtnIsHighlighted(false);
  }, 300); //bcoz 300 ms is during given in css file by us
  return () => {
    clearTimeout(timer);//when this effect returns now we cleared the timer to avoid sideEffect of useEffect
  };
}, [items]);

 return(
     <button className={btnClasses} onClick={props.onClick}>
         <span className={classes.icon}>
             <CartIcon/>
         </span>

         <span>Your Cart</span>

         <span className={classes.badge}> {numberOfCartItems } </span>
     </button>
 )
}
export default HeaderCartButton