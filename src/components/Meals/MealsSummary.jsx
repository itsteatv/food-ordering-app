import styles from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <>
      <article className={styles.summary}>
        <h2>WELCOME TO LOS POLLOS HERMANOS</h2>
        <p>
          It's the best ingredients. The spiciest spices. All prepared with
          loving care! And always delivered with a friendly smile. That's the
          Los Pollos Hermanos promise.
        </p>
        <p>Our motto: "Los Pollos Hermanos! Taste the Family!"</p>
      </article>
    </>
  );
}

export default MealsSummary;
