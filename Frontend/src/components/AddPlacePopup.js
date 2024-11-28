import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const addPlaceSchema = yup.object({
  title: yup
    .string("Completa este campo")
    .required("Introduce un título")
    .trim()
    .min(2, "El título debe tener mínimo dos caracteres")
    .max(20, "El título debe tener máximo veinte caracteres"),
  link: yup
    .string("Completa este campo")
    .url("Introduce una URL")
    .required("Introduce una URL"),
});

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: "", link: "" },
    resolver: yupResolver(addPlaceSchema),
    mode: "onChange",
  });

  function handleSubmitAddPlace(data) {
    onAddPlace({ name: data.title, link: data.link });
    reset();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(handleSubmitAddPlace)}
      title="Nuevo lugar"
      name="add"
      buttonText="Crear"
      textRequired="Ambos campos son requeridos (*)"
    >
      <input
        type="text"
        placeholder="Título *"
        className="popup__input"
        id="add-input"
        {...register("title")}
      />
      <span className="popup__error add-input-error">
        {errors.title?.message}
      </span>
      <input
        type="url"
        placeholder="Imagen URL *"
        className="popup__input"
        id="link-input"
        {...register("link")}
      />
      <span className="popup__error link-input-error">
        {errors.link?.message}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
