import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/login.jsx";
import { Signup } from "./views/signup.jsx";
import { Home } from "./views/home.jsx";
import injectContext from "./store/appContext.jsx";

const Layout = () => {
  const basename = import.meta.env.VITE_BASENAME || "";
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
