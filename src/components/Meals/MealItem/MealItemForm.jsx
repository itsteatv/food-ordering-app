import { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const childRef = useRef();

  // Handling error
  const [isValid, setIsValid] = useState(true);

  const handleFormSubmit = function (e) {
    e.preventDefault();

    // Here, input value is string
    const enteredAmount = childRef.current.value;

    // Here, we convert it to number ( because in input we have type= "number" )
    const enteredNumber = parseInt(enteredAmount);

    if (
      enteredAmount.trim().length === 0 ||
      enteredNumber < 1 ||
      enteredNumber > 5
    ) {
      setIsValid(false);
      return;
    }

    props.onAddCartToHandler(enteredNumber);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <Input
        ref={childRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!isValid ? <div>Please Add A Valid Number (1-5)</div> : ""}
    </form>
  );
}

export default MealItemForm;
