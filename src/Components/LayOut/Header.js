import React from "react";
import mealsImage from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
    return (
      <React.Fragment>
        <header className={classes.header}>
          <h1>Meal Ready</h1>
           <HeaderCartButton onClick={props.onShowCart}/>
        </header>

        <div className={classes['main-image']}>
          <img src={mealsImage} alt="table full of delicious indian food"/>
        </div>
      </React.Fragment>
    );
}
//onShowCart is used in App.js first
export default Header;