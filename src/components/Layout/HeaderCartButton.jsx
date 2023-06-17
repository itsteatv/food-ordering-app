import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import { useGlobalContext } from "../Context/ContextManagement";
import { GlobalContext } from "../Context/CartContext";
import { useEffect, useState } from "react";

function HeaderCartButton() {
  const { openModal } = useGlobalContext();

  const cartCtx = GlobalContext();

  const [activeButton, setActiveButton] = useState(false);
  // const [badgeNumber, setBadgeNumber] = useState(0);

  const cartClasses = `${styles.icon} ${activeButton ? styles.bump : ""}`;

  const cartCtxItems = cartCtx.items;

  useEffect(() => {
    if (cartCtxItems.length === 0) {
      return;
    }
    setActiveButton(true);

    const timer = setTimeout(() => {
      setActiveButton(false);
    }, 300);

    // // Update localStorage when cart items change
    // localStorage.setItem("cartBadgeNumber", JSON.stringify(numberOfCartItems));

    // // Update badgeNumber state when cart items change
    // setBadgeNumber(numberOfCartItems);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtxItems]);

  let numberOfCartItems = 0;
  for (const item of cartCtx.items) {
    numberOfCartItems += item.amount;
  }

  // useEffect(() => {
  //   // Retrieve the badge number from localStorage when the component mounts
  //   const storedBadgeNumber = JSON.parse(
  //     localStorage.getItem("cartBadgeNumber")
  //   );
  //   if (storedBadgeNumber) {
  //     setBadgeNumber(storedBadgeNumber);
  //   }
  // }, []);

  return (
    <>
      <span className={cartClasses} onClick={openModal}>
        <CartIcon />
      <div className={styles.badge}>{numberOfCartItems}</div>
      </span>
    </>
  );
}

export default HeaderCartButton;
