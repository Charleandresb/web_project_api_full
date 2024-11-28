import React from "react";
import InfoTooltip from "./InfoTooltip";
import successIcon from "../images/SuccesIcon.png";

export default function SuccesRegister({ onClose }) {
  return (
    <InfoTooltip onClose={onClose} message="¡Correcto! Ya estás registrado">
      <img src={successIcon} className="infotooltip__info-icon" alt="Éxito" />
    </InfoTooltip>
  );
}
