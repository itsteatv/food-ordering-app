import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { GlobalContext } from "../../Context/CartContext";

function MealItem(props) {
  const CartContext = GlobalContext();

  const addToCartHandler = function (amount) {
    CartContext.addItemFn({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>€{props.price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddCartToHandler={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
