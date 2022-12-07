import React from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modalOverlay/modalOverlay.jsx";

export function Modal({children, title, closePopup}) {
    const modalRoot = document.getElementById("react-modals");

    React.useEffect(() => {
        const closeHandler = (evt) => {
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
        <>
        <section>
            <ModalOverlay closePopup={closePopup}>
                <div className={styles.popupContainer}>
                    <h2  className={`text text_type_main-large ${styles.title} ml-10 mr-10 mt-10`}>{title}</h2>
                    <button className={styles.closeIcon} onClick={closePopup}>
                        <CloseIcon type="primary" />
                    </button>
                    <div>
                    {children}
                    </div>
                </div>
            </ModalOverlay>
        </section>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    closeModal: PropTypes.func,
  };