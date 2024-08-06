import { useContext } from "react";
import { Context } from "../store/appContext";
export const UserInfo = () => {
  const { store } = useContext(Context);
  return (
    <section className="lg:w-1/3 flex order-2 p-2 mt-1 lg:fixed top-0 right-0 justify-center items-center lg:h-[100dvh] h-64">
      <div className="lg:absolute top-4 left-8 flex">
        <div className="w-[5.5rem] h-[5.5rem] border-2 border-fuchsia-700 rounded-full flex justify-center items-center hover:border-fuchsia-600">
          <img
            src={store.user.avatar}
            className="rounded-full w-20 h-20 object-cover hover:scale-105 transition duration-500 cursor-pointer"
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl">@{store.user.username}</h2>
          <h4 className="ml-3 text-gray-700 font-light">
            {store.user.name} {store.user.surname}
          </h4>
        </div>
      </div>
      <h1 className="font-bold text-5xl bg-gray-100 rounded-full p-10 text-gray-700 hover:text-gray-800 hover:bg-gray-50 hover:scale-105 transition duration-300 cursor-pointer hidden lg:block">
        DTECH INC
      </h1>
    </section>
  );
};
