import React from "react";
import InfoTooltip from "./InfoTooltip";
import ErrorIcon from "../images/ErrorIcon.png";

export default function SuccesRegister({ onClose }) {
  return (
    <InfoTooltip
      onClose={onClose}
      message="Uy, algo salió mal. Por favor, inténtalo de nuevo."
    >
      <img src={ErrorIcon} className="infotooltip__info-icon" alt="Error" />
    </InfoTooltip>
  );
}
