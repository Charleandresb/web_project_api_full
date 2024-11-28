import closeIcon from "../images/CloseIcon.svg";

function InfoTooltip(props) {
  return (
    <div className="infotooltip">
      <div className="infotooltip__container">
        <img
          src={closeIcon}
          className="infotooltip__close-icon"
          alt="Cerrar"
          onClick={props.onClose}
        />
        {props.children}
        <h3 className="infotooltip__message">{props.message}</h3>
      </div>
      <div className="infotooltip__overlay" onClick={props.onClose}></div>
    </div>
  );
}

export default InfoTooltip;
