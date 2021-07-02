import Login from "../views/Login";
import Home from "../views/Home";
import CSSReset from "../reset";
import { useAuth } from "../contexts/Auth";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <CSSReset />
      {isAuthenticated ? <Home /> : <Login />}
    </>
  );
}
