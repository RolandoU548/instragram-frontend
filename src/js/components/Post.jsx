import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Post = ({ post }) => {
  const { actions, store } = useContext(Context);
  const [photo, setPhoto] = useState();

  const fechaDada = new Date(Date.parse(post.created_at));
  const fechaActual = new Date();
  const horasTranscurridas = Math.floor(
    (fechaActual - fechaDada) / (1000 * 60 * 60)
  );

  const [like, setLike] = useState(
    post.likes.some((user) => user.id === store.user.id)
  );

  useEffect(() => {
    setLike(post.likes.some((user) => user.id === store.user.id));
    (async function () {
      const result = await actions.getUser(post.author);
      setPhoto(result.avatar);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.posts]);

  const likeF = async () => {
    setLike(!like);
    actions.like(post.id);
  };

  return (
    <div className="border border-gray-400 rounded w-full">
      <section className="flex p-1 gap-1 items-center">
        <img
          className="w-12 h-12 rounded-full object-cover border border-fuchsia-700 hover:border-fuchsia-600 hover:border-2 transition-border duration-500"
          src={photo}
        />
        <h1 className="font-semibold cursor-pointer">@{post.author_name}</h1>
      </section>
      <section>
        <img
          onDoubleClick={() => likeF()}
          src={post.image}
          className="w-full cursor-pointer"
        />
      </section>
      <section className="p-2">
        {like ? (
          <i
            onClick={() => likeF()}
            className="fa-solid fa-heart text-xl text-red-600 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => likeF()}
            className="fa-regular fa-heart text-xl cursor-pointer"
          ></i>
        )}
        <h6 className="text-xs text-gray-500">{post.likes.length}</h6>
        <p className="text-sm">
          {post.likes.length > 0 ? (
            post.likes.length > 1 ? (
              <>
                Le gusta a <b>@{post.likes[0].username}</b> y{" "}
                <b>{post.likes.length - 1} más</b>
              </>
            ) : (
              <>
                Le gusta a <b>@{post.likes[0].username}</b>
              </>
            )
          ) : (
            ""
          )}
        </p>
        <h2 className="break-words">
          <span className="font-semibold">{post.author_name}</span>{" "}
          <span className="font-light">{post.message}</span>
        </h2>
        <h4 className="text-xs text-gray-700">
          Hace {horasTranscurridas} horas
        </h4>
      </section>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};
