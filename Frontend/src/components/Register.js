import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../utils/auth";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(email, password);
      props.handleSuccesRegisterOpen();
    } catch (error) {
      props.handleErrorRegisterOpen();
      console.log(error);
    }
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h3 className="register__title">Regístrate</h3>
        <input
          value={email}
          onChange={handleChangeEmail}
          className="register__input"
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          id="register-email"
          required
        />
        <input
          value={password}
          onChange={handleChangePassword}
          className="register__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          id="register-password"
          required
        />
        <button className="register__button" type="submit">
          Regístrate
        </button>
        <Link to="/login" className="register__login-link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
    </div>
  );
}

export default Register;
