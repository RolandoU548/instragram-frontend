import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Menu = () => {
  const { actions } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submit = async (data) => {
    const respuesta = await actions.createPost(data);
    if (respuesta?.message === "A post has been created") {
      alert("Publicación compartida exitosamente");
      setIsOpen(false);
      reset();
    } else {
      alert("No se ha podido compartir la publicación");
    }
  };

  return (
    <>
      <section className="lg:w-1/3 p-2 lg:fixed top-0 left-0 lg:h-[100dvh] flex justify-center items-center flex-col">
        <button
          className="lg:absolute top-4 left-8 font-semibold border border-gray-100 text-sm hover:bg-gray-200 p-2 rounded-2xl transition duration-300"
          onClick={() => {
            navigate("/");
            actions.logOut();
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-2 rotate-180"></i>
          Cerrar Sesión
        </button>
        <h1 className="font-bold text-3xl p-3">Home</h1>
        <button
          className="font-bold text-4xl bg-green-200 rounded-3xl p-3 hover:bg-green-300 transition duration-300"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Crear Publicación
        </button>
        <div
          className={
            "z-30 bg-black opacity-30 fixed w-full h-full top-0 left-0" +
            (isOpen ? "" : " hidden")
          }
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <form
          className={
            "bg-gray-100 rounded-xl flex flex-col gap-4 p-20 w-96 fixed top-1/2 left-1/2 -translate-y-2/4	-translate-x-2/4 z-50 transition duration-500 bg-gradient-to-l from-indigo-100" +
            (isOpen ? "" : " hidden")
          }
          onSubmit={handleSubmit(submit)}
        >
          <button
            className="absolute top-2 right-2 fa-solid fa-xmark text-3xl text-red-600"
            onClick={() => {
              setIsOpen(false);
            }}
          ></button>
          <label>
            <span className="font-semibold">Imagen</span>
            <input
              placeholder="Imagen"
              autoComplete="image"
              type="text"
              className="w-full border border-black p-1 rounded"
              {...register("image", {
                required: {
                  value: true,
                  message: "La imagen es obligatoria",
                },
                maxLength: {
                  value: 300,
                  message: "La imagen debe tener 300 caracteres como máximo",
                },
              })}
            />
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </label>
          <label>
            <span className="font-semibold">Mensaje</span>
            <textarea
              autoComplete="message"
              placeholder="Mensaje"
              type="text"
              className="w-full border border-black p-1 rounded"
              {...register("message", {
                required: {
                  value: true,
                  message: "El mensaje es obligatorio",
                },
                minLength: {
                  value: 10,
                  message: "El mensaje debe tener entre 10 y 500 caracteres",
                },
                maxLength: {
                  value: 500,
                  message: "El mensaje debe tener entre 10 y 500 caracteres",
                },
              })}
            />
            {errors.message && (
              <span className="text-sm text-red-500">
                {errors.message.message}
              </span>
            )}
          </label>
          <label>
            <span className="font-semibold">Ubicación</span>
            <input
              autoComplete="location"
              placeholder="Ubicación"
              type="text"
              className="w-full border border-black p-1 rounded"
              {...register("location", {
                required: {
                  value: true,
                  message: "Ubicación es obligatoria",
                },
                minLength: {
                  value: 4,
                  message: "La abicación debe tener entre 4 y 30 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "La ubicación debe tener entre 4 y 30 caracteres",
                },
              })}
            />
            {errors.location && (
              <span className="text-sm text-red-500">
                {errors.location.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="border border-black rounded font-semibold hover:bg-gray-200 transition duration-300"
          >
            ENVIAR
          </button>
        </form>
      </section>
    </>
  );
};
