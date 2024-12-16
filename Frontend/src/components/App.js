import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import SuccesRegister from "./SuccesRegister";
import ErrorRegister from "./ErrorRegister";
import Login from "./Login";
import { checkToken } from "../utils/auth";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSuccesRegisterPopupOpen, setisSuccesRegisterPopupOpen] =
    useState(false);
  const [isErrorRegisterPopupOpen, setisErrorRegisterPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function reviewToken() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const response = await checkToken(token);
        if (response.error) {
          localStorage.removeItem("jwt");
          navigate("/login");
        }
        if (response.email) {
          //ver si la respuesta viene en un obajeto data o no
          setLoggedIn(true);
          setEmail(response.email);
          setCurrentUser(response);
          navigate("/");
        }
        return;
      }
    }

    async function getCards() {
      const response = await api.getInitialCards();
      setCards(response);
    }

    reviewToken();

    if (loggedIn) {
      getCards();
    }
  }, [loggedIn, email, navigate]);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleSuccesRegisterOpen() {
    setisSuccesRegisterPopupOpen(true);
  }

  function handleErrorRegisterOpen() {
    setisErrorRegisterPopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleAddPlace(data) {
    api.addCard(data).then(({ newCard }) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleCloseSuccesRegister() {
    closeAllPopups();
    navigate("/login");
  }

  function handleCloseErrorRegister() {
    closeAllPopups();
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setisSuccesRegisterPopupOpen(false);
    setisErrorRegisterPopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          setLoggedIn={setLoggedIn}
          setCurrentUser={setCurrentUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Main
                    onEditAvatarClick={handleEditAvatarClick}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />

                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                  />

                  <ImagePopup
                    title={selectedCard.name}
                    link={selectedCard.link}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                  />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <Register
                isSuccesRegisterPopupOpen={isSuccesRegisterPopupOpen}
                handleSuccesRegisterOpen={handleSuccesRegisterOpen}
                isErrorRegisterPopupOpen={isErrorRegisterPopupOpen}
                handleErrorRegisterOpen={handleErrorRegisterOpen}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
        {isSuccesRegisterPopupOpen ? (
          <SuccesRegister onClose={handleCloseSuccesRegister} />
        ) : null}
        {isErrorRegisterPopupOpen ? (
          <ErrorRegister onClose={handleCloseErrorRegister} />
        ) : null}
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
