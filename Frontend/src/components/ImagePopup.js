import closeIcon from "../images/CloseIcon.svg";

export default function ImagePopup({ title, link, onClose, isOpen }) {
  return (
    <div className={`popup-image ${isOpen ? "popup-image_opened" : ""}`}>
      <div className="popup-image__container">
        <img
          src={closeIcon}
          onClick={onClose}
          alt="Cerrar"
          className="popup-image__close-icon"
        />
        <img src={link} alt={title} className="popup-image__card" />
        <h3 className="popup-image__title">{title}</h3>
        <div className="popup-image__overlay" onClick={onClose}></div>
      </div>
    </div>
  );
}
