import styles from "./ingredient-details.module.css";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-detail.jsx";


const Ingredient = () => {


  return (
        <div className={`${styles.wrapper} pt-30`}>
          <IngredientDetails />
        </div>
    )
};

export default Ingredient;
