import lápiz from "../images/Lápiz.png";
import edit from "../images/Edit.svg";
import add from "../images/Add.svg";
import closeIcon from "../images/CloseIcon.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__section">
          <div className="profile__section-container">
            <img
              src={lápiz}
              alt="editar"
              className="profile__avatar-edit"
              title="Cambiar avatar"
              onClick={props.onEditAvatarClick}
            />
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <p className="profile__info-description">{currentUser.about}</p>
          </div>
          <img
            src={edit}
            alt="Botón edit"
            className="profile__info-button"
            title="Editar perfil"
            onClick={props.onEditProfileClick}
          />
        </div>
        <img
          src={add}
          alt="Botón add"
          className="profile__add-button"
          title="Nuevo lugar"
          onClick={props.onAddPlaceClick}
        />
      </section>

      <section className="photo-cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            card={card}
          />
        ))}
      </section>

      <section className="popup-section">
        <div className="popup-remove">
          <div className="popup-remove__container">
            <img
              src={closeIcon}
              alt="Cerrar"
              className="popup-remove__close-icon"
            />
            <form className="popup-remove__confirm">
              <h3 className="popup-remove__title">¿Estás segura/o?</h3>
              <button type="submit" className="popup-remove__button">
                Eliminar
              </button>
            </form>
            <div className="popup-remove__overlay"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
