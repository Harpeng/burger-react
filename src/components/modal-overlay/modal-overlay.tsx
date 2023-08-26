import React, {FC} from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface IModalOverLay {
  children: React.ReactNode;
  closePopup: () => void;
}

export const ModalOverlay:FC <IModalOverLay> = ({ children, closePopup }) => {
  return (
    <div onClick={closePopup} className={styles.overlay}>
      {children}
    </div>
  );
}
