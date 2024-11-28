import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/auth";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(email, password);
      setError(false);
      setLoggedIn(true);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h3 className="login__title">Iniciar sesión</h3>
        <input
          value={email}
          onChange={handleChangeEmail}
          className="login__input"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          id="login-email"
          required
        />
        <input
          value={password}
          onChange={handleChangePassword}
          className="login__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          id="login-password"
          required
        />
        <button className="login__button" type="submit">
          Iniciar sesión
        </button>
        {error && <p className="login__error-message">Usuario no encontrado</p>}
        <Link to="/register" className="login__login-link">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </div>
  );
}

export default Login;
