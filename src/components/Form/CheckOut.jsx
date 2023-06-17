import styles from "./CheckOut.module.css";
import { useGlobalContext } from "../Context/ContextManagement";
import useInput from "../hook/use-input";

const Checkout = (props) => {
  const { closeModal } = useGlobalContext();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    checkError: nameError,
    valueChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    resetValueHandler: resetNameHandler,
    formIsValid: firstNameIsValid,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    checkError: streetError,
    valueChangeHandler: streetChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    resetValueHandler: resetStreetHandler,
    formIsValid: streetIsValid,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    checkError: postalCodeError,
    valueChangeHandler: postalCodeChangeHandler,
    valueInputBlurHandler: postalCodeInputBlurHandler,
    resetValueHandler: resetPostalCodeHandler,
    formIsValid: postalCodeIsValid,
  } = useInput((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    checkError: cityError,
    valueChangeHandler: cityChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    resetValueHandler: resetCityHandler,
    formIsValid: cityIsValid,
  } = useInput((value) => value.trim().length !== 0);

  const formIsValid =
    firstNameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const formSubmission = function (event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onUserData({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    resetNameHandler();
    resetStreetHandler();
    resetPostalCodeHandler();
    resetCityHandler();
  };

  return (
    <form className={styles.form} onSubmit={formSubmission}>
      <div className={`${styles.control} ${nameError ? styles.invalid : ""}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameError && (
          <p className={styles.invalid}>Please enter a valid name.</p>
        )}
      </div>
      <div className={`${styles.control} ${streetError ? styles.invalid : ""}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetError && (
          <p className={styles.invalid}>Please enter a valid street.</p>
        )}
      </div>
      <div
        className={`${styles.control} ${postalCodeError ? styles.invalid : ""}`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeError && (
          <p className={styles.invalid}>Please enter a valid postal code.</p>
        )}
      </div>
      <div className={`${styles.control} ${cityError ? styles.invalid : ""}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityError && (
          <p className={styles.invalid}>Please enter a valid city.</p>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
        <button
          className={styles.submit}
          disabled={!formIsValid || props.isSubmitting}
        >
          {props.isSubmitting ? "Submitting ⌛ " : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default Checkout;
