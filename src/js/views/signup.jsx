import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { actions } = useContext(Context);

  const submit = async (data) => {
    const respuesta = await actions.createUser(data);
    if (respuesta?.message === `User ${data.username} already exists`) {
      alert(`${data.username} already exists`);
    } else if (respuesta?.message === "A user has been created") {
      alert("Usuario creado exitosamente");
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center h-dvh items-center flex-col md:flex-row">
      <h1 className="font-semibold text-lg">Registrarse</h1>
      <form
        className="flex flex-col gap-4 md:p-20 p-3 max-w-[80%]"
        onSubmit={handleSubmit(submit)}
      >
        <label>
          Nombre
          <input
            type="text"
            autoComplete="name"
            className="w-full border border-black p-1 rounded-sm"
            placeholder="Nombre"
            {...register("name", {
              required: { value: true, message: "El nombre es obligatorio" },
              minLength: {
                value: 3,
                message: "El nombre debe tener entre 3 y 20 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre debe tener entre 3 y 20 caracteres",
              },
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </label>
        <label>
          Apellido
          <input
            autoComplete="family-name"
            type="text"
            placeholder="Apellido"
            className="w-full border border-black p-1 rounded-sm"
            {...register("surname", {
              required: { value: true, message: "El apellido es obligatorio" },
              minLength: {
                value: 3,
                message: "El apellido debe tener entre 3 y 20 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El apellido debe tener entre 3 y 20 caracteres",
              },
            })}
          />
          {errors.surname && (
            <span className="text-sm text-red-500">
              {errors.surname.message}
            </span>
          )}
        </label>
        <label>
          Nombre de Usuario
          <input
            placeholder="Nombre de Usuario"
            autoComplete="user-name"
            type="text"
            className="w-full border border-black p-1 rounded-sm"
            {...register("username", {
              required: {
                value: true,
                message: "El nombre de usuario es obligatorio",
              },
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener entre 3 y 20 caracteres",
              },
              maxLength: {
                value: 20,
                message:
                  "El nombre de usuario debe tener entre 3 y 20 caracteres",
              },
            })}
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </label>
        <label>
          Avatar
          <input
            placeholder="Avatar"
            autoComplete="avatar"
            type="text"
            className="w-full border border-black p-1 rounded-sm"
            {...register("avatar", {
              maxLength: {
                value: 300,
                message: "El avatar debe tener 300 caracteres como máximo",
              },
            })}
          />
          {errors.avatar && (
            <span className="text-sm text-red-500">
              {errors.avatar.message}
            </span>
          )}
        </label>
        <label>
          Contraseña
          <input
            autoComplete="new-password"
            placeholder="Contraseña"
            type="password"
            className="w-full border border-black p-1 rounded-sm"
            {...register("password", {
              required: {
                value: true,
                message: "La ontraseña es obligatoria",
              },
              minLength: {
                value: 5,
                message: "La contraseña debe tener entre 5 y 10 caracteres",
              },
              maxLength: {
                value: 10,
                message: "La contraseña debe tener entre 5 y 10 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="font-bold border border-black rounded-sm p-1 hover:shadow-xl transition duration-500"
        >
          ENVIAR
        </button>
      </form>
      <Link
        className="inline-block px-4 underline text-gray-700 hover:text-gray-800 transition duration-300"
        to={"/"}
      >
        Iniciar Sesión
      </Link>
    </div>
  );
};
