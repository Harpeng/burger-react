import React, {FC} from "react";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useNavigate } from "react-router-dom";

interface IModal{
  children: React.ReactNode;
  title?: string;
  closePopup: () => void;
  route?: boolean;
}

export const Modal:FC<IModal> = ({ children, title, closePopup, route }) => {
  const modalRoot = document.getElementById("react-modals") as HTMLElement;


  React.useEffect(() => {
    const closeHandler = (evt:any) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", closeHandler);
    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, [closePopup]);


  return createPortal(
    <section>
      <ModalOverlay closePopup={closePopup}>
        <div
          className={styles.popupContainer} onClick={(e) => e.stopPropagation()}
        >
          <h2
            className={`text text_type_main-large ${styles.title} ml-10 mr-10 mt-10`}
          >
            {title}
          </h2>
          <button className={styles.closeIcon} onClick={() => closePopup()}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </ModalOverlay>
    </section>,
    modalRoot
  );
}
