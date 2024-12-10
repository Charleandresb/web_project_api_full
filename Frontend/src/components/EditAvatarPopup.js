import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const avatarSchema = yup.object({
  avatar: yup
    .string("Completa este campo")
    .url("Introduce una URL")
    .required("Introduce una URL"),
});

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = useState("Guardar");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(avatarSchema), mode: "onChange" });

  async function handleSubmitAvatar(data) {
    setButtonText("Guardando...");

    await onUpdateAvatar({ avatar: data.avatar });
    reset();
  }

  useEffect(() => {
    setButtonText("Guardar");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(handleSubmitAvatar)}
      title="Cambiar foto de perfil"
      name="avatar"
      buttonText={buttonText}
      textRequired="Único campo requerido (*)"
    >
      <input
        type="url"
        placeholder="Imagen de perfil URL *"
        className="popup__input"
        id="avatar-input"
        {...register("avatar")}
      />
      <span className="popup__error avatar-input-error">
        {errors.avatar?.message}
      </span>
    </PopupWithForm>
  );
}
