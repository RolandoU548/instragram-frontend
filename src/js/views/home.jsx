import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PostContainer } from "../components/PostContainer";
import { UserInfo } from "../components/UserInfo";
import { Menu } from "../components/Menu";

export const Home = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.getPosts();
  }, []);

  return (
    <div className="flex justify-center lg:items-start items-center lg:flex-row flex-col">
      <Menu />
      <PostContainer />
      <UserInfo />
    </div>
  );
};
