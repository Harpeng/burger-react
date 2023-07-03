import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";

function Constructor() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </>
  );
}

export default Constructor;
