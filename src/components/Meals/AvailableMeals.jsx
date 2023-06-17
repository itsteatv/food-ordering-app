import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async function () {
      setLoading(false);
      try {
        const response = await fetch(
          "https://expense-tracker-6a613-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Error fetching data from server");
        }

        if (response.status === 404) {
          throw new Error("Requested resource not found on server");
        }

        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
      setLoading(true);
    };

    fetchMeals();
  }, []);

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "white", margin: "2rem" }}>
        {error}
      </p>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <div className={styles["meals-container"]}>
        {loading ? (
          <ul>{mealsList}</ul>
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
        {!loading && !error && (
          <ul>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
        )}
        {!loading && error && (
          <p style={{ textAlign: "center", color: "white", margin: "1rem" }}>
            Error Loading Meals.
          </p>
        )}
      </div>
    </section>
  );
};

export default AvailableMeals;
