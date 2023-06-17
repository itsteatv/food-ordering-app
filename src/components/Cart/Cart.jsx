import { Fragment } from "react";
import styles from "./Cart.module.css";
import { useGlobalContext } from "../Context/ContextManagement";
import { GlobalContext } from "../Context/CartContext";
import { useEffect, useState } from "react";
import CheckOut from "../Form/CheckOut";

function Cart() {
  const { isModalOpen, closeModal } = useGlobalContext();
  const [checkOutForm, setCheckOutForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      setCheckOutForm(false);
      setErrorMessage("");
      setIsDataSent(false);
    }
  }, [isModalOpen]);

  const cartContext = GlobalContext();

  const totalAmount = cartContext.totalAmount.toFixed(2);

  const hasItem = cartContext.items.length > 0;

  // 1- Create an array to store the food items in cart
  const cartArray = [];

  // 2- Let's loop over context
  for (const item of cartContext.items) {
    // 3- Check if the item is already in the cart array
    const existingItem = cartArray.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem !== -1) {
      // 4- If the item is not in the cart array, add it with 1
      cartArray[existingItem].amount += item.amount;
    } else {
      // 5- If the amount is already in cart so increment it's amount
      cartArray.push({ ...item });
    }
  }

  const checkOutFormHandler = function () {
    setCheckOutForm(true);
  };

  const submitOrderHandler = async function (userData) {
    setIsSending(true);

    try {
      const response = await fetch(
        "https://expense-tracker-6a613-default-rtdb.firebaseio.com/userData.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      if (response.status >= 404) {
        throw new Error("Failed to submit order.");
      }
    } catch (error) {
      console.log(error);
      setIsDataSent(false);
      setErrorMessage("Failed to submit order. Please try again later. ❌ ");
    }

    setIsSending(false);
    setIsDataSent(true);

    // Reset the cart items
    cartContext.resetCartFn();
  };

  const cartItems = cartArray.map((item) => (
    <li key={item.id} className={styles["cart-item"]}>
      <div>
        <h2>{item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>${item.price}</span>
          <span className={styles.amount}>x{item.amount}</span>
        </div>
      </div>
      <div className={styles["secondary-action"]}>
        <button
          className={styles["main-button"]}
          onClick={() => cartContext.removeItemFn(item.id)}
        >
          −
        </button>
        <button
          className={styles["main-button"]}
          onClick={() => cartContext.addItemFn({ ...item, amount: 1 })}
        >
          +
        </button>
      </div>
    </li>
  ));

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
  }, [isModalOpen]);

  return (
    <div
      className={`${
        isModalOpen
          ? styles["modal-overlay show-modal"]
          : styles["modal-overlay"]
      }`}
    >
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles["modal-container"]}>
        {cartItems}
        <div className={styles.total}>
          <span className={styles["primary-total-amount"]}>Total Amount</span>
          <span className={styles["secondary-total-amount"]}>
            ${totalAmount}
          </span>
        </div>
        {!checkOutForm && (
          <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={closeModal}>
              Close
            </button>
            {hasItem && (
              <button className={styles.button} onClick={checkOutFormHandler}>
                Order
              </button>
            )}
          </div>
        )}
        {checkOutForm && (
          <>
            <CheckOut
              onUserData={submitOrderHandler}
              isSubmitting={isSending}
            />
            {isDataSent && !errorMessage && !isSending && (
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Data successfully sent ✔️{" "}
              </p>
            )}
          </>
        )}
        {errorMessage && (
          <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
