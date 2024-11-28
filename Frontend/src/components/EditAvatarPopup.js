import React from "react";
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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(avatarSchema), mode: "onChange" });

  function handleSubmitAvatar(data) {
    onUpdateAvatar({ avatar: data.avatar });
    reset();
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(handleSubmitAvatar)}
      title="Cambiar foto de perfil"
      name="avatar"
      buttonText="Guardar"
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
