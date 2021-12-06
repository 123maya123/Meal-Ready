import classes from './AvailableMeal.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import React, { useEffect, useState } from 'react'
//useEffect is used to advoid side effect of fetch() i.e. fwtching data from DB or component loaded for the first time

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);//ussed to fetch data
  const [isLoading, setIsLoading] = useState(true);//use to show loading before fetching data
  const [httpError, setHttpError] = useState();//to show error msg when data cant be loaded from DB

  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://foodorderapp-3dda1-default-rtdb.firebaseio.com/meals.json').then();
      if(!response.ok){
        throw new Error('something went wrong!');//if error occurred line after this willn't execute
      }
      const responseData = await response.json();

      const loadedMeals = [];
      //our meal is expecting a id property so we need to pass an id
      //here key will be id of individual meal we are fetching from DB of backend
      for (const key in responseData ){
        loadedMeals.push({
          id: key,
          name: responseData[key].name, //to go to nested object in backend DB
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false)//once we are done loading all meals we still dont need to show we are loading
    };
  
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  
},[]);//here our dependancy list is empty so the the useEffect will run only once when the component update for first time
 
if(isLoading){
  return(
  <section className={classes.MealsLoading}>loading...</section>
  )
}
if(httpError){
  return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
}

    const mealList = meals.map((meal) => (
    <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name} 
      description={meal.description} 
      price={meal.price}
      />
      ));
    //meal.name  desprition price etc is from MealItem.js 
 return(
     <section className={classes.meals}>
         <Card>
           <ul>{mealList}</ul>
         </Card>
     </section>
 )
}
export default AvailableMeals;