import trash from "../images/Trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
  card,
}) {
  console.log(card);
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "card__image-trash" : "card__image-trash_hidden"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "card__image-like_active" : "card__image-like"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <h2 className="card__title">{name}</h2>
      <div
        alt="Me gusta"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      ></div>
      <img
        src={trash}
        alt="Eliminar"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      <span className="card__like-number">{likes.length}</span>
    </div>
  );
}
