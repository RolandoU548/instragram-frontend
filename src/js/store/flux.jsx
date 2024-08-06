const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {
        id: null,
        name: null,
        surname: null,
        username: null,
        avatar: null,
      },
      posts: [],
      ordenarPosts: "nuevo",
    },
    actions: {
      ordenar: () => {
        const store = getStore();
        setStore({ posts: [...store.posts].reverse() });
        if (store.ordenarPosts == "nuevo") {
          setStore({ ordenarPosts: "viejo" });
        } else {
          setStore({ ordenarPosts: "nuevo" });
        }
      },
      createUser: async (info) => {
        try {
          const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: info.name,
              surname: info.surname,
              username: info.username,
              password: info.password,
              avatar: info.avatar,
            }),
          });
          const data = await resp.json();
          if (data?.message === "A user has been created") {
            setStore({
              user: {
                id: data.user,
                name: info.name,
                surname: info.surname,
                username: info.username,
                avatar: info.avatar,
              },
            });
          }
          return data;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      logIn: async (info) => {
        try {
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/user/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user: info.username,
                password: info.password,
              }),
            }
          );
          const data = await resp.json();
          if (data?.message === "True") {
            setStore({
              user: {
                id: data.id,
                name: data.name,
                surname: data.surname,
                username: data.username,
                avatar: data.avatar,
              },
            });
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: data.id,
                name: data.name,
                surname: data.surname,
                username: data.username,
                avatar: data.avatar,
              })
            );
          }
          return data;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      getUser: async (id) => {
        try {
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user/${id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await resp.json();
          if (data?.message === "True") {
            return data.user;
          }
          return false;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      getPosts: async () => {
        try {
          const store = getStore();
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/posts",
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await resp.json();
          if (store.ordenarPosts === "nuevo") {
            setStore({
              posts: data.reverse(),
            });
          } else {
            setStore({
              posts: data,
            });
          }
          return data;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      createPost: async (info) => {
        try {
          const store = getStore();
          const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: info.image,
              message: info.message,
              location: info.location,
              status: "published",
              author: store.user.id,
            }),
          });
          const data = await resp.json();
          const actions = getActions();
          actions.getPosts();
          return data;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      like: async (post_id) => {
        try {
          const store = getStore();
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/post/like",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                post_id,
                user_id: store.user.id,
              }),
            }
          );
          const data = await resp.json();
          const actions = getActions();
          actions.getPosts();
          return data;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },
      logOut: () => {
        localStorage.removeItem("user");
        setStore({
          user: {
            id: null,
            name: null,
            surname: null,
            username: null,
            avatar: null,
          },
          posts: [],
        });
      },
    },
  };
};

export default getState;
