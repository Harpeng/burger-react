import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";


export function ModalOverlay({children, closePopup}) {
    return(
        <div onClick={closePopup} className={styles.overlay}>{children}</div>
    )
}

ModalOverlay.protoTypes = {
    children: PropTypes.node.isRequired,
    closePopup: PropTypes.func.isRequired,
}