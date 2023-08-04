import styles from "./order-element.module.css";

export default function OrderElement({
  ingredient,
  index,
  length,
  showCounter,
  extraClass
}) {

  return (
    <li className={`${styles.element} ${extraClass}`} styles={{ zIndex: 15 - index }}>
      <img
        className={styles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      {showCounter && (
        <p className={`text text_type_main-default ${styles.text}`}>{`+${
          length - 6
        }`}</p>
      )}
    </li>
  );
}