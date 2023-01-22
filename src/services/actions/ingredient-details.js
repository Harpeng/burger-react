const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

const openIngredientDetails = (item) => ({
  type: OPEN_INGREDIENT_MODAL,
  data: item,
});

const closeIngredientDetails = () => ({
  type: CLOSE_INGREDIENT_MODAL,
});

export {CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL, openIngredientDetails, closeIngredientDetails};