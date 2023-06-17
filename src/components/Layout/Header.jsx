import styles from "./Header.module.css";
import meals from "../../assets/burger.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>LOS POLLOS HERMANOS</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="Lot Of Foods"></img>
      </div>
    </>
  );
}

export default Header;
