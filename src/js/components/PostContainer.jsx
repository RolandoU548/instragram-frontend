import { Post } from "./Post";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const PostContainer = () => {
  const { store, actions } = useContext(Context);
  const [arrow, setArrow] = useState(false);
  return (
    <main className="flex flex-col items-end w-96 max-w-[90%] gap-10 lg:order-1 order-3 mt-6 mb-8">
      <button
        className="bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200 transition duration-300"
        onClick={() => {
          setArrow(!arrow);
          actions.ordenar();
        }}
      >
        {arrow ? (
          <i className="fa-solid fa-arrow-up mr-1" />
        ) : (
          <i className="fa-solid fa-arrow-down mr-1" />
        )}
        ORDENAR
      </button>
      {store.posts.length > 0 &&
        store.posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
    </main>
  );
};
