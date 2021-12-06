import classes from "./Checkout.module.css";
import { useRef, useState} from "react";

const isEmpthy = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;
//these 2 helper function will help validate entered values i.e. enteredName,enteredStreet, etc

const Checkout = (props) => {
  const[formInputValidity, setFormInputValidity] =  useState({
    name:true,
    street:true,
    city:true,
    postalCode:true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpthy(enteredName);
    const enteredStreetIsValid = !isEmpthy(enteredStreet);
    const enteredCityIsValid = !isEmpthy(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      postalCode:enteredPostalCodeIsValid,
      city:enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

      if(!formIsValid){
        //submit the cart data only if form is valid
        return;
      }
      //submit cart.js data
      props.onConfirm({
        name:enteredName,
        streeet:enteredStreet,
        city:enteredCity,
        postalCode:enteredPostalCode
      });

  };
//css applied conditionally
const nameControlClasses=`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
const streetControlClasses=`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
const cityControlClasses=`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`
const postalCodeControlClasses=`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street </label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid Postal Code(6-digit)!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
