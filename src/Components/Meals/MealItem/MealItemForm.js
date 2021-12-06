import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
//here we can use ref or 2way dataBinding but i will go with ref
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  // if amountIsValid is False then i wanna o/p a Error msg
  const amountInputRef = useRef();//pass it in return 
  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    //its always .current  forRef created using useRef//here value is always a string evenif type= no.
    //in line no 23 so we can convert it to a no. by adding +infront of enteredAmount like below
    const enteredAmountNumber = +enteredAmount;//this will convert a string no. to a number
    
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);//in MealItem.js define onAddToCart
  }
    return (
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef} //since its a custom component ref prop doesnt work
          // so we need to goto the component where we wanna receive ref i.e input.js n add forwardRef
          label='Amount'
          input={{
            id: 'amount' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
      </form>
    );
}
export default MealItemForm;
//import it in MealItem.js