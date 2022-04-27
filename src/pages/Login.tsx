import { useAppSelector } from "../app/hooks";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";
import { selectLogin } from "../features/login/login";

function Login() {
  const state = useAppSelector(selectLogin);

  return <main>{state.loggedIn ? <Logout /> : <LoginForm />}</main>;
}

export default Login;
