import closeIcon from "../images/CloseIcon.svg";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <img
          src={closeIcon}
          onClick={props.onClose}
          alt="Cerrar"
          className="popup__close-icon"
          id="popup-close"
        />
        <form
          className={`popup__form popup__${props.name}`}
          onSubmit={props.onSubmit}
          name={props.name}
          noValidate
        >
          <h3 className="popup__form-title">{props.title}</h3>
          {props.children}
          <p className="popup__required">{props.textRequired}</p>
          <button type="submit" className="popup__button">
            {props.buttonText}
          </button>
        </form>
        <div
          className="popup__overlay"
          id="popup-profile-overlay"
          onClick={props.onClose}
        ></div>
      </div>
    </div>
  );
}
