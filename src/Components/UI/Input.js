import classses from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return(
    <div className={classses.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}/>
    </div>
    )
})
export default Input;
// class and for are reserved keyword in javascript so we will go 
//always class as className n for as HtmlFor in jsx

// if type="text" in line 6 then in line 7 ...operater ensures 
// type= text being added in line 7 thats the work of spread operator

//now import it in MealItemForm.js